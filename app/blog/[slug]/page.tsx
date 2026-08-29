import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, CheckCircle2, Share2, BookOpen, Info, ShieldCheck, Sparkles } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import GooglePlayButton from "@/components/GooglePlayButton";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { SITE_CONFIG } from "@/lib/constants";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | ${SITE_CONFIG.brandName}`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_CONFIG.siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${SITE_CONFIG.siteUrl}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title }
          ]}
        />

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              {post.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{post.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-teal-500 pl-4">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">{post.author.name}</p>
              <p className="text-xs text-slate-500">{post.author.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sample Article</span>
            </div>
          </div>
        </header>

        {/* Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-3xl p-6 sm:p-8 mb-10 shadow-xs">
            <h2 className="text-base font-bold text-teal-950 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-700" />
              <span>Key Takeaways & High-Yield Summary:</span>
            </h2>
            <ul className="space-y-2.5">
              {post.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-teal-900">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Content */}
        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {/* Sample In-Article MCQ Practice Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 my-8 space-y-4">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span>Reinforce This Knowledge in {SITE_CONFIG.brandName}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Practice this topic right now with interactive MCQs designed to build long-term retention.
            </p>
            <div>
              <GooglePlayButton size="sm" variant="primary" />
            </div>
          </div>
        </article>

        {/* Post Footer CTA */}
        <div className="my-12 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold">Ready to test yourself on this topic?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Download {SITE_CONFIG.brandName} on Google Play and start practicing today.
            </p>
          </div>
          <GooglePlayButton variant="white" size="md" />
        </div>

      </div>
    </div>
  );
}
