"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  FileText,
  Download,
  BookOpen,
  Search,
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Smartphone
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const NOTE_CATEGORIES = [
  { id: "ALL", name: "All Subjects" },
  { id: "PHARMACOLOGY", name: "Pharmacology" },
  { id: "PHARMACEUTICS", name: "Pharmaceutics" },
  { id: "CLINICAL", name: "Clinical Pharmacy" },
  { id: "MED_CHEM", name: "Medicinal Chemistry" },
  { id: "PHARMACOGNOSY", name: "Pharmacognosy" },
  { id: "HOSPITAL", name: "Hospital Pharmacy" }
];

const STUDY_NOTES = [
  {
    id: "note-1",
    title: "Autonomic Nervous System: Cholinergic & Adrenergic Receptors",
    subject: "PHARMACOLOGY",
    subjectLabel: "Pharmacology",
    description: "Detailed receptor classifications, second messenger systems, agonist/antagonist tables, and clinical posology notes.",
    size: "4.2 MB",
    pages: "24 Pages",
    color: "from-rose-500 to-pink-600"
  },
  {
    id: "note-2",
    title: "Cardiovascular Drug Classes & Antiarrhythmic Agents",
    subject: "PHARMACOLOGY",
    subjectLabel: "Pharmacology",
    description: "Vaughan Williams classification, ACE inhibitors, ARBs, Beta-blockers, CCBs, and emergent hypertension protocols.",
    size: "5.8 MB",
    pages: "36 Pages",
    color: "from-rose-500 to-pink-600"
  },
  {
    id: "note-3",
    title: "Novel Drug Delivery Systems (NDDS) & Nanocarriers",
    subject: "PHARMACEUTICS",
    subjectLabel: "Pharmaceutics",
    description: "Liposomes, ethosomes, solid lipid nanoparticles, niosomes, and targeted drug delivery kinetics with formulation equations.",
    size: "3.5 MB",
    pages: "18 Pages",
    color: "from-teal-500 to-cyan-600"
  },
  {
    id: "note-4",
    title: "Tablets & Capsule Manufacturing: Quality Control & Dissolution",
    subject: "PHARMACEUTICS",
    subjectLabel: "Pharmaceutics",
    description: "IP/BP dissolution apparatus criteria, granulation defects (capping, lamination, picking), and hardness parameters.",
    size: "6.1 MB",
    pages: "30 Pages",
    color: "from-teal-500 to-cyan-600"
  },
  {
    id: "note-5",
    title: "Antibiotics: Beta-Lactams, Macrolides, & Fluoroquinolones",
    subject: "CLINICAL",
    subjectLabel: "Clinical Pharmacy",
    description: "Mechanism of bacterial resistance, spectrum of activity, renal dose modifications, and therapeutic drug monitoring (TDM).",
    size: "4.9 MB",
    pages: "28 Pages",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "note-6",
    title: "Drug-Drug Interactions & Cytochrome P450 Enzymes",
    subject: "CLINICAL",
    subjectLabel: "Clinical Pharmacy",
    description: "CYP3A4, CYP2D6 inducers and inhibitors list, black box warnings, and clinical management strategies.",
    size: "3.1 MB",
    pages: "16 Pages",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "note-7",
    title: "Structure-Activity Relationship (SAR) of CNS Drugs",
    subject: "MED_CHEM",
    subjectLabel: "Medicinal Chemistry",
    description: "Benzodiazepines, barbiturates, phenothiazines, and tricyclic antidepressant core pharmacophores.",
    size: "7.4 MB",
    pages: "42 Pages",
    color: "from-purple-500 to-violet-600"
  },
  {
    id: "note-8",
    title: "Alkaloids, Glycosides, & Terpenoids Extraction & Tests",
    subject: "PHARMACOGNOSY",
    subjectLabel: "Pharmacognosy",
    description: "Chemical identification reagents (Mayer, Dragendorff, Wagner), biosyntheses, and pharmacological evaluations.",
    size: "5.0 MB",
    pages: "22 Pages",
    color: "from-emerald-500 to-teal-600"
  }
];

export default function NotesPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = STUDY_NOTES.filter((note) => {
    const matchCat = selectedCategory === "ALL" || note.subject === selectedCategory;
    const matchSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#070C18] text-slate-100 pt-24 pb-20 selection:bg-rose-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#0F1E36] border border-slate-800 shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pharmacy Study Hub</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                Curated Pharmacy Notes & Clinical Summaries
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Master core concepts with concise, exam-oriented study materials compiled for B.Pharm, Pharm.D, and competitive GPAT & Pharmacist licensure exams.
              </p>

              {/* Search bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by topic, drug class, or keywords..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Subject Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
            {NOTE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20 scale-105"
                    : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl shadow-black/40 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-slate-800 text-teal-400 border border-slate-700">
                      {note.subjectLabel}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">{note.size}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors mb-2 leading-snug">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {note.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{note.pages}</span>

                  <a
                    href={SITE_CONFIG.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-400 hover:text-white border border-teal-500/30 text-xs font-bold transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Note</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Android Promo Card */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950/40 to-slate-900 border border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Need Complete Offline Reading?</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Download the PharmaFriends Android app to access 1,000+ detailed chapter notes offline.
                </p>
              </div>
            </div>
            <a
              href={SITE_CONFIG.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-500/20 whitespace-nowrap flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Get Android App</span>
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
