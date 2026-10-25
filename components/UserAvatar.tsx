"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { subscribeUserPresence } from "@/lib/presence";

export interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  userId?: string | null;
  isOnline?: boolean | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  showOnlineBadge?: boolean;
  alt?: string;
  priority?: boolean;
}

const SIZE_CONFIG = {
  xs: { box: "w-6 h-6", text: "text-[10px]", dot: "w-2 h-2 -bottom-0.5 -right-0.5 border", pixels: 24 },
  sm: { box: "w-7 h-7", text: "text-xs", dot: "w-2 h-2 -bottom-0.5 -right-0.5 border", pixels: 28 },
  md: { box: "w-9 h-9", text: "text-xs", dot: "w-2.5 h-2.5 -bottom-0.5 -right-0.5 border-1.5", pixels: 36 },
  lg: { box: "w-11 h-11", text: "text-sm", dot: "w-3 h-3 -bottom-0.5 -right-0.5 border-2", pixels: 44 },
  xl: { box: "w-12 h-12", text: "text-base", dot: "w-3.5 h-3.5 -bottom-0.5 -right-0.5 border-2", pixels: 48 },
  "2xl": { box: "w-16 h-16", text: "text-xl", dot: "w-4 h-4 -bottom-1 -right-1 border-2", pixels: 64 },
};

export function isValidAvatarUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  const clean = url.trim();
  if (!clean || clean === "null" || clean === "undefined") return false;
  return clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("/");
}

export default function UserAvatar({
  src,
  name,
  userId,
  isOnline: isOnlineProp,
  size = "md",
  className = "",
  showOnlineBadge = true,
  alt,
  priority = false
}: UserAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const [realtimeOnline, setRealtimeOnline] = useState<boolean | null>(null);

  const config = SIZE_CONFIG[size] || SIZE_CONFIG.md;
  const displayName = name?.trim() || "Pharmacist";
  const initial = (displayName[0] || "P").toUpperCase();

  // Reset error when src changes
  useEffect(() => {
    setImgError(false);
  }, [src]);

  // Subscribe to real-time presence if userId is provided and isOnline is not explicitly set
  useEffect(() => {
    if (typeof isOnlineProp === "boolean") {
      setRealtimeOnline(isOnlineProp);
      return;
    }
    if (!userId || !showOnlineBadge) {
      setRealtimeOnline(null);
      return;
    }

    const unsubscribe = subscribeUserPresence(userId, (online) => {
      setRealtimeOnline(online);
    });

    return () => unsubscribe();
  }, [userId, isOnlineProp, showOnlineBadge]);

  const activeOnline = typeof isOnlineProp === "boolean" ? isOnlineProp : realtimeOnline;
  const validUrl = !imgError && isValidAvatarUrl(src);

  return (
    <div className={`relative inline-flex flex-shrink-0 select-none ${config.box} ${className}`}>
      <div
        className={`w-full h-full rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-slate-300 shadow-sm relative`}
      >
        {validUrl ? (
          <Image
            src={src!.trim()}
            alt={alt || displayName}
            width={config.pixels}
            height={config.pixels}
            className="w-full h-full object-cover rounded-2xl"
            onError={() => setImgError(true)}
            unoptimized
            loading={priority ? undefined : "lazy"}
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-slate-800 via-slate-850 to-slate-900 flex items-center justify-center">
            <span className={`${config.text} font-black text-rose-400`}>
              {initial}
            </span>
          </div>
        )}
      </div>

      {/* Online / Offline Presence Badge */}
      {showOnlineBadge && activeOnline !== null && (
        <span
          title={activeOnline ? "Online now" : "Offline"}
          className={`absolute rounded-full border-slate-950 transition-all ${config.dot} ${
            activeOnline
              ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
              : "bg-slate-500/80"
          }`}
        >
          {activeOnline && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
        </span>
      )}
    </div>
  );
}
