import React from "react";
import Link from "next/link";
import { Pill, FlaskConical, Atom, Leaf, Activity, Dna, Bug, Building2, ArrowRight } from "lucide-react";
import { SubjectData } from "@/lib/subjects-data";

interface SubjectCardProps {
  subject: SubjectData;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const iconMap: Record<string, React.ReactNode> = {
    Pill: <Pill className="w-6 h-6" />,
    FlaskConical: <FlaskConical className="w-6 h-6" />,
    Atom: <Atom className="w-6 h-6" />,
    Leaf: <Leaf className="w-6 h-6" />,
    Activity: <Activity className="w-6 h-6" />,
    Dna: <Dna className="w-6 h-6" />,
    Bug: <Bug className="w-6 h-6" />,
    Building2: <Building2 className="w-6 h-6" />
  };

  const accentStyles: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", glow: "group-hover:border-teal-400 group-hover:shadow-teal-500/10" },
    cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", glow: "group-hover:border-cyan-400 group-hover:shadow-cyan-500/10" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", glow: "group-hover:border-blue-400 group-hover:shadow-blue-500/10" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", glow: "group-hover:border-emerald-400 group-hover:shadow-emerald-500/10" },
    rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200", glow: "group-hover:border-rose-400 group-hover:shadow-rose-500/10" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", glow: "group-hover:border-purple-400 group-hover:shadow-purple-500/10" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", glow: "group-hover:border-amber-400 group-hover:shadow-amber-500/10" },
    sky: { bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200", glow: "group-hover:border-sky-400 group-hover:shadow-sky-500/10" }
  };

  const style = accentStyles[subject.accentColor] || accentStyles.teal;

  return (
    <Link
      href={`/subjects#${subject.slug}`}
      className={`group p-6 rounded-2xl bg-white border border-slate-200/90 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden ${style.glow}`}
    >
      {/* Top subtle gradient accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${subject.colorGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.bg} ${style.text} border ${style.border} group-hover:scale-110 transition-transform duration-200`}>
            {iconMap[subject.iconName] || <Pill className="w-6 h-6" />}
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider group-hover:text-slate-600">
            MCQs
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
          {subject.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {subject.shortDesc}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600 group-hover:text-teal-700">
        <span>View Subject Topics</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
