import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Layers, Pill, FlaskConical, Atom, Leaf, Activity, Dna, Bug, Building2, CheckCircle2, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import GooglePlayButton from "@/components/GooglePlayButton";
import { PHARMACY_SUBJECTS, SubjectData } from "@/lib/subjects-data";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pharmacy Subjects - Comprehensive MCQ Coverage",
  description: `Explore pharmacy subjects covered in ${SITE_CONFIG.brandName}: Pharmacology, Pharmaceutics, Pharmaceutical Chemistry, Pharmacognosy, Physiology, Biochemistry, Microbiology, and Clinical Pharmacy.`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/subjects`,
  }
};

export default function SubjectsPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Pill: <Pill className="w-7 h-7 text-teal-600" />,
    FlaskConical: <FlaskConical className="w-7 h-7 text-cyan-600" />,
    Atom: <Atom className="w-7 h-7 text-blue-600" />,
    Leaf: <Leaf className="w-7 h-7 text-emerald-600" />,
    Activity: <Activity className="w-7 h-7 text-rose-600" />,
    Dna: <Dna className="w-7 h-7 text-purple-600" />,
    Bug: <Bug className="w-7 h-7 text-amber-600" />,
    Building2: <Building2 className="w-7 h-7 text-sky-600" />
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Subjects" }]} />

        {/* Hero Header */}
        <div className="py-12 md:py-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Academic Scope</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pharmacy Subjects & Question Modules
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Practice across the 8 core pillars of the pharmaceutical sciences curriculum. Strengthen core concepts and test your knowledge.
          </p>
        </div>

        {/* Subject Quick Jump Bar */}
        <div className="glass-card p-4 rounded-2xl mb-16 border border-slate-200 shadow-sm overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Jump to:</span>
            {PHARMACY_SUBJECTS.map((s) => (
              <a
                key={s.id}
                href={`#${s.slug}`}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-teal-50 hover:text-teal-700 text-xs font-semibold text-slate-700 border border-slate-200 transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Subject Deep Dive Sections */}
        <div className="space-y-16">
          {PHARMACY_SUBJECTS.map((subject, idx) => (
            <div
              key={subject.id}
              id={subject.slug}
              className="scroll-mt-28 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
                      {iconMap[subject.iconName] || <Pill className="w-7 h-7 text-teal-600" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                        Subject #{idx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {subject.name}
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 text-base leading-relaxed">
                    {subject.longDesc}
                  </p>

                  {/* High-yield topics list */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                      High-Yield Topics Covered:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {subject.topics.map((t, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Sample MCQ Box */}
                <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                        Sample Question Preview
                      </span>
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                    </div>

                    {subject.sampleQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-3">
                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                          Q. {q.question}
                        </p>

                        <div className="space-y-1.5">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-2 rounded-lg text-xs font-medium border flex items-center gap-2 ${
                                oIdx === q.answerIndex
                                  ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold"
                                  : "bg-white text-slate-600 border-slate-200"
                              }`}
                            >
                              <span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[10px]">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 rounded-lg bg-white border border-slate-200 mt-3 text-[11px] text-slate-600 leading-normal">
                          <strong className="text-emerald-700">Explanation: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Practice full question bank</span>
                    <GooglePlayButton size="sm" variant="primary" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold">Practice All 8 Subjects on Your Phone</h3>
            <p className="text-slate-300 text-sm max-w-lg">
              Download {SITE_CONFIG.brandName} for Android and test yourself anytime, anywhere.
            </p>
          </div>
          <GooglePlayButton variant="white" size="lg" />
        </div>

      </div>
    </div>
  );
}
