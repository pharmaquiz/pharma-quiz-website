import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Target, HeartHandshake, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import GooglePlayButton from "@/components/GooglePlayButton";
import PhoneMockup from "@/components/PhoneMockup";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us - Pharmacy Learning & MCQ Platform",
  description: `Learn about the mission, pedagogical approach, and study philosophy behind ${SITE_CONFIG.brandName}. Designed to help pharmacy students excel in exams.`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/about`,
  }
};

export default function AboutPage() {
  const pillars = [
    {
      title: "Active Learning Over Passive Cramming",
      description: "Reading thick textbooks repeatedly is ineffective for long-term memorization. Practicing MCQs forces cognitive retrieval, creating stronger neural pathways for drug names and mechanisms.",
      icon: <Target className="w-6 h-6 text-teal-600" />
    },
    {
      title: "Comprehensive Curriculum Coverage",
      description: "Pharmacy is multifaceted. We systematically cover Pharmacology, Pharmaceutics, Pharmacognosy, Medicinal Chemistry, and Clinical Pharmacy to ensure well-rounded exam preparedness.",
      icon: <BookOpen className="w-6 h-6 text-cyan-600" />
    },
    {
      title: "Accessible & Mobile-First",
      description: "Study should fit around lectures, lab sessions, and hospital rotations. Quick mobile quiz sessions empower students to learn productively wherever they are.",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumbs items={[{ label: "About" }]} />

        {/* Hero Header */}
        <div className="py-12 md:py-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Our Mission & Vision</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Empowering the Next Generation of Pharmacists
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            <strong className="text-slate-900">{SITE_CONFIG.brandName}</strong> was founded with a singular purpose: to make pharmacy education more interactive, efficient, and accessible for students worldwide.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-12">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Transforming Pharmacy Exam Revision
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Pharmacy curriculums are notoriously rigorous. Students must master intricate chemical structures, complex pharmacokinetic models, endless drug-drug interactions, and clinical dosage regimens.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We built <strong>{SITE_CONFIG.brandName}</strong> to turn this overwhelming sea of information into structured, bite-sized practice modules. Whether preparing for university semester exams, licensing tests, or competitive pharmacy assessments, our platform provides regular testing opportunities that reinforce active recall.
            </p>
            <div className="p-5 rounded-2xl bg-teal-50 border border-teal-100 space-y-2">
              <h3 className="font-bold text-teal-900 text-sm">Key Learning Philosophy:</h3>
              <p className="text-xs sm:text-sm text-teal-800 leading-relaxed">
                &ldquo;Every correct answer builds confidence; every mistaken question provides an immediate learning opportunity through clear explanations.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <PhoneMockup
              screenSrc="/images/app-screenshots/home2.jpg"
              alt="PharmaFriends Application Overview"
              badgeText="Mobile Practice Platform"
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Our Core Educational Pillars
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Principles guiding the development of our questions and learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="my-16 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold">Start Practicing With PharmaFriends</h3>
            <p className="text-slate-300 text-sm max-w-lg">
              Download the Android application on Google Play and start practicing MCQs today.
            </p>
          </div>
          <GooglePlayButton variant="white" size="lg" />
        </div>

      </div>
    </div>
  );
}
