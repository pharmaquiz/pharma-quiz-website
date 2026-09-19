import React from "react";
import Hero from "@/components/Hero";
import QuickFeatures from "@/components/QuickFeatures";
import AboutSection from "@/components/AboutSection";
import SubjectsSection from "@/components/SubjectsSection";
import FeaturesSection from "@/components/FeaturesSection";
import AppShowcase from "@/components/AppShowcase";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import ContactForm from "@/components/ContactForm";
import InteractiveQuizDemo from "@/components/InteractiveQuizDemo";
import RebrandAnnouncement from "@/components/RebrandAnnouncement";
import { Mail, MessageSquare, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* Official Brand Evolution Announcement */}
      <RebrandAnnouncement />

      {/* 2. Quick Features */}
      <QuickFeatures />

      {/* Interactive Web Sample Demonstration */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Experience the Format
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Try a Quick Pharmacy MCQ Sample
            </h2>
            <p className="text-sm text-slate-600">
              See how instant answer verification helps reinforce crucial pharmacy facts.
            </p>
          </div>
          <InteractiveQuizDemo />
        </div>
      </section>

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Pharmacy Subjects Section */}
      <SubjectsSection />

      {/* 5. Detailed Features Section */}
      <FeaturesSection />

      {/* 6. App Showcase Section */}
      <AppShowcase />

      {/* 7. Why Choose PharmaFriends Section */}
      <WhySection />

      {/* 8. How It Works Section */}
      <HowItWorks />

      {/* 9. Student Reviews Section */}
      <ReviewsSection />

      {/* 10. FAQ Accordion Section */}
      <FAQSection />

      {/* 11. Final CTA Section */}
      <FinalCTA />

      {/* 12. Contact Section on Homepage */}
      <section id="contact" className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Reach Out</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Have questions, feedback, or suggestion for new pharmacy questions? We would love to hear from you.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-teal-700 font-semibold bg-teal-50 px-4 py-2 rounded-xl border border-teal-100">
              <Mail className="w-4 h-4 text-teal-600" />
              <span>Direct Email: </span>
              <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="underline hover:text-teal-900">
                {SITE_CONFIG.contactEmail}
              </a>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
