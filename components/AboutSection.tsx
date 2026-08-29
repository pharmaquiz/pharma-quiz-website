import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Target, CheckCircle2, Award } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function AboutSection() {
  const points = [
    "Targeted multiple choice practice aligned with modern pharmacy curricula",
    "Immediate validation of answers to reinforce conceptual retention",
    "Distraction-free mobile interface designed for daily study sessions",
    "Continuous additions across clinical and pharmaceutical disciplines"
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual card graphic */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-teal-100/50 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Built for Pharmacy Students</h3>
                  <p className="text-xs text-slate-500">Focused & Structured Learning</p>
                </div>
              </div>

              {/* Mini Interactive Study Matrix Showcase */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Active Retrieval</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Testing memory through MCQs yields better long-term retention than passive reading.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Target Weak Topics</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Quickly identify which drug classes or calculations need further textbook revision.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Daily Habit Building</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Short 5-minute practice runs build continuous momentum towards exam readiness.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-teal-700">{SITE_CONFIG.brandName}</span>
                <span>Android Application</span>
              </div>
            </div>
          </div>

          {/* Right Column: Heading & Text */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/60 text-teal-800 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>About {SITE_CONFIG.brandName}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Your Pharmacy Learning Companion
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              <strong className="font-semibold text-slate-900">{SITE_CONFIG.brandName}</strong> makes pharmacy learning more interactive, accessible, and engaging. Practice questions, test your knowledge, identify areas for improvement, and keep learning wherever you are.
            </p>

            <div className="space-y-3 pt-2">
              {points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-slate-700">{pt}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
