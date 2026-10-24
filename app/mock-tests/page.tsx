"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  GraduationCap,
  Timer,
  Award,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  HelpCircle,
  BarChart3
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const EXAM_SERIES = [
  {
    id: "gpat-2026",
    title: "GPAT 2026 Full Length Grand Mock Series",
    questionsCount: 125,
    durationMinutes: 180,
    difficulty: "Hard",
    badge: "GPAT Ready",
    color: "from-amber-500 to-orange-600",
    attempts: "4.8k Candidates"
  },
  {
    id: "niper-jee",
    title: "NIPER JEE Natural Products & Chemistry Challenge",
    questionsCount: 100,
    durationMinutes: 120,
    difficulty: "Advanced",
    badge: "NIPER JEE",
    color: "from-purple-500 to-indigo-600",
    attempts: "3.2k Candidates"
  },
  {
    id: "pharmacist-psc",
    title: "State PSC & ESIC Pharmacist Recruitment Mock",
    questionsCount: 100,
    durationMinutes: 90,
    difficulty: "Medium",
    badge: "Govt Jobs",
    color: "from-emerald-500 to-teal-600",
    attempts: "6.1k Candidates"
  },
  {
    id: "clinical-tdm",
    title: "Clinical Pharmacy & Therapeutic Drug Monitoring Drill",
    questionsCount: 50,
    durationMinutes: 60,
    difficulty: "Clinical",
    badge: "Pharm.D",
    color: "from-blue-500 to-cyan-600",
    attempts: "2.7k Candidates"
  }
];

export default function MockTestsPage() {
  const [activeTab, setActiveTab] = useState<"ALL" | "GPAT" | "PSC" | "CLINICAL">("ALL");

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#070C18] text-slate-100 pt-24 pb-20 selection:bg-rose-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#1E1128] border border-slate-800 shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Competitive Exam Preparation</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                Pharmacy Mock Tests & Active Recall Drills
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Simulate real exam conditions with strict negative marking, timed sections, in-depth clinical rationales, and automated ranking across thousands of pharmacy candidates.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href={SITE_CONFIG.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/20 flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Live Mock Test</span>
                </a>
              </div>
            </div>
          </div>

          {/* Exam Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {EXAM_SERIES.map((exam) => (
              <div
                key={exam.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl shadow-black/40 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {exam.badge}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5" />
                      <span>{exam.durationMinutes} Mins</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-2">
                    {exam.title}
                  </h3>

                  <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 mb-6 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Questions</span>
                      <span className="text-sm font-bold text-slate-200">{exam.questionsCount} MCQs</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Standard</span>
                      <span className="text-sm font-bold text-amber-400">{exam.difficulty}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Candidates</span>
                      <span className="text-sm font-bold text-slate-200">{exam.attempts}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant Score & Rationale</span>
                  </span>

                  <a
                    href={SITE_CONFIG.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Attempt Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Pharmacy Battle Arena Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-slate-900 border border-rose-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Live 1v1 Pharmacy Battle Quiz</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                  Challenge fellow pharmacy students in real time across India. Answer 10 clinical questions under pressure and rise on the national leaderboard!
                </p>
              </div>
            </div>

            <a
              href={SITE_CONFIG.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 whitespace-nowrap flex items-center gap-2"
            >
              <span>Battle on Android App</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
