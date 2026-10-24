"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  BookMarked,
  Download,
  BookOpen,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Star
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const PHARMACY_EBOOKS = [
  {
    id: "eb-1",
    title: "Essentials of Medical Pharmacology (Tripathi Review Edition)",
    author: "KD Tripathi",
    edition: "8th Edition / Digital Companion",
    subject: "Pharmacology",
    description: "The gold standard reference text for pharmacodynamics, clinical pharmacology, chemotherapy, and toxicology.",
    pages: "1,040 Pages",
    rating: "4.9 ★★★★★",
    badge: "Core Textbook"
  },
  {
    id: "eb-2",
    title: "Lachman & Lieberman's Theory and Practice of Industrial Pharmacy",
    author: "Roop K. Khar et al.",
    edition: "4th Special Edition",
    subject: "Pharmaceutics",
    description: "Comprehensive guide to pharmaceutical dosage form design, pilot plant scale-up, preformulation, and validation.",
    pages: "920 Pages",
    rating: "4.8 ★★★★★",
    badge: "Industrial Formulation"
  },
  {
    id: "eb-3",
    title: "Wilson and Gisvold's Textbook of Organic Medicinal & Pharmaceutical Chemistry",
    author: "John H. Block & John M. Beale",
    edition: "12th Edition",
    subject: "Medicinal Chemistry",
    description: "In-depth SAR, receptor binding mechanisms, drug metabolism pathways, and physicochemical drug properties.",
    pages: "1,022 Pages",
    rating: "4.8 ★★★★★",
    badge: "SAR & Synthesis"
  },
  {
    id: "eb-4",
    title: "Pharmacognosy & Pharmacobiotechnology (Trease & Evans)",
    author: "William Charles Evans",
    edition: "16th Edition",
    subject: "Pharmacognosy",
    description: "Classic herbal drug monographs, plant secondary metabolites, phytochemical screening reagents, and marine drugs.",
    pages: "616 Pages",
    rating: "4.7 ★★★★★",
    badge: "Phytomedicine"
  },
  {
    id: "eb-5",
    title: "Comprehensive Pharmacy Review for GPAT & Licensure",
    author: "PharmaFriends Expert Faculty",
    edition: "2026 Updated Edition",
    subject: "Competitive Exam Guide",
    description: "Point-wise high-yield memory tables, mnemonic summaries, previous 10-year question trend analysis, and mock papers.",
    pages: "680 Pages",
    rating: "4.9 ★★★★★",
    badge: "GPAT 2026 Edition"
  },
  {
    id: "eb-6",
    title: "A Textbook of Hospital & Clinical Pharmacy",
    author: "Pratibha Nand & R.K. Khar",
    edition: "5th Edition",
    subject: "Clinical Practice",
    description: "Hospital drug formulary systems, unit dose dispensing, ADR monitoring, drug store layout, and IV admixture services.",
    pages: "450 Pages",
    rating: "4.7 ★★★★★",
    badge: "Hospital Practice"
  }
];

export default function EbooksPage() {
  const [search, setSearch] = useState("");

  const filteredEbooks = PHARMACY_EBOOKS.filter((eb) => {
    const q = search.toLowerCase();
    return eb.title.toLowerCase().includes(q) ||
      eb.author.toLowerCase().includes(q) ||
      eb.subject.toLowerCase().includes(q);
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#070C18] text-slate-100 pt-24 pb-20 selection:bg-rose-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#1F1733] border border-slate-800 shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 inline-flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5" />
                <span>Standard Reference Textbooks</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                Pharmacy E-Books & Study Textbooks
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Instant digital access to top-tier curriculum textbooks, authoritative reference manuals, and GPAT cracker guides approved for B.Pharm and Pharm.D candidates.
              </p>

              {/* Search bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search book title, author, or subject..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* E-Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEbooks.map((book) => (
              <div
                key={book.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl shadow-black/40 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {book.badge}
                    </span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{book.rating}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors mb-1.5 leading-snug">
                    {book.title}
                  </h3>

                  <span className="text-xs text-slate-400 block mb-2 font-medium">
                    By {book.author} • {book.edition}
                  </span>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {book.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{book.pages}</span>

                  <a
                    href={SITE_CONFIG.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-bold transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Read on App</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
