"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Briefcase,
  MapPin,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  Send,
  Search,
  Filter,
  CheckCircle2
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const PHARMACY_JOBS = [
  {
    id: "job-1",
    title: "Clinical Pharmacist (Critical Care & ICU)",
    company: "Apollo Health City Hospital",
    location: "Hyderabad, Telangana",
    type: "Full Time",
    experience: "1-3 Years",
    salary: "₹4.5 - 6.5 LPA",
    qualification: "Pharm.D / M.Pharm (Pharmacy Practice)",
    posted: "1 day ago",
    badge: "Urgent Opening"
  },
  {
    id: "job-2",
    title: "Drug Safety Associate / Pharmacovigilance Analyst",
    company: "Cognizant Life Sciences",
    location: "Bangalore, Karnataka",
    type: "Full Time",
    experience: "0-2 Years (Freshers Eligible)",
    salary: "₹3.8 - 5.2 LPA",
    qualification: "B.Pharm / M.Pharm / Pharm.D",
    posted: "2 days ago",
    badge: "MNC Hiring"
  },
  {
    id: "job-3",
    title: "Quality Assurance (QA) Executive - Sterile Injectables",
    company: "Dr. Reddy's Laboratories",
    location: "Visakhapatnam, AP",
    type: "Full Time",
    experience: "2-4 Years",
    salary: "₹4.2 - 6.0 LPA",
    qualification: "B.Pharm / M.Pharm (Pharmaceutics/QA)",
    posted: "3 days ago",
    badge: "USFDA Facility"
  },
  {
    id: "job-4",
    title: "Clinical Research Coordinator (CRC) - Oncology Trials",
    company: "Fortis Memorial Research Institute",
    location: "Gurugram, NCR",
    type: "Full Time",
    experience: "1-2 Years",
    salary: "₹3.6 - 5.0 LPA",
    qualification: "Pharm.D / B.Pharm / M.Sc Clinical Research",
    posted: "Just now",
    badge: "Clinical Trial"
  },
  {
    id: "job-5",
    title: "Hospital Pharmacist & Dispensary In-Charge",
    company: "KIMS Health Care Group",
    location: "Trivandrum, Kerala",
    type: "Full Time",
    experience: "0-3 Years",
    salary: "₹3.0 - 4.2 LPA",
    qualification: "D.Pharm / B.Pharm (State Pharmacy Council Registered)",
    posted: "4 days ago",
    badge: "NABH Accredited"
  },
  {
    id: "job-6",
    title: "Regulatory Affairs (RA) Specialist - EU Dossiers",
    company: "Cipla Global Formulation R&D",
    location: "Mumbai, Maharashtra",
    type: "Full Time",
    experience: "2-5 Years",
    salary: "₹5.5 - 8.0 LPA",
    qualification: "M.Pharm (RA/Pharmaceutics)",
    posted: "5 days ago",
    badge: "Global Markets"
  }
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");

  const filteredJobs = PHARMACY_JOBS.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase()) ||
      j.qualification.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#070C18] text-slate-100 pt-24 pb-20 selection:bg-rose-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#102A24] border border-slate-800 shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 inline-flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Pharmacy Placement & Careers</span>
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                Verified Pharmacy Openings Across India
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Discover hospital pharmacist vacancies, pharmacovigilance positions, clinical research roles, and formulation industry openings tailored for pharmacy graduates.
              </p>

              {/* Search bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search role, hospital, city or qualification..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Job Openings List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl shadow-black/40 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {job.badge}
                    </span>
                    <span className="text-xs text-slate-500">{job.posted}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1.5 leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-3">
                    <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{job.company}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-4 bg-slate-950/50 p-3 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="text-right font-bold text-emerald-400">
                      {job.salary}
                    </div>
                    <div className="col-span-2 text-[11px] text-slate-400 truncate">
                      Eligibility: <span className="text-slate-200">{job.qualification}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Exp: {job.experience}</span>

                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}?subject=Application for ${encodeURIComponent(job.title)} at ${encodeURIComponent(job.company)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Apply / Contact HR</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
