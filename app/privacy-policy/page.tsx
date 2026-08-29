import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_CONFIG.brandName} mobile application and website (${SITE_CONFIG.domain}). Explaining our data collection and privacy practices.`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/privacy-policy`,
  }
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 2026";

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        {/* Header */}
        <div className="py-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: {lastUpdated} | Domain: {SITE_CONFIG.domain}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">1.</span> Introduction
            </h2>
            <p>
              Welcome to <strong>{SITE_CONFIG.brandName}</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are dedicated to providing educational MCQ practice tools for pharmacy students while respecting and safeguarding your privacy.
            </p>
            <p>
              This Privacy Policy explains how information is collected, used, and protected when you visit our website (<strong>{SITE_CONFIG.domain}</strong>) and when you use the <strong>{SITE_CONFIG.brandName}</strong> mobile application available on Google Play.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">2.</span> Information We Collect
            </h2>
            <p>
              We prioritize data minimization. Depending on your interaction with our website and application, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
              <li>
                <strong>Inquiry Information:</strong> If you voluntarily reach out via our contact form or send an email to <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-600 underline">{SITE_CONFIG.contactEmail}</a>, we receive your name, email address, and message content to respond to your inquiry.
              </li>
              <li>
                <strong>App Usage & Technical Data:</strong> Standard anonymous diagnostics, such as crash logs or device performance indicators provided through the Google Play platform, which help us identify and fix bugs.
              </li>
              <li>
                <strong>Local Practice Progress:</strong> Question progress and test scores stored locally on your device to track your revision history.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">3.</span> How We Use Your Information
            </h2>
            <p>
              We utilize collected information solely for educational and service enhancement purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
              <li>To provide, maintain, and optimize the {SITE_CONFIG.brandName} learning experience.</li>
              <li>To respond to your feedback, technical inquiries, or subject suggestions.</li>
              <li>To detect and prevent technical issues and application crashes.</li>
              <li>To analyze high-level educational trends to improve our question bank quality.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">4.</span> Data Sharing & Third Parties
            </h2>
            <p>
              We do not sell, trade, or rent user personal data to third parties. We may utilize standard, trusted third-party service providers (such as Google Play Services for application distribution) subject to their respective privacy standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">5.</span> Security of Your Data
            </h2>
            <p>
              We implement reasonable technical and organizational security measures to prevent unauthorized access, alteration, or disclosure of user communications and data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">6.</span> Children&apos;s Privacy
            </h2>
            <p>
              Our services are intended for pharmacy students, university learners, and educational candidates. We do not knowingly collect personal identifiable information from children under the age of 13.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">7.</span> Updates to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect enhancements in our app or regulatory updates. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">8.</span> Contact Us
            </h2>
            <p>
              If you have any questions or privacy-related requests regarding {SITE_CONFIG.brandName}, please contact us at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="font-bold text-slate-900">{SITE_CONFIG.brandName}</p>
              <p className="text-sm text-slate-600">Website: {SITE_CONFIG.domain}</p>
              <p className="text-sm text-teal-700">Email: <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="underline font-semibold">{SITE_CONFIG.contactEmail}</a></p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
