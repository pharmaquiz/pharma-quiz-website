import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import GooglePlayButton from "./GooglePlayButton";
import PhoneMockup from "./PhoneMockup";
import { SITE_CONFIG } from "@/lib/constants";

export default function Hero() {
  const highlights = [
    "Subject-wise MCQ Practice",
    "Instant Answer Explanations",
    "Clean & Student-Friendly"
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-teal-50/70 via-slate-50 to-white bg-radial-glow">
      {/* Background Decorative Blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-teal-200/30 to-cyan-200/20 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-10 right-0 w-72 h-72 bg-emerald-100/40 blur-2xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Content & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>Pharmacy Learning & Practice Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Master Pharmacy. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
                One Question at a Time.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              <strong className="font-semibold text-slate-800">{SITE_CONFIG.brandName}</strong> is your smart pharmacy study and community companion, designed to help pharmacy students practice MCQs, connect with peers, and prepare confidently for exams.
            </p>

            {/* Highlights bullet pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm font-medium text-slate-700">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-white/90 border border-slate-200/90 rounded-full px-3.5 py-1.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <GooglePlayButton size="lg" variant="primary" />
              <Link
                href="/features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-teal-500 shadow-sm transition-all duration-200"
              >
                <span>Explore Features</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </div>

            {/* Trust Indicator */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Available now on Google Play Store for Android devices</span>
            </div>
          </div>

          {/* Right Column: Hero Smartphone Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Floating Decorative card: Instant MCQ Feedback */}
              <div className="hidden sm:flex absolute -left-8 top-16 z-20 glass-card p-3 rounded-2xl shadow-xl border border-teal-100 items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-sm shadow">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Instant Answer</p>
                  <p className="text-[11px] text-teal-700">Immediate feedback & rationale</p>
                </div>
              </div>

              {/* Floating Decorative card: Multiple Subjects */}
              <div className="hidden sm:flex absolute -right-6 bottom-20 z-20 glass-card p-3 rounded-2xl shadow-xl border border-teal-100 items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  8+
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Pharmacy Subjects</p>
                  <p className="text-[11px] text-cyan-700">Curriculum-aligned practice</p>
                </div>
              </div>

              {/* Main Phone Frame */}
              <PhoneMockup
                screenSrc="/images/app-screenshots/home.jpg"
                alt="PharmaFriends Android App Home Interface"
                badgeText="App Preview"
                priority={true}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
