import React from "react";
import { CheckCircle2, Zap, TrendingUp, Clock, Sparkles, Repeat } from "lucide-react";

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  details?: string;
  icon: string;
}

export default function FeatureCard({
  title,
  description,
  details,
  icon
}: FeatureCardProps) {
  const iconMap: Record<string, React.ReactNode> = {
    CheckCircle2: <CheckCircle2 className="w-6 h-6 text-teal-600" />,
    Zap: <Zap className="w-6 h-6 text-amber-500" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-blue-600" />,
    Clock: <Clock className="w-6 h-6 text-emerald-600" />,
    Sparkles: <Sparkles className="w-6 h-6 text-indigo-600" />,
    Repeat: <Repeat className="w-6 h-6 text-cyan-600" />
  };

  const bgMap: Record<string, string> = {
    CheckCircle2: "bg-teal-50 border-teal-100",
    Zap: "bg-amber-50 border-amber-100",
    TrendingUp: "bg-blue-50 border-blue-100",
    Clock: "bg-emerald-50 border-emerald-100",
    Sparkles: "bg-indigo-50 border-indigo-100",
    Repeat: "bg-cyan-50 border-cyan-100"
  };

  return (
    <div className="p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200 ${bgMap[icon] || "bg-teal-50 border-teal-100"}`}>
        {iconMap[icon] || <CheckCircle2 className="w-6 h-6 text-teal-600" />}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-teal-700 transition-colors">
        {title}
      </h3>
      <p className="text-sm font-medium text-slate-700 mb-2">
        {description}
      </p>
      {details && (
        <p className="text-xs text-slate-500 leading-relaxed">
          {details}
        </p>
      )}
    </div>
  );
}
