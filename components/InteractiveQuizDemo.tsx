"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Sparkles, RotateCcw, ArrowRight } from "lucide-react";
import GooglePlayButton from "./GooglePlayButton";

interface QuizQuestion {
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_DEMO_QUESTIONS: QuizQuestion[] = [
  {
    subject: "Pharmacology",
    question: "Which of the following is considered a first-line prototype non-selective beta blocker?",
    options: ["Propranolol", "Metoprolol", "Amlodipine", "Enalapril"],
    correctIndex: 0,
    explanation: "Propranolol is the prototype non-selective beta-1 and beta-2 adrenergic antagonist without intrinsic sympathomimetic activity."
  },
  {
    subject: "Pharmaceutics",
    question: "What is the primary role of Croscarmellose Sodium in solid tablet manufacturing?",
    options: ["Superdisintegrant", "Lubricant", "Glidant", "Coloring agent"],
    correctIndex: 0,
    explanation: "Croscarmellose Sodium rapidly swells in aqueous media, facilitating immediate tablet disintegration and drug dissolution."
  },
  {
    subject: "Pharmaceutical Chemistry",
    question: "The chemical nucleus consisting of a beta-lactam ring fused with a thiazolidine ring belongs to:",
    options: ["Penicillins", "Cephalosporins", "Macrolides", "Tetracyclines"],
    correctIndex: 0,
    explanation: "Penicillins have the 6-aminopenicillanic acid (6-APA) nucleus composed of a thiazolidine ring fused with a beta-lactam ring."
  }
];

export default function InteractiveQuizDemo() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQ = SAMPLE_DEMO_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setCurrentIdx((prev) => (prev + 1) % SAMPLE_DEMO_QUESTIONS.length);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-teal-200/80 shadow-2xl relative overflow-hidden bg-white/95">
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Web Preview: {currentQ.subject}</span>
        </div>
        <span className="text-xs font-bold text-slate-400">
          Demo {currentIdx + 1}/{SAMPLE_DEMO_QUESTIONS.length}
        </span>
      </div>

      {/* Question */}
      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-6 leading-snug">
        {currentQ.question}
      </h4>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((opt, idx) => {
          let btnClass = "border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-800";
          if (hasAnswered) {
            if (idx === currentQ.correctIndex) {
              btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-2 ring-emerald-300";
            } else if (idx === selectedOption) {
              btnClass = "border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-200";
            } else {
              btnClass = "border-slate-200 bg-white opacity-60 text-slate-400";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={hasAnswered}
              className={`w-full p-3.5 rounded-xl border text-left text-sm flex items-center justify-between transition-all duration-200 ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600 shadow-xs">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>
              {hasAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              )}
              {hasAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {hasAnswered && (
        <div className="p-4 rounded-xl bg-teal-50/90 border border-teal-200 mb-5 animate-fadeIn">
          <p className="text-xs font-bold text-teal-900 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Instant Rationale & Explanation</span>
          </p>
          <p className="text-xs text-teal-800 leading-relaxed">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={handleNext}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
        >
          <span>{hasAnswered ? "Try Next Sample Question" : "Skip Question"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Get 1,000+ MCQs in the app:</span>
          <GooglePlayButton size="sm" variant="primary" />
        </div>
      </div>
    </div>
  );
}
