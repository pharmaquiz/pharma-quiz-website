"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Please provide a subject";
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Frontend mock submission simulating validation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl">
      {isSubmitted ? (
        <div className="text-center py-8 space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Message Prepared!</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. Your message details have been validated. You can also send this inquiry directly to our official email at:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-teal-700 font-semibold text-sm max-w-xs mx-auto">
            <a href={`mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}>
              {SITE_CONFIG.contactEmail} ↗
            </a>
          </div>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", email: "", subject: "", message: "" });
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
            >
              Submit another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Taylor"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                errors.name ? "border-rose-400 bg-rose-50/30" : "border-slate-300 bg-white"
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                errors.email ? "border-rose-400 bg-rose-50/30" : "border-slate-300 bg-white"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Subject <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Inquiry / Feedback / Question"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                errors.subject ? "border-rose-400 bg-rose-50/30" : "border-slate-300 bg-white"
              }`}
            />
            {errors.subject && (
              <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Your Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we assist you with PHARMA QUIZ?"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors resize-y ${
                errors.message ? "border-rose-400 bg-rose-50/30" : "border-slate-300 bg-white"
              }`}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Notice about direct delivery */}
          <p className="text-[11px] text-slate-500 italic">
            Note: You can also write directly to <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-600 underline font-medium">{SITE_CONFIG.contactEmail}</a> anytime.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Validating...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
