import React from "react";
import { Download, PlayCircle, TrendingUp, ArrowRight } from "lucide-react";
import { HOW_IT_WORKS_STEPS, SITE_CONFIG } from "@/lib/constants";
import GooglePlayButton from "./GooglePlayButton";

export default function HowItWorks() {
  const iconStepMap = [
    <Download key="1" className="w-6 h-6 text-teal-600" />,
    <PlayCircle key="2" className="w-6 h-6 text-cyan-600" />,
    <TrendingUp key="3" className="w-6 h-6 text-emerald-600" />
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/60 text-teal-800 text-xs font-semibold uppercase tracking-wider">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Get started in seconds and integrate quick MCQ sessions into your everyday pharmacy study routine.
          </p>
        </div>

        {/* 3 Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-12">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between group"
            >
              {/* Step Number Top Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-extrabold text-teal-600/30 group-hover:text-teal-600/60 transition-colors">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {iconStepMap[idx]}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm font-semibold text-teal-700 mb-2">
                  {step.subtitle}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-400 group-hover:text-teal-600 transition-colors">
                <span>Step {idx + 1} of 3</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <GooglePlayButton size="md" variant="primary" />
        </div>

      </div>
    </section>
  );
}
