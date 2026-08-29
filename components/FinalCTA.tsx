import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import GooglePlayButton from "./GooglePlayButton";

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & CTA */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Get Started Free on Google Play</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Your Pharmacy Journey Starts Here.
            </h2>

            <p className="text-lg sm:text-2xl font-light text-teal-200 tracking-wide">
              Practice. Learn. Improve. Repeat.
            </p>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Join pharmacy students strengthening their understanding one question at a time with <strong className="text-white">{SITE_CONFIG.brandName}</strong>.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <GooglePlayButton size="lg" variant="white" />
            </div>
          </div>

          {/* Right QR Code Showcase Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 text-center space-y-4 max-w-xs shadow-2xl">
              <div className="bg-white p-3 rounded-2xl shadow-inner inline-block">
                <Image
                  src="/images/qr-code.svg"
                  alt="Download PHARMA QUIZ QR Code"
                  width={150}
                  height={150}
                  className="w-36 h-36 object-contain"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Scan to Install
                </p>
                <p className="text-xs text-slate-300">
                  Point your phone camera to download directly from Google Play.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
