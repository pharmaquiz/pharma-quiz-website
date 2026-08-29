import React from "react";
import { SITE_CONFIG } from "@/lib/constants";

interface GooglePlayButtonProps {
  variant?: "primary" | "dark" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GooglePlayButton({
  variant = "primary",
  size = "md",
  className = ""
}: GooglePlayButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-2",
    md: "px-5 py-2.5 text-sm gap-3",
    lg: "px-6 py-3.5 text-base gap-3"
  };

  const variantClasses = {
    primary: "bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg hover:shadow-teal-600/20 border border-teal-500/30",
    dark: "bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg border border-slate-700/50",
    outline: "bg-white/80 hover:bg-white text-slate-800 border border-slate-300 hover:border-teal-500 shadow-sm hover:shadow",
    white: "bg-white hover:bg-slate-50 text-slate-900 shadow-lg border border-white"
  };

  return (
    <a
      href={SITE_CONFIG.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      aria-label="Download PHARMA QUIZ on Google Play"
    >
      <svg
        className={size === "lg" ? "w-6 h-6" : "w-5 h-5"}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M3.609 1.814L13.792 12 3.61 22.186a2.04 2.04 0 0 1-.61-1.48V3.294c0-.568.225-1.096.609-1.48z" fill="#4285F4" />
        <path d="M17.18 8.614l-3.388 3.386 3.388 3.386 3.826-2.187c.866-.496.866-1.898 0-2.394L17.18 8.614z" fill="#FBBC04" />
        <path d="M3.609 22.186l10.183-10.186 3.388 3.386-11.666 6.666a1.99 1.99 0 0 1-1.905.134z" fill="#EA4335" />
        <path d="M17.18 8.614L13.792 12 3.609 1.814a1.99 1.99 0 0 1 1.905.134l11.666 6.666z" fill="#34A853" />
      </svg>
      <div className="text-left flex flex-col leading-tight">
        <span className="text-[10px] tracking-wider uppercase opacity-85">GET IT ON</span>
        <span className="font-bold tracking-tight">Google Play</span>
      </div>
    </a>
  );
}
