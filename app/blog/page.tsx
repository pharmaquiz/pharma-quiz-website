import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Info, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import GooglePlayButton from "@/components/GooglePlayButton";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog - Pharmacy Study Guides & Exam Strategies",
  description: `Educational guides, pharmacy exam tips, and study strategies curated for pharmacy students by the ${SITE_CONFIG.brandName} team.`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/blog`,
  }
};

export default function BlogPage() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Blog" }]} />

        {/* Hero Header */}
        <div className="py-12 md:py-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pharmacy Learning Resources</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Study Guides & Pharmacy Insights
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Practical study frameworks, active learning techniques, and high-yield revision tips for pharmacy exams.
          </p>

          {/* Placeholder disclaimer */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs text-left max-w-xl mx-auto">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              <strong>Note:</strong> Articles in this section are sample educational resources demonstrating the future {SITE_CONFIG.brandName} study blog.
            </span>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-3 leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{post.author.name}</p>
                  <p className="text-[11px] text-slate-400">{post.date}</p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 group"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Download Banner */}
        <div className="my-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-teal-800 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold">Put These Study Tips Into Practice</h3>
            <p className="text-slate-200 text-sm max-w-lg">
              Download {SITE_CONFIG.brandName} on Google Play to test your knowledge with active recall MCQs today.
            </p>
          </div>
          <GooglePlayButton variant="white" size="lg" />
        </div>

      </div>
    </div>
  );
}
