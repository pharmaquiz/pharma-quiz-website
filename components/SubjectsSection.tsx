import React from "react";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { PHARMACY_SUBJECTS } from "@/lib/subjects-data";
import SubjectCard from "./SubjectCard";

export default function SubjectsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Pharmacy Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Pharmacy Subjects
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Practice questions organized systematically across all fundamental and clinical pharmacy disciplines.
          </p>
        </div>

        {/* 8 Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {PHARMACY_SUBJECTS.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        {/* Explore All Subjects Button */}
        <div className="text-center">
          <Link
            href="/subjects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-md hover:shadow-lg transition-all duration-200 group"
          >
            <span>Explore All Subjects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
