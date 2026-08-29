import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock, MapPin, ShieldCheck, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us - Support & Inquiries",
  description: `Contact the ${SITE_CONFIG.brandName} team. Reach out for support, app feedback, subject question suggestions, or inquiries at ${SITE_CONFIG.contactEmail}.`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/contact`,
  }
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Contact" }]} />

        {/* Hero Header */}
        <div className="py-12 md:py-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Support & Communications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch With {SITE_CONFIG.brandName}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Have questions about our MCQ platform, suggestions for new questions, or need support? We are here to help.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start my-8">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Official Email</h2>
              <p className="text-sm text-slate-600">
                For general support, feedback, or subject suggestions, write to us directly:
              </p>
              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100">
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="font-bold text-teal-800 hover:text-teal-900 text-sm sm:text-base break-all"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </div>
            </div>

            {/* Quick FAQ Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Looking for Quick Answers?</h2>
              <p className="text-sm text-slate-600">
                Check our Frequently Asked Questions section to learn more about our app availability and subjects.
              </p>
              <Link
                href="/#faq"
                className="inline-flex items-center text-xs font-bold text-teal-600 hover:text-teal-700 underline"
              >
                View FAQs on Homepage →
              </Link>
            </div>

            {/* Android App Card */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <span>Google Play Application</span>
              </div>
              <p className="text-slate-300 text-sm">
                Install {SITE_CONFIG.brandName} directly onto your Android device.
              </p>
              <a
                href={SITE_CONFIG.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-bold text-teal-300 hover:text-teal-200 underline"
              >
                Open Google Play Store Page →
              </a>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

      </div>
    </div>
  );
}
