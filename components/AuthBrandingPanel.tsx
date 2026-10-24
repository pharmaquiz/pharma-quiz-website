"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Trophy, ShieldCheck, Zap } from "lucide-react";

interface AuthBrandingPanelProps {
  mode: "login" | "signup";
}

// Reusable SVG Pharmaceutical Capsule Illustration
function CapsuleSvg({
  colorCap = "#EF4444",
  colorBody = "#F8FAFC",
  size = 64,
  className = ""
}: {
  colorCap?: string;
  colorBody?: string;
  size?: number;
  className?: string;
}) {
  const height = size;
  const width = size * 0.45;
  const r = width / 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-cap-${colorCap.replace("#", "")}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colorCap} stopOpacity="1" />
          <stop offset="100%" stopColor="#991B1B" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`grad-body-${colorBody.replace("#", "")}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colorBody} stopOpacity="0.95" />
          <stop offset="100%" stopColor={colorBody} stopOpacity="0.7" />
        </linearGradient>
        <filter id="capsuleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Pill Outline */}
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        rx={r}
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1.5"
      />

      {/* Top Cap */}
      <path
        d={`M 1,${r + 2} A ${r - 1} ${r - 1} 0 0 1 ${width - 1},${r + 2} L ${width - 1},${height / 2} L 1,${height / 2} Z`}
        fill={`url(#grad-cap-${colorCap.replace("#", "")})`}
      />

      {/* Bottom Body */}
      <path
        d={`M 1,${height / 2} L ${width - 1},${height / 2} L ${width - 1},${height - r - 2} A ${r - 1} ${r - 1} 0 0 1 1,${height - r - 2} Z`}
        fill={`url(#grad-body-${colorBody.replace("#", "")})`}
      />

      {/* Center Band Line */}
      <line
        x1="1"
        y1={height / 2}
        x2={width - 1}
        y2={height / 2}
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="1.5"
      />

      {/* Glass Highlight */}
      <rect
        x={width * 0.2}
        y={height * 0.15}
        width={width * 0.18}
        height={height * 0.7}
        rx={width * 0.09}
        fill="white"
        fillOpacity="0.35"
      />
    </svg>
  );
}

export default function AuthBrandingPanel({ mode }: AuthBrandingPanelProps) {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP BRANDING PANEL (50% Split Screen, Left Column)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#070B16] via-[#0B1120] to-[#120B18] text-white p-12 flex-col justify-between overflow-hidden border-r border-slate-800/80 select-none">
        {/* Ambient Neon Pharmacy Glow Backdrops */}
        <div
          className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-red-600/25 rounded-full blur-[120px] pointer-events-none animate-pf-neon"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -right-20 w-[420px] h-[420px] bg-teal-500/15 rounded-full blur-[130px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 left-1/3 w-[450px] h-[450px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-pf-neon"
          style={{ animationDelay: "3s" }}
          aria-hidden="true"
        />

        {/* Subtle Cyber Pharmacy Background Grid Pattern */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Floating Capsule Illustrations */}
        <div className="absolute top-16 right-16 pointer-events-none animate-pf-capsule-1">
          <CapsuleSvg colorCap="#EF4444" colorBody="#FFFFFF" size={84} />
        </div>
        <div className="absolute top-1/3 -left-4 pointer-events-none animate-pf-capsule-2">
          <CapsuleSvg colorCap="#DC2626" colorBody="#0D9488" size={72} />
        </div>
        <div className="absolute bottom-28 right-24 pointer-events-none animate-pf-capsule-3">
          <CapsuleSvg colorCap="#F43F5E" colorBody="#E2E8F0" size={92} />
        </div>
        <div className="absolute bottom-12 left-14 pointer-events-none animate-pf-capsule-1" style={{ animationDelay: "1.5s" }}>
          <CapsuleSvg colorCap="#E11D48" colorBody="#0284C7" size={60} />
        </div>

        {/* Floating Ambient Particles */}
        <div
          className="absolute top-28 left-1/4 w-2 h-2 rounded-full bg-red-400 shadow-[0_0_12px_#EF4444] animate-pf-particle"
          style={{ animationDelay: "0.2s" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-2/3 right-1/4 w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_12px_#14B8A6] animate-pf-particle"
          style={{ animationDelay: "1.8s" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 rounded-full bg-rose-300 shadow-[0_0_8px_#FDA4AF] animate-pf-particle"
          style={{ animationDelay: "2.7s" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 right-12 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE] animate-pf-particle"
          style={{ animationDelay: "3.5s" }}
          aria-hidden="true"
        />

        {/* Top Header Section */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-red-500/30 backdrop-blur-md text-xs font-medium text-rose-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>India&apos;s #1 Pharmacy Learning & Community Platform</span>
          </div>
        </div>

        {/* Middle Core Branding & Floating Logo Section */}
        <div className="relative z-10 my-auto py-8">
          {/* Logo & Ambient Halo */}
          <div className="flex items-center gap-5 mb-6">
            <div className="relative group">
              {/* Neon Glow Behind Logo */}
              <div
                className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-red-600 to-rose-600 opacity-60 blur-xl animate-pf-neon"
                aria-hidden="true"
              />
              <div className="relative w-20 h-20 rounded-2xl bg-slate-900/90 border border-red-500/50 p-2 shadow-2xl backdrop-blur-xl animate-pf-logo">
                <Image
                  src="/images/app-screenshots/logo.jpg"
                  alt="PharmaFriends Rx Logo"
                  width={72}
                  height={72}
                  className="w-full h-full object-cover rounded-xl shadow-inner"
                  priority
                />
              </div>
            </div>

            <div>
              <h1 className="text-4xl xl:text-5xl font-black tracking-tight text-white flex items-center gap-1">
                <span>Pharma</span>
                <span className="bg-gradient-to-r from-red-400 via-rose-300 to-red-400 bg-clip-text text-transparent">
                  Friends
                </span>
              </h1>
              {/* Mandatory Tagline */}
              <p className="text-xl font-bold tracking-wide text-rose-300/90 mt-1 flex items-center gap-2">
                <span>Learn.</span>
                <span className="text-slate-400">•</span>
                <span>Connect.</span>
                <span className="text-slate-400">•</span>
                <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  Grow.
                </span>
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-base leading-relaxed max-w-lg mb-8">
            Empowering pharmacy students and professionals with high-yield MCQ practice, real-time battles, and clinical insights.
          </p>

          {/* Facebook-Inspired Community Value Pillars */}
          <div className="space-y-3.5 max-w-lg">
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-red-500/30">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-red-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>50 Starter Capsules Included</span>
                  <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                    Free
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Instant reward on signup to practice mock tests, unlock quizzes, and compete.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-teal-500/30">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center flex-shrink-0 text-teal-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Live 1v1 Pharma Battles</div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Challenge peers nationwide in rapid-fire MCQ duels tailored for GPAT, NIPER & DI.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-cyan-500/30">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Unified Android & Web Sync</div>
                <p className="text-xs text-slate-300 mt-0.5">
                  One account, one Capsule balance, and shared study progress across all your devices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Footer Social Proof / Trust Badge */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex text-amber-400">★★★★★</span>
            <span className="text-slate-300 font-semibold">4.8 / 5 Rating</span>
            <span className="text-slate-500">•</span>
            <span>Dedicated to Pharmacists</span>
          </div>
          <div className="flex items-center gap-1.5 text-teal-400 font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>Fast & Secure Auth</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE BRANDING SECTION (Single-column top banner)
          ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden w-full relative bg-gradient-to-b from-[#070B16] via-[#0B1120] to-[#111827] text-white pt-8 pb-7 px-4 border-b border-slate-800/80 overflow-hidden text-center select-none">
        {/* Subtle Ambient Glow */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 bg-red-600/25 rounded-full blur-3xl pointer-events-none animate-pf-neon"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -right-8 w-48 h-48 bg-teal-500/15 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Mini Floating Capsules for Mobile */}
        <div className="absolute top-4 left-4 pointer-events-none animate-pf-capsule-1 opacity-70">
          <CapsuleSvg colorCap="#EF4444" colorBody="#FFFFFF" size={48} />
        </div>
        <div className="absolute top-4 right-4 pointer-events-none animate-pf-capsule-2 opacity-70">
          <CapsuleSvg colorCap="#DC2626" colorBody="#0D9488" size={44} />
        </div>

        {/* Mobile Floating Rx Logo */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-3">
            <div
              className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 opacity-60 blur-lg animate-pf-neon"
              aria-hidden="true"
            />
            <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-red-500/50 p-1.5 shadow-xl animate-pf-logo">
              <Image
                src="/images/app-screenshots/logo.jpg"
                alt="PharmaFriends Rx Logo"
                width={56}
                height={56}
                className="w-full h-full object-cover rounded-xl"
                priority
              />
            </div>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white">
            <span>Pharma</span>
            <span className="bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">
              Friends
            </span>
          </h2>

          {/* Mandatory Tagline on Mobile */}
          <p className="text-sm font-bold text-rose-300/90 tracking-wide mt-0.5">
            Learn. Connect. Grow.
          </p>

          <p className="text-xs text-slate-300 mt-1.5 max-w-xs">
            {mode === "login"
              ? "Sign in to access your Capsule Wallet & exam practice"
              : "Register to claim 50 Free Starter Capsules & live quizzes"}
          </p>
        </div>
      </div>
    </>
  );
}
