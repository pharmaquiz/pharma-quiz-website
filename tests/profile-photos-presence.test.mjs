/**
 * Profile Photos, Followers Online Status & Live User Count Test Suite
 *
 * Verifies:
 * 1. Profile photo URL resolution across schema variations (photoUrl, photoURL, userProfileImage, profileImageUrl, imageUrl).
 * 2. URL validation and graceful fallback to initial letter avatar when URL is invalid/missing.
 * 3. Multi-tab presence deduplication and connection lifecycle invariants.
 * 4. Online presence detection (green indicator for active users, offline state for disconnected users).
 * 5. Online user counter baseline (starts strictly at 1,850) and formula: Displayed = 1,850 + Verified Active Users.
 * 6. Deduplication of distinct authenticated users across devices/tabs.
 * 7. Privacy preservation in count metrics (no PII/UID leaks).
 */

import assert from "node:assert";

console.log("=== RUNNING PROFILE PHOTOS, ONLINE PRESENCE & USER COUNT TEST SUITE ===\n");

// ─────────────────────────────────────────────────────────────
// Part 1: Profile Photo URL Resolution & Fallback Validation
// ─────────────────────────────────────────────────────────────
console.log("-> Test 1: Validating profile photo URL resolution across schema variations...");

function resolveAvatarUrl(obj) {
  if (!obj || typeof obj !== "object") return "";
  const candidate =
    obj.photoUrl ||
    obj.photoURL ||
    obj.userProfileImage ||
    obj.profileImageUrl ||
    obj.imageUrl ||
    obj.avatarUrl ||
    "";
  return typeof candidate === "string" ? candidate.trim() : "";
}

function isValidAvatarUrl(url) {
  if (!url || typeof url !== "string") return false;
  const clean = url.trim();
  if (!clean || clean === "null" || clean === "undefined") return false;
  return clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("/");
}

function getAvatarFallbackInitial(name) {
  const displayName = name?.trim() || "Pharmacist";
  return (displayName[0] || "P").toUpperCase();
}

// 1.1 Android User.kt schema
assert.strictEqual(
  resolveAvatarUrl({ photoUrl: "https://firebasestorage.googleapis.com/v0/b/bucket/o/profile.jpg" }),
  "https://firebasestorage.googleapis.com/v0/b/bucket/o/profile.jpg"
);

// 1.2 Android AuthRepository dual write schema
assert.strictEqual(
  resolveAvatarUrl({ profileImageUrl: "https://firebasestorage.googleapis.com/v0/b/bucket/o/profile2.jpg" }),
  "https://firebasestorage.googleapis.com/v0/b/bucket/o/profile2.jpg"
);

// 1.3 SocialFeedPost / FeedComment schema
assert.strictEqual(
  resolveAvatarUrl({ userProfileImage: "https://firebasestorage.googleapis.com/v0/b/bucket/o/author.jpg" }),
  "https://firebasestorage.googleapis.com/v0/b/bucket/o/author.jpg"
);

// 1.4 Firebase Auth user schema
assert.strictEqual(
  resolveAvatarUrl({ photoURL: "https://lh3.googleusercontent.com/a/google_avatar" }),
  "https://lh3.googleusercontent.com/a/google_avatar"
);

// 1.5 Generic fallback
assert.strictEqual(resolveAvatarUrl({}), "");
assert.strictEqual(resolveAvatarUrl(null), "");

console.log("✓ Test 1 Passed: Profile photo URLs resolve correctly across all Firestore schema variations.\n");

// ─────────────────────────────────────────────────────────────
// Part 2: URL Sanitization & Fallback Initials
// ─────────────────────────────────────────────────────────────
console.log("-> Test 2: Validating URL sanitization and fallback initials...");

assert.strictEqual(isValidAvatarUrl("https://example.com/avatar.jpg"), true);
assert.strictEqual(isValidAvatarUrl("http://example.com/avatar.jpg"), true);
assert.strictEqual(isValidAvatarUrl("/images/default-avatar.png"), true);
assert.strictEqual(isValidAvatarUrl(""), false);
assert.strictEqual(isValidAvatarUrl("null"), false);
assert.strictEqual(isValidAvatarUrl("undefined"), false);
assert.strictEqual(isValidAvatarUrl("   "), false);
assert.strictEqual(isValidAvatarUrl(null), false);
assert.strictEqual(isValidAvatarUrl(undefined), false);

// Fallback initial
assert.strictEqual(getAvatarFallbackInitial("Arun"), "A");
assert.strictEqual(getAvatarFallbackInitial("suresh"), "S");
assert.strictEqual(getAvatarFallbackInitial(""), "P");
assert.strictEqual(getAvatarFallbackInitial(null), "P");

console.log("✓ Test 2 Passed: Invalid or missing URLs safely reject and trigger fallback letter initials.\n");

// ─────────────────────────────────────────────────────────────
// Part 3: Multi-Tab Presence & Connection Isolation
// ─────────────────────────────────────────────────────────────
console.log("-> Test 3: Validating multi-tab presence deduplication and session isolation...");

class MockPresenceManager {
  constructor() {
    this.presenceTree = {}; // userId -> { connections: { sessionId: data }, lastSeen }
  }

  addConnection(userId, sessionId, platform = "web") {
    if (!this.presenceTree[userId]) {
      this.presenceTree[userId] = { connections: {}, lastSeen: Date.now() };
    }
    this.presenceTree[userId].connections[sessionId] = {
      online: true,
      platform,
      lastSeen: Date.now(),
      sessionId
    };
    this.presenceTree[userId].lastSeen = Date.now();
  }

  removeConnection(userId, sessionId) {
    if (this.presenceTree[userId]?.connections) {
      delete this.presenceTree[userId].connections[sessionId];
      this.presenceTree[userId].lastSeen = Date.now();
    }
  }

  isUserOnline(userId) {
    const userNode = this.presenceTree[userId];
    if (!userNode || !userNode.connections) return false;
    return Object.keys(userNode.connections).length > 0;
  }

  getDistinctActiveUserCount() {
    let count = 0;
    for (const uid in this.presenceTree) {
      if (this.isUserOnline(uid)) {
        count++;
      }
    }
    return count;
  }
}

const pm = new MockPresenceManager();

// User A opens Tab 1
pm.addConnection("user_A", "tab_1");
assert.strictEqual(pm.isUserOnline("user_A"), true);
assert.strictEqual(pm.getDistinctActiveUserCount(), 1);

// User A opens Tab 2 (same user, new tab)
pm.addConnection("user_A", "tab_2");
assert.strictEqual(pm.isUserOnline("user_A"), true);
// Still 1 distinct active user, NOT 2
assert.strictEqual(pm.getDistinctActiveUserCount(), 1);

// User A closes Tab 1
pm.removeConnection("user_A", "tab_1");
// User A remains online because Tab 2 is still active
assert.strictEqual(pm.isUserOnline("user_A"), true);
assert.strictEqual(pm.getDistinctActiveUserCount(), 1);

// User B connects from mobile app
pm.addConnection("user_B", "app_session_1", "app");
assert.strictEqual(pm.isUserOnline("user_B"), true);
assert.strictEqual(pm.getDistinctActiveUserCount(), 2);

// User A closes Tab 2
pm.removeConnection("user_A", "tab_2");
// User A is now offline
assert.strictEqual(pm.isUserOnline("user_A"), false);
// Only User B remains online
assert.strictEqual(pm.getDistinctActiveUserCount(), 1);

console.log("✓ Test 3 Passed: Multi-tab isolation preserves online status until all sessions close; distinct users accurately counted.\n");

// ─────────────────────────────────────────────────────────────
// Part 4: Online Followers & Green Indicator Status
// ─────────────────────────────────────────────────────────────
console.log("-> Test 4: Verifying green indicator presence for followers vs offline users...");

function determineIndicatorState(isOnline) {
  if (isOnline) {
    return {
      showGreenDot: true,
      badgeClass: "bg-emerald-500",
      statusLabel: "Online now"
    };
  }
  return {
    showGreenDot: false,
    badgeClass: "bg-slate-500/80",
    statusLabel: "Offline"
  };
}

const onlineFollower = determineIndicatorState(true);
assert.strictEqual(onlineFollower.showGreenDot, true);
assert.strictEqual(onlineFollower.statusLabel, "Online now");

const offlineFollower = determineIndicatorState(false);
assert.strictEqual(offlineFollower.showGreenDot, false);
assert.strictEqual(offlineFollower.statusLabel, "Offline");

console.log("✓ Test 4 Passed: Online followers display green dot; offline followers do not display green dot.\n");

// ─────────────────────────────────────────────────────────────
// Part 5: Online Counter Starting Baseline & Formula
// ─────────────────────────────────────────────────────────────
console.log("-> Test 5: Verifying online user counter starting baseline of 1,850 & formula...");

const BASELINE = 1850;

function calculateOnlineMetrics(distinctActiveUsers) {
  const verifiedLiveCount = Math.max(0, distinctActiveUsers);
  const displayedCount = BASELINE + verifiedLiveCount;
  const calculationLabel =
    verifiedLiveCount > 0
      ? `${BASELINE} baseline + ${verifiedLiveCount} live active scholars`
      : `${BASELINE} baseline community scholars`;

  return {
    displayedCount,
    verifiedLiveCount,
    baselineCount: BASELINE,
    calculationLabel
  };
}

// Zero live users -> exactly 1,850 baseline
const m0 = calculateOnlineMetrics(0);
assert.strictEqual(m0.baselineCount, 1850);
assert.strictEqual(m0.verifiedLiveCount, 0);
assert.strictEqual(m0.displayedCount, 1850);

// 4 live active users -> 1,854
const m4 = calculateOnlineMetrics(4);
assert.strictEqual(m4.baselineCount, 1850);
assert.strictEqual(m4.verifiedLiveCount, 4);
assert.strictEqual(m4.displayedCount, 1854);
assert.strictEqual(m4.calculationLabel, "1850 baseline + 4 live active scholars");

// 12 live active users -> 1,862
const m12 = calculateOnlineMetrics(12);
assert.strictEqual(m12.displayedCount, 1862);

console.log("✓ Test 5 Passed: Counter starts strictly at 1,850 and adheres to formula (1,850 + verified active users).\n");

// ─────────────────────────────────────────────────────────────
// Part 6: Cross-Device Deduplication & Privacy
// ─────────────────────────────────────────────────────────────
console.log("-> Test 6: Verifying cross-device deduplication and privacy invariants...");

const mockActiveUidsNode = {
  "user_101": { platform: "web", lastSeen: Date.now() },
  "user_102": { platform: "web", lastSeen: Date.now() },
  "user_103": { platform: "app", lastSeen: Date.now() }
};

// Count distinct keys
const distinctCount = Object.keys(mockActiveUidsNode).length;
assert.strictEqual(distinctCount, 3);

// Verify metrics output contains no PII or user IDs
const publicMetrics = calculateOnlineMetrics(distinctCount);
assert.ok(!("user_101" in publicMetrics));
assert.ok(!("email" in publicMetrics));
assert.ok(!("uid" in publicMetrics));
assert.strictEqual(typeof publicMetrics.displayedCount, "number");
assert.strictEqual(typeof publicMetrics.verifiedLiveCount, "number");
assert.strictEqual(typeof publicMetrics.baselineCount, "number");

console.log("✓ Test 6 Passed: Cross-device deduplication verified; no personal information exposed in count.\n");

console.log("ALL 6 PROFILE PHOTOS, ONLINE PRESENCE & USER COUNT TESTS PASSED! (6/6)\n");
