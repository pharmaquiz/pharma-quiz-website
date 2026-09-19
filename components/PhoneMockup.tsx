import React from "react";
import Image from "next/image";

interface PhoneMockupProps {
  screenSrc?: string;
  alt?: string;
  className?: string;
  badgeText?: string;
  priority?: boolean;
  children?: React.ReactNode;
}

export default function PhoneMockup({
  screenSrc = "/images/app-screenshots/home.jpg",
  alt = "PharmaFriends Android App Interface",
  className = "",
  badgeText,
  priority = false,
  children
}: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto select-none ${className}`}>
      {badgeText && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 bg-slate-900 text-teal-300 text-xs font-semibold px-3 py-1 rounded-full shadow-md border border-slate-700">
          {badgeText}
        </div>
      )}

      {/* Outer Phone Shell */}
      <div className="relative mx-auto border-[10px] border-slate-800 rounded-[44px] shadow-2xl bg-slate-900 overflow-hidden w-[280px] sm:w-[320px] max-w-full aspect-[9/18.5]">
        {/* Speaker / Camera Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-800 rounded-b-xl z-30 flex items-center justify-center space-x-2">
          <div className="w-8 h-1 bg-slate-700 rounded-full" />
          <div className="w-2.5 h-2.5 bg-slate-900 border border-slate-700 rounded-full" />
        </div>

        {/* Screen Content Container */}
        <div className="w-full h-full bg-slate-50 overflow-hidden relative">
          {children ? (
            children
          ) : (
            <Image
              src={screenSrc}
              alt={alt}
              fill
              className="object-cover object-top"
              priority={priority}
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 360px"
            />
          )}
        </div>

        {/* Home indicator bar */}
        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-slate-400/40 rounded-full z-20" />
      </div>

      {/* Ambient shadow underneath */}
      <div className="w-48 h-6 bg-slate-900/20 blur-xl mx-auto rounded-full mt-2" />
    </div>
  );
}
