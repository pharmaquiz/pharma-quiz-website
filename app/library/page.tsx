"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  BookOpen,
  Pill,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Info,
  AlertTriangle
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const DRUG_MONOGRAPHS = [
  {
    id: "paracetamol",
    genericName: "Paracetamol (Acetaminophen)",
    therapeuticClass: "Analgesic & Antipyretic",
    mechanism: "Inhibits prostaglandin synthesis primarily in CNS; weak peripheral anti-inflammatory action.",
    dosage: "500 mg - 1000 mg every 4-6 hours (Max 4g/day in adults).",
    adverseEffects: "Hepatotoxicity in overdose (NAPQI accumulation), acute hepatic necrosis, rash.",
    contraindications: "Severe hepatic impairment, active severe liver disease.",
    antidote: "N-Acetylcysteine (NAC) within 8 hours of ingestion."
  },
  {
    id: "atorvastatin",
    genericName: "Atorvastatin Calcium",
    therapeuticClass: "HMG-CoA Reductase Inhibitor (Statin)",
    mechanism: "Competitively inhibits 3-hydroxy-3-methylglutaryl-coenzyme A reductase, reducing LDL cholesterol and triglycerides.",
    dosage: "10 mg to 80 mg once daily at bedtime.",
    adverseEffects: "Myopathy, rhabdomyolysis, elevated liver transaminases, gastrointestinal upset.",
    contraindications: "Active liver disease, pregnancy (Category X), lactation.",
    antidote: "No specific antidote; monitor CPK and manage rhabdomyolysis with hydration."
  },
  {
    id: "metformin",
    genericName: "Metformin Hydrochloride",
    therapeuticClass: "Biguanide Antidiabetic Agent",
    mechanism: "Decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity by increasing peripheral glucose uptake.",
    dosage: "500 mg twice daily with meals (Titrated to max 2000-2550 mg/day).",
    adverseEffects: "Lactic acidosis (rare but severe), metallic taste, vitamin B12 deficiency, diarrhoea.",
    contraindications: "Severe renal impairment (eGFR < 30 mL/min/1.73m²), metabolic acidosis, acute heart failure.",
    antidote: "Hemodialysis effectively removes metformin and corrects acidosis."
  },
  {
    id: "amoxicillin-clav",
    genericName: "Amoxicillin + Clavulanic Acid",
    therapeuticClass: "Beta-Lactam Antibiotic + Beta-Lactamase Inhibitor",
    mechanism: "Amoxicillin binds to PBPs preventing bacterial cell wall synthesis; Clavulanate irreversibly inactivates beta-lactamase enzymes.",
    dosage: "625 mg (500/125) every 8 hours or 1000 mg (875/125) every 12 hours.",
    adverseEffects: "Diarrhoea, nausea, cholestatic jaundice, skin rash, hypersensitivity anaphylaxis.",
    contraindications: "History of penicillin hypersensitivity, amoxicillin/clavulanate-associated jaundice.",
    antidote: "Epinephrine, IV corticosteroids, and airway management for anaphylaxis."
  }
];

export default function LibraryPage() {
  const [search, setSearch] = useState("");

  const filteredMonographs = DRUG_MONOGRAPHS.filter((d) => {
    const q = search.toLowerCase();
    return d.genericName.toLowerCase().includes(q) ||
      d.therapeuticClass.toLowerCase().includes(q) ||
      d.mechanism.toLowerCase().includes(q);
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#070C18] text-slate-100 pt-24 pb-20 selection:bg-rose-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#0F2436] border border-slate-800 shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Authoritative Drug Information</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                PharmaFriends Clinical Drug Library
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Clinical pharmacology monographs, mechanism of action, adult & pediatric posology, drug-drug interactions, contraindications, and emergency overdose antidotes.
              </p>

              {/* Search bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search drug by generic name or class..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Monographs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMonographs.map((drug) => (
              <div
                key={drug.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl shadow-black/40 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {drug.therapeuticClass}
                    </span>
                    <Pill className="w-4 h-4 text-cyan-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3">
                    {drug.genericName}
                  </h3>

                  <div className="flex flex-col gap-3 text-xs leading-relaxed text-slate-300 mb-4">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Mechanism of Action (MOA):</span>
                      <p className="text-slate-300">{drug.mechanism}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Posology:</span>
                        <span className="font-semibold text-slate-200">{drug.dosage}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Antidote / Management:</span>
                        <span className="font-semibold text-emerald-400">{drug.antidote}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-[11px] text-amber-300/90 bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/40">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span><strong>Warning:</strong> {drug.adverseEffects}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Contraindicated in: {drug.contraindications}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
