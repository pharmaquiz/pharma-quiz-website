import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import GooglePlayButton from "./GooglePlayButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Brand & Tagline & Download */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow border border-slate-700 bg-white flex items-center justify-center">
                <Image
                  src="/images/app-screenshots/logo.jpg"
                  alt="PHARMA QUIZ Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-teal-400 transition-colors">
                {SITE_CONFIG.brandName}
              </span>
            </Link>
            <p className="text-teal-400 font-medium text-sm">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Designed specifically for pharmacy students to practice MCQs, solidify conceptual understanding, and prepare effectively for exams.
            </p>
            <div className="pt-2">
              <GooglePlayButton variant="white" size="sm" />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Subjects Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Pharmacy Subjects
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/subjects#pharmacology" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Pharmacology
                </Link>
              </li>
              <li>
                <Link href="/subjects#pharmaceutics" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Pharmaceutics
                </Link>
              </li>
              <li>
                <Link href="/subjects#pharmaceutical-chemistry" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Pharmaceutical Chemistry
                </Link>
              </li>
              <li>
                <Link href="/subjects#pharmacognosy" className="text-slate-400 hover:text-teal-300 transition-colors">
                  Pharmacognosy
                </Link>
              </li>
              <li>
                <Link href="/subjects" className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1">
                  View All 8 Subjects →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">
              Support & Legal
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-teal-300 transition-colors group"
              >
                <div className="p-1.5 rounded bg-slate-800 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="break-all">{SITE_CONFIG.contactEmail}</span>
              </a>

              <div className="pt-2 flex flex-col space-y-2">
                {legalLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-slate-400 hover:text-teal-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Official App on Google Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom separator and copyright */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} <span className="font-semibold text-slate-200">{SITE_CONFIG.brandName}</span>. All rights reserved. (Domain: {SITE_CONFIG.domain})
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted for pharmacy learners worldwide</span>
            <Heart className="w-3.5 h-3.5 text-teal-400 fill-teal-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
