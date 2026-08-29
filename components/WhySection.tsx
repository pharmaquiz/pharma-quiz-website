import React from "react";
import { Target, Layout, Zap, BookOpen, Compass, Award, Check } from "lucide-react";
import { SITE_CONFIG, WHY_CHOOSE_ITEMS } from "@/lib/constants";

export default function WhySection() {
  const iconMap: Record<string, React.ReactNode> = {
    Target: <Target className="w-6 h-6 text-teal-600" />,
    Layout: <Layout className="w-6 h-6 text-cyan-600" />,
    Zap: <Zap className="w-6 h-6 text-amber-500" />,
    BookOpen: <BookOpen className="w-6 h-6 text-indigo-600" />,
    Compass: <Compass className="w-6 h-6 text-blue-600" />,
    Award: <Award className="w-6 h-6 text-emerald-600" />
  };

  const bgMap: Record<string, string> = {
    Target: "bg-teal-50 border-teal-100",
    Layout: "bg-cyan-50 border-cyan-100",
    Zap: "bg-amber-50 border-amber-100",
    BookOpen: "bg-indigo-50 border-indigo-100",
    Compass: "bg-blue-50 border-blue-100",
    Award: "bg-emerald-50 border-emerald-100"
  };

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Platform Advantages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose {SITE_CONFIG.brandName}?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A purposeful, student-first platform designed to make pharmacy revision efficient, structured, and rewarding.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-teal-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200 ${bgMap[item.icon] || "bg-teal-50 border-teal-100"}`}>
                {iconMap[item.icon]}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-teal-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
