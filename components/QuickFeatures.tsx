import React from "react";
import { BookOpenCheck, Layers, GraduationCap, Smartphone } from "lucide-react";
import { QUICK_FEATURES } from "@/lib/constants";

export default function QuickFeatures() {
  const iconMap: Record<string, React.ReactNode> = {
    BookOpenCheck: <BookOpenCheck className="w-6 h-6 text-emerald-600" />,
    Layers: <Layers className="w-6 h-6 text-teal-600" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-cyan-600" />,
    Smartphone: <Smartphone className="w-6 h-6 text-indigo-600" />
  };

  const bgIconMap: Record<string, string> = {
    BookOpenCheck: "bg-emerald-50 border-emerald-100",
    Layers: "bg-teal-50 border-teal-100",
    GraduationCap: "bg-cyan-50 border-cyan-100",
    Smartphone: "bg-indigo-50 border-indigo-100"
  };

  return (
    <section className="py-12 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-teal-300 hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200 ${bgIconMap[feature.icon]}`}>
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
