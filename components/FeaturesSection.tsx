import React from "react";
import { Sparkles } from "lucide-react";
import { DETAILED_FEATURES } from "@/lib/constants";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/60 text-teal-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Study Tools & Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Practice Smarter
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A comprehensive suite of study features designed specifically to streamline your pharmacy exam revision.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DETAILED_FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              id={feature.id}
              title={feature.title}
              description={feature.description}
              details={feature.details}
              icon={feature.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
