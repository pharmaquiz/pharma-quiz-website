import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, CheckCircle2, Swords, BookMarked, MessageSquare, LayoutGrid, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import GooglePlayButton from "@/components/GooglePlayButton";
import PhoneMockup from "@/components/PhoneMockup";
import QRCodeBadge from "@/components/QRCodeBadge";
import { SITE_CONFIG, DETAILED_FEATURES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Features - Smart Pharmacy MCQ Practice Tools",
  description: `Explore the study tools and features inside ${SITE_CONFIG.brandName}. Instant feedback, live Pharma Battles, digital library, PharmaChat, and mobile practice for pharmacy students.`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/features`,
  }
};

export default function FeaturesPage() {
  const featureDeepDives = [
    {
      title: "Subject Categories & Chapter MCQs",
      subtitle: "Curriculum-aligned question bank",
      desc: "Practice questions systematically grouped by pharmacy discipline and chapter. Each module tests high-yield concepts commonly assessed in university semesters, GPAT, and clinical licensing examinations.",
      bullets: [
        "Pharmacology mechanism and drug interactions",
        "Pharmaceutics formulation and dosage calculations",
        "Medicinal chemistry SAR and functional groups",
        "Pharmacognosy crude drug identification and chemical tests"
      ],
      screen: "/images/app-screenshots/category.jpg",
      reverse: false
    },
    {
      title: "Pharma Battle: Real-Time Multiplayer Quiz",
      subtitle: "Head-to-head competitive practice",
      desc: "Challenge fellow pharmacy students in fast-paced, real-time MCQ battles. Compete on speed, accuracy, and knowledge retention while having fun.",
      bullets: [
        "Live 1-on-1 player matchmaking",
        "Timed rapid-fire questions",
        "Instant score comparison and leaderboards",
        "Gamified learning that keeps revision exciting"
      ],
      screen: "/images/app-screenshots/pharmabattle.jpg",
      reverse: true
    },
    {
      title: "Digital Pharmacy Library",
      subtitle: "Integrated study references",
      desc: "Access essential reference materials, classification charts, and concise study summaries directly within the app before or after taking practice quizzes.",
      bullets: [
        "High-yield drug classification guides",
        "Formula sheets and pharmaceutical calculation guides",
        "Quick reference charts for rapid last-minute revision"
      ],
      screen: "/images/app-screenshots/pharma_library.jpg",
      reverse: false
    },
    {
      title: "PharmaChat Learning Assistant",
      subtitle: "Interactive concept clarifications",
      desc: "Ask questions, explore complex pharmacodynamic mechanisms, and clarify confusing drug formulations whenever you get stuck.",
      bullets: [
        "Interactive explanations for tricky topics",
        "Immediate assistance during self-study sessions",
        "Simplifies complex pharmaceutical concepts"
      ],
      screen: "/images/app-screenshots/pharma_chat.jpg",
      reverse: true
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: "Features" }]} />

        {/* Hero Header */}
        <div className="py-12 md:py-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Pharmacy Excellence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Features Designed for Better Pharmacy Retention
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover all the study tools built into <strong className="text-slate-900">{SITE_CONFIG.brandName}</strong> to make your exam preparation structured, engaging, and effective.
          </p>
        </div>

        {/* Feature Grid Quick Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {DETAILED_FEATURES.map((feature) => (
            <div key={feature.id} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-5 text-teal-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm font-semibold text-teal-700 mb-2">{feature.description}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{feature.details}</p>
            </div>
          ))}
        </div>

        {/* Deep Dive Rows with Real Screenshots */}
        <div className="my-20 space-y-24">
          {featureDeepDives.map((item, idx) => (
            <div key={idx} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${item.reverse ? "lg:flex-row-reverse" : ""}`}>
              <div className={`lg:col-span-6 space-y-6 ${item.reverse ? "lg:order-2" : "lg:order-1"}`}>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
                  {item.subtitle}
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900">{item.title}</h2>
                <p className="text-base text-slate-600 leading-relaxed">{item.desc}</p>
                <ul className="space-y-2.5 pt-2">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`lg:col-span-6 flex justify-center ${item.reverse ? "lg:order-1" : "lg:order-2"}`}>
                <PhoneMockup screenSrc={item.screen} alt={item.title} />
              </div>
            </div>
          ))}
        </div>

        {/* Download Call to Action Bar */}
        <div className="my-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Experience All Features on Android</h3>
            <p className="text-slate-600 text-sm max-w-md">
              Download the official {SITE_CONFIG.brandName} application from Google Play today.
            </p>
            <div className="pt-2">
              <GooglePlayButton size="lg" variant="primary" />
            </div>
          </div>
          <QRCodeBadge />
        </div>

      </div>
    </div>
  );
}
