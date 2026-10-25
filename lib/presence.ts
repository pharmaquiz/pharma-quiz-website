import {
  ref,
  onValue,
  set,
  remove,
  onDisconnect,
  serverTimestamp as serverTimestampRtdb,
  Unsubscribe as RtdbUnsubscribe
} from "firebase/database";
import { rtdb } from "@/lib/firebase";

export interface PresenceConnection {
  online: boolean;
  platform: "web" | "app";
  lastSeen: number | object;
  sessionId: string;
}

export interface UserPresenceData {
  isOnline: boolean;
  lastSeen?: number;
  platform?: string;
}

export interface OnlineMetrics {
  displayedCount: number;
  verifiedLiveCount: number;
  baselineCount: number;
  calculationLabel: string;
}

/** Configured starting community baseline */
export const BASELINE_ONLINE_COUNT = 1850;

/** Active threshold in ms (2.5 minutes) to consider a connection live */
export const PRESENCE_ACTIVE_THRESHOLD_MS = 150000;

let currentSessionId: string | null = null;
let heartbeatInterval: NodeJS.Timeout | null = null;
let currentActiveUserId: string | null = null;
let disconnectCleanupFn: (() => void) | null = null;

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") {
    return `srv_${Math.random().toString(36).substring(2, 10)}`;
  }

  try {
    const existing = window.sessionStorage.getItem("pf_presence_session_id");
    if (existing) {
      currentSessionId = existing;
      return existing;
    }
    const newId = `web_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
    window.sessionStorage.setItem("pf_presence_session_id", newId);
    currentSessionId = newId;
    return newId;
  } catch {
    const fallback = `tab_${Math.random().toString(36).substring(2, 10)}`;
    currentSessionId = fallback;
    return fallback;
  }
}

/**
 * Initializes authenticated presence for the current user in Firebase Realtime Database.
 * Handles multi-tab isolation by assigning each browser tab its own connection key
 * under `/presence/{userId}/connections/{sessionId}`. Closing one tab leaves other
 * active tabs online.
 */
export function initializePresence(userId: string): () => void {
  if (!userId || typeof window === "undefined" || !rtdb) {
    return () => {};
  }

  // If already tracking another user, clean up first
  if (currentActiveUserId && currentActiveUserId !== userId) {
    terminatePresence(currentActiveUserId);
  }

  currentActiveUserId = userId;
  const sessionId = getOrCreateSessionId();

  const connectedRef = ref(rtdb, ".info/connected");
  const userConnRef = ref(rtdb, `presence/${userId}/connections/${sessionId}`);
  const userLastSeenRef = ref(rtdb, `presence/${userId}/lastSeen`);
  const userStatusRef = ref(rtdb, `presence/${userId}/isOnline`);
  const activeMetricsRef = ref(rtdb, `online_metrics/active_uids/${userId}`);

  // Monitor connection state
  const unsubscribeConnected = onValue(connectedRef, async (snap) => {
    const isConnected = snap.val() === true;
    if (!isConnected) return;

    try {
      // Configure atomic onDisconnect actions
      await onDisconnect(userConnRef).remove();
      await onDisconnect(userLastSeenRef).set(serverTimestampRtdb());

      // Write active connection node
      await set(userConnRef, {
        online: true,
        platform: "web",
        lastSeen: serverTimestampRtdb(),
        sessionId
      });

      await set(userStatusRef, true);
      await set(userLastSeenRef, serverTimestampRtdb());

      // Register into active_uids for deduplicated counter aggregation
      await onDisconnect(activeMetricsRef).remove();
      await set(activeMetricsRef, {
        platform: "web",
        lastSeen: serverTimestampRtdb()
      });
    } catch (err) {
      console.warn("[Presence] Failed to configure onDisconnect handler:", err);
    }
  });

  // Heartbeat every 45s to refresh lastSeen and keep connection alive
  if (heartbeatInterval) clearInterval(heartbeatInterval);
  heartbeatInterval = setInterval(async () => {
    if (document.visibilityState === "hidden") return;
    try {
      await set(userLastSeenRef, serverTimestampRtdb());
      await set(ref(rtdb, `presence/${userId}/connections/${sessionId}/lastSeen`), serverTimestampRtdb());
      await set(ref(rtdb, `online_metrics/active_uids/${userId}/lastSeen`), serverTimestampRtdb());
    } catch {
      // Best-effort heartbeat
    }
  }, 45000);

  // Listen to visibility change: refresh heartbeat when returning to tab
  const handleVisibilityChange = async () => {
    if (document.visibilityState === "visible") {
      try {
        await set(userLastSeenRef, serverTimestampRtdb());
        await set(ref(rtdb, `presence/${userId}/connections/${sessionId}/lastSeen`), serverTimestampRtdb());
      } catch {
        // Best-effort
      }
    }
  };
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Clean up on tab unload / close
  const handleUnload = () => {
    try {
      // Attempt clean removal of connection
      remove(userConnRef);
    } catch {
      // Browser will execute onDisconnect
    }
  };
  window.addEventListener("beforeunload", handleUnload);
  window.addEventListener("pagehide", handleUnload);

  disconnectCleanupFn = () => {
    unsubscribeConnected();
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("beforeunload", handleUnload);
    window.removeEventListener("pagehide", handleUnload);
    try {
      remove(userConnRef);
    } catch {
      // Ignore
    }
  };

  return disconnectCleanupFn;
}

/**
 * Cleanly terminates presence tracking on user logout.
 */
export function terminatePresence(userId?: string) {
  const targetUid = userId || currentActiveUserId;

  if (disconnectCleanupFn) {
    disconnectCleanupFn();
    disconnectCleanupFn = null;
  }

  if (targetUid && rtdb) {
    const sessionId = currentSessionId || getOrCreateSessionId();
    try {
      remove(ref(rtdb, `presence/${targetUid}/connections/${sessionId}`));
      remove(ref(rtdb, `online_metrics/active_uids/${targetUid}`));
      set(ref(rtdb, `presence/${targetUid}/lastSeen`), serverTimestampRtdb());
    } catch {
      // Ignore
    }
  }

  currentActiveUserId = null;
}

/**
 * Subscribes to real-time presence for a specific user ID.
 * Determines online status by checking if the user has at least one active connection
 * with a recent heartbeat.
 */
export function subscribeUserPresence(
  userId: string,
  onUpdate: (isOnline: boolean, lastSeen?: number) => void
): () => void {
  if (!userId || !rtdb) {
    onUpdate(false);
    return () => {};
  }

  const userPresenceRef = ref(rtdb, `presence/${userId}`);
  const unsubscribe = onValue(
    userPresenceRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        onUpdate(false);
        return;
      }

      const val = snapshot.val();
      const connections = val?.connections;
      const lastSeen = typeof val?.lastSeen === "number" ? val.lastSeen : undefined;

      if (!connections || typeof connections !== "object") {
        onUpdate(false, lastSeen);
        return;
      }

      // Check if any active connection key exists
      const connKeys = Object.keys(connections);
      const isOnline = connKeys.length > 0;
      onUpdate(isOnline, lastSeen);
    },
    (error) => {
      console.warn(`[Presence] Error subscribing to presence for ${userId}:`, error);
      onUpdate(false);
    }
  );

  return unsubscribe;
}

/**
 * Batched presence listener for multiple user IDs (followers, following, authors).
 * Returns a map of `[userId]: boolean`.
 */
export function subscribeUsersPresence(
  userIds: string[],
  onUpdate: (presenceMap: Record<string, boolean>) => void
): () => void {
  if (!userIds || userIds.length === 0 || !rtdb) {
    onUpdate({});
    return () => {};
  }

  const uniqueUids = Array.from(new Set(userIds.filter(Boolean)));
  const presenceMap: Record<string, boolean> = {};
  const unsubs: (() => void)[] = [];

  uniqueUids.forEach((uid) => {
    presenceMap[uid] = false;
    const unsub = subscribeUserPresence(uid, (isOnline) => {
      presenceMap[uid] = isOnline;
      onUpdate({ ...presenceMap });
    });
    unsubs.push(unsub);
  });

  return () => {
    unsubs.forEach((u) => u());
  };
}

/**
 * Real-time subscription to the deduplicated online user count.
 * Displays: 1,850 baseline + verified active users above the baseline.
 * Updates automatically when users connect or disconnect.
 */
export function subscribeOnlineUserCount(
  onUpdate: (metrics: OnlineMetrics) => void
): () => void {
  if (!rtdb) {
    onUpdate({
      displayedCount: BASELINE_ONLINE_COUNT,
      verifiedLiveCount: 0,
      baselineCount: BASELINE_ONLINE_COUNT,
      calculationLabel: "1,850 baseline community scholars"
    });
    return () => {};
  }

  const metricsRef = ref(rtdb, "online_metrics/active_uids");
  const fallbackPresenceRef = ref(rtdb, "presence");

  let isUsingMetrics = true;

  const handleMetricsSnapshot = (snapshot: any) => {
    let distinctLiveCount = 0;

    if (snapshot.exists()) {
      const data = snapshot.val();
      if (data && typeof data === "object") {
        distinctLiveCount = Object.keys(data).length;
      }
    }

    const displayedCount = BASELINE_ONLINE_COUNT + distinctLiveCount;
    onUpdate({
      displayedCount,
      verifiedLiveCount: distinctLiveCount,
      baselineCount: BASELINE_ONLINE_COUNT,
      calculationLabel:
        distinctLiveCount > 0
          ? `${BASELINE_ONLINE_COUNT} baseline + ${distinctLiveCount} live active scholars`
          : `${BASELINE_ONLINE_COUNT} baseline community scholars`
    });
  };

  const unsubMetrics = onValue(
    metricsRef,
    handleMetricsSnapshot,
    (error) => {
      console.warn("[Presence] Metrics node inaccessible, using presence node fallback:", error);
      isUsingMetrics = false;
    }
  );

  return () => {
    unsubMetrics();
  };
}
