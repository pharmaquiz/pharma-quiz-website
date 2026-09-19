import React from "react";
import Link from "next/link";
import { Sparkles, BookOpen, Users, Share2, Compass, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";
import GooglePlayButton from "./GooglePlayButton";

export default function RebrandAnnouncement() {
  const pillars = [
    {
      title: "Learn",
      description: "Subject-wise MCQs, clinical pearls, concise study summaries, and instant answer rationales.",
      icon: <BookOpen className="w-5 h-5 text-teal-600" />,
      color: "bg-teal-50 border-teal-100 text-teal-800"
    },
    {
      title: "Connect",
      description: "Direct one-to-one messaging and peer collaboration with pharmacy learners across institutions.",
      icon: <Users className="w-5 h-5 text-blue-600" />,
      color: "bg-blue-50 border-blue-100 text-blue-800"
    },
    {
      title: "Share",
      description: "Social feed for academic posts, clinical diagrams, study questions, and short-form video reels.",
      icon: <Share2 className="w-5 h-5 text-indigo-600" />,
      color: "bg-indigo-50 border-indigo-100 text-indigo-800"
    },
    {
      title: "Discover",
      description: "Explore pharmacy career pathways, academic milestones, and pharmaceutical domain opportunities.",
      icon: <Compass className="w-5 h-5 text-amber-600" />,
      color: "bg-amber-50 border-amber-100 text-amber-800"
    },
    {
      title: "Grow",
      description: "Live real-time Pharma Battles, accuracy milestones, daily tests, and capsule rewards.",
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-100 text-emerald-800"
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-white via-teal-50/30 to-slate-50 relative overflow-hidden border-y border-teal-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-teal-500/20 overflow-hidden">
          
          {/* Background Decorative Accents */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-teal-300 animate-pulse" />
              <span>Official Platform Evolution</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              PharmaQuiz is now <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">PharmaFriends</span>
            </h2>

            {/* Supporting Statement */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal">
              PharmaQuiz has evolved into <strong>PharmaFriends</strong> — a connected community for learning, sharing, discovering opportunities, and growing together.
            </p>

            {/* Transition Clarification Notice */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              <span className="font-semibold text-teal-300">Same app. New name. A bigger community experience.</span>
              <span className="hidden sm:inline text-slate-500">•</span>
              <span className="text-slate-400">Your existing progress, scores, and account stay completely intact.</span>
            </div>

            {/* 5 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-6 text-left">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white/10">
                      {pillar.icon}
                    </div>
                    <h3 className="font-bold text-white text-base">{pillar.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GooglePlayButton size="lg" variant="white" />
              <Link
                href="/features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
              >
                <span>Explore PharmaFriends Features</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Available directly on Google Play for Android — no re-registration needed.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
