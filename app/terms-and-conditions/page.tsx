import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert, CheckCircle2, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions of Use for ${SITE_CONFIG.brandName} website (${SITE_CONFIG.domain}) and Android mobile application.`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/terms-and-conditions`,
  }
};

export default function TermsPage() {
  const lastUpdated = "August 2026";

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

        {/* Header */}
        <div className="py-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: {lastUpdated} | Domain: {SITE_CONFIG.domain}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">1.</span> Agreement to Terms
            </h2>
            <p>
              By accessing or using the <strong>{SITE_CONFIG.brandName}</strong> website (<strong>{SITE_CONFIG.domain}</strong>) or downloading the <strong>{SITE_CONFIG.brandName}</strong> mobile application, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue using our platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">2.</span> Educational Purpose & Medical Disclaimer
            </h2>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm space-y-2">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Important Educational Disclaimer:</span>
              </p>
              <p>
                <strong>{SITE_CONFIG.brandName}</strong> is designed strictly for academic study, examination preparation, and educational self-assessment for pharmacy students. The questions, explanations, dosages, and drug mechanisms provided do NOT constitute medical advice, clinical diagnosis, or prescriptive guidance for patient treatment.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">3.</span> Intellectual Property Rights
            </h2>
            <p>
              All original content, branding, user interface design, compiled questions, and educational materials within {SITE_CONFIG.brandName} and on {SITE_CONFIG.domain} are the intellectual property of {SITE_CONFIG.brandName} and are protected by applicable intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">4.</span> Permitted Use & Conduct
            </h2>
            <p>You agree to use the platform solely for lawful educational purposes. You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
              <li>Reverse engineer, decompile, or extract the application source code.</li>
              <li>Scrape or reproduce question banks in bulk for unauthorized commercial distribution.</li>
              <li>Interfere with the normal operation or security of the platform.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">5.</span> Disclaimer of Warranties
            </h2>
            <p>
              The platform and all question sets are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While we strive for absolute accuracy in pharmaceutical content, we make no express warranties regarding error-free or uninterrupted operation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">6.</span> Modifications to Services
            </h2>
            <p>
              We reserve the right to modify, update, or discontinue features of {SITE_CONFIG.brandName} at any time to improve educational quality and user experience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600">7.</span> Contact Information
            </h2>
            <p>
              For questions regarding these Terms and Conditions, please contact:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
              <p className="font-bold text-slate-900">{SITE_CONFIG.brandName}</p>
              <p className="text-slate-600">Domain: {SITE_CONFIG.domain}</p>
              <p className="text-teal-700">Email: <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="underline font-semibold">{SITE_CONFIG.contactEmail}</a></p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
