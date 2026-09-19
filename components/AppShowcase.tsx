"use client";

import React, { useState } from "react";
import { Smartphone, Swords, BookMarked, MessageSquare, LayoutGrid, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import GooglePlayButton from "./GooglePlayButton";
import PhoneMockup from "./PhoneMockup";
import QRCodeBadge from "./QRCodeBadge";

export default function AppShowcase() {
  const [activeTab, setActiveTab] = useState<"home" | "battle" | "library" | "chat" | "category">("home");

  const tabs = [
    { id: "home", label: "App Dashboard", icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "battle", label: "Pharma Battle", icon: <Swords className="w-4 h-4" /> },
    { id: "category", label: "Categories & MCQs", icon: <Sparkles className="w-4 h-4" /> },
    { id: "library", label: "Digital Library", icon: <BookMarked className="w-4 h-4" /> },
    { id: "chat", label: "PharmaChat", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-teal-50/40 to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-semibold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Real Application Interface</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Take Your Pharmacy Practice With You
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Practice pharmacy questions wherever you are. <strong className="text-slate-800">{SITE_CONFIG.brandName}</strong> puts your learning experience, live battles, and digital library right in your pocket.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-white text-teal-700 shadow-sm border border-slate-200/80 scale-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/60"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Showcase Viewport */}
        {activeTab === "home" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-end justify-center mb-16 animate-fadeIn">
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  Daily MCQ Practice
                </span>
              </div>
              <PhoneMockup
                screenSrc="/images/app-screenshots/home.jpg"
                alt="PharmaFriends Main Dashboard"
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col items-center -mt-0 md:-mt-6">
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Subject Hub
                </span>
              </div>
              <PhoneMockup
                screenSrc="/images/app-screenshots/home2.jpg"
                alt="PharmaFriends Subject Interface"
                badgeText="Popular View"
                className="transform hover:scale-105 transition-transform duration-300 z-10"
              />
            </div>

            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  Quick Study Mode
                </span>
              </div>
              <PhoneMockup
                screenSrc="/images/app-screenshots/home3.jpg"
                alt="PharmaFriends Study Hub"
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}

        {activeTab === "battle" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-end justify-center mb-16 animate-fadeIn">
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                  01. Live Player Matching
                </span>
              </div>
              <PhoneMockup
                screenSrc="/images/app-screenshots/pharmabattle_matching.jpg"
                alt="PharmaFriends Battle Matching"
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col items-center -mt-0 md:-mt-6">
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                  02. Real-Time MCQ Battle
                </span>
              </div>
              <PhoneMockup
                screenSrc="/images/app-screenshots/pharmabattle.jpg"
                alt="PharmaFriends Live Battle Game"
                badgeText="Head-to-Head"
                className="transform hover:scale-105 transition-transform duration-300 z-10"
              />
            </div>

            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  03. Battle Room Lobby
                </span>
              </div>
              <PhoneMockup
                screenSrc="/images/app-screenshots/pharmabattel_loading.jpg"
                alt="PharmaFriends Battle Loading"
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        )}

        {activeTab === "category" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center max-w-4xl mx-auto mb-16 animate-fadeIn">
            <div className="space-y-4 text-left">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
                Structured Hierarchy
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Subject Categories & Chapter Modules
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Choose precisely which subject, unit, or topic you want to test yourself on. From Pharmacology classifications to dosage form calculations, questions are organized for focused mastery.
              </p>
              <div className="pt-2">
                <GooglePlayButton size="md" variant="primary" />
              </div>
            </div>
            <div className="flex justify-center">
              <PhoneMockup
                screenSrc="/images/app-screenshots/category.jpg"
                alt="PharmaFriends Categories Screen"
                badgeText="Categories & Topics"
              />
            </div>
          </div>
        )}

        {activeTab === "library" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center max-w-4xl mx-auto mb-16 animate-fadeIn">
            <div className="space-y-4 text-left">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                Study Resources
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Digital Pharmacy Library
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Access curated pharmacy notes, reference charts, and study materials in one organized place to review crucial concepts before jumping into quizzes.
              </p>
              <div className="pt-2">
                <GooglePlayButton size="md" variant="primary" />
              </div>
            </div>
            <div className="flex justify-center">
              <PhoneMockup
                screenSrc="/images/app-screenshots/pharma_library.jpg"
                alt="PharmaFriends Digital Library Screen"
                badgeText="Digital Library"
              />
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center max-w-4xl mx-auto mb-16 animate-fadeIn">
            <div className="space-y-4 text-left">
              <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">
                Study Assistant
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                PharmaChat Learning Assistant
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Need immediate clarity on a drug mechanism or formulation concept? PharmaChat helps clarify doubts and explain intricate concepts interactively.
              </p>
              <div className="pt-2">
                <GooglePlayButton size="md" variant="primary" />
              </div>
            </div>
            <div className="flex justify-center">
              <PhoneMockup
                screenSrc="/images/app-screenshots/pharma_chat.jpg"
                alt="PharmaFriends PharmaChat Screen"
                badgeText="PharmaChat Assistant"
              />
            </div>
          </div>
        )}

        {/* Download Action & QR Code Area */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Official Android App</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Ready to start practicing?
            </h3>
            <p className="text-sm text-slate-600 max-w-sm">
              Get {SITE_CONFIG.brandName} on your Android device from Google Play and start practicing today.
            </p>
            <div className="pt-2">
              <GooglePlayButton size="lg" variant="primary" />
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex-shrink-0">
            <QRCodeBadge showText={true} />
          </div>
        </div>

      </div>
    </section>
  );
}
