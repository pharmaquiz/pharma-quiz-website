import React from "react";
import { MessageSquareQuote, Info, Star } from "lucide-react";
import { PLACEHOLDER_REVIEWS, SITE_CONFIG } from "@/lib/constants";

export default function ReviewsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Community Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Students Say About {SITE_CONFIG.brandName}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Hear how pharmacy students and graduates leverage daily MCQ practice for academic and competitive exams.
          </p>

          {/* Explicit Transparency Notice as required */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs text-left max-w-xl mx-auto">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              <strong>Notice:</strong> The items below represent sample placeholder testimonials and will be updated directly with genuine Google Play user reviews.
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLACEHOLDER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:border-teal-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                    {review.badge}
                  </span>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.author}</h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
