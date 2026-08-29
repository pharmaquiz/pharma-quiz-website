import React from "react";
import Link from "next/link";
import { Home, ArrowLeft, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-teal-50 border border-teal-100 text-teal-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <HelpCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-teal-600 tracking-wider uppercase">404 Error</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            href="/subjects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-semibold transition-colors"
          >
            <span>Explore Subjects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
