"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthBrandingPanel from "@/components/AuthBrandingPanel";
import {
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  GraduationCap,
  Briefcase,
  Gift,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Smartphone
} from "lucide-react";

function SignUpForm() {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("/login");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redir = params.get("redirect");
      if (redir) {
        setRedirectUrl(redir);
      }
    }
  }, []);

  const { signUpWithEmail } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [qualification, setQualification] = useState("B.Pharm");
  const [statusType, setStatusType] = useState<"STUDENT" | "WORKING" | "PREPARING">("STUDENT");
  const [institution, setInstitution] = useState("");
  const [examTarget, setExamTarget] = useState("GPAT");
  const [referralCode, setReferralCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const qualificationsList = ["D.Pharm", "B.Pharm", "M.Pharm", "Pharm.D", "PhD", "Others"];
  const examList = ["GPAT", "NIPER", "Drug Inspector", "PSC Pharmacist", "ESIC", "AIIMS", "DHA", "Prometric", "Others"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await signUpWithEmail(email, password, {
      fullName,
      phone,
      qualification,
      isStudent: statusType === "STUDENT",
      institution: statusType === "STUDENT" ? institution : undefined,
      isWorking: statusType === "WORKING",
      workingInstitution: statusType === "WORKING" ? institution : undefined,
      isPreparingExam: statusType === "PREPARING",
      examTarget: statusType === "PREPARING" ? examTarget : undefined,
      referralCode: referralCode.trim() || undefined
    });
    setLoading(false);

    if (!res.success) {
      setError(res.error || "Failed to create account. Please try again.");
    } else {
      setSuccessModal(true);
    }
  };

  const loginHref =
    redirectUrl && redirectUrl !== "/login"
      ? `/login?redirect=${encodeURIComponent(redirectUrl)}`
      : "/login";

  return (
    <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 relative">
      {/* Segmented Mode Switcher */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
        <Link
          href={loginHref}
          className="flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-900 text-center transition-all"
        >
          Sign In
        </Link>
        <button
          type="button"
          className="flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg bg-white text-slate-900 shadow-sm transition-all"
        >
          Create Account
        </button>
      </div>

      {/* Form Header */}
      <div className="mb-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Account
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Join thousands of pharmacy students & get your starter quiz capsules.
        </p>
      </div>

      {/* Starter Capsules Notice Pill */}
      <div className="mb-5 p-3 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 flex items-center justify-between text-xs text-red-900 shadow-sm">
        <span className="flex items-center gap-2">
          <span className="text-lg">💊</span>
          <span>
            <strong>50 Free Starter Capsules</strong> credited upon registration
          </span>
        </span>
        <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3 h-3" />
          <span>FREE</span>
        </span>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="signup-fullname"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <UserIcon className="w-4 h-4 text-red-500" />
            </div>
            <input
              id="signup-fullname"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Arun Kumar"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="signup-email"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4 text-red-500" />
              </div>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pharmacist@example.com"
                required
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all shadow-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-phone"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4 text-red-500" />
              </div>
              <input
                id="signup-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Password & Confirm Password Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="signup-password"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Password (min 6) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 text-red-500" />
              </div>
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Confirm Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4 text-red-500" />
              </div>
              <input
                id="signup-confirm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Academic Qualification & Current Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label
              htmlFor="signup-qualification"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Qualification
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <GraduationCap className="w-4 h-4 text-red-500" />
              </div>
              <select
                id="signup-qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm shadow-sm cursor-pointer"
              >
                {qualificationsList.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-status"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Current Status
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Briefcase className="w-4 h-4 text-red-500" />
              </div>
              <select
                id="signup-status"
                value={statusType}
                onChange={(e) => setStatusType(e.target.value as "STUDENT" | "WORKING" | "PREPARING")}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm shadow-sm cursor-pointer"
              >
                <option value="STUDENT">Pharmacy Student</option>
                <option value="WORKING">Working Professional</option>
                <option value="PREPARING">Exam Aspirant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Status Details */}
        {statusType === "PREPARING" ? (
          <div>
            <label
              htmlFor="signup-exam"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Target Exam
            </label>
            <select
              id="signup-exam"
              value={examTarget}
              onChange={(e) => setExamTarget(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm shadow-sm cursor-pointer"
            >
              {examList.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label
              htmlFor="signup-institution"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              {statusType === "STUDENT" ? "College / Institution" : "Hospital / Company"}
            </label>
            <input
              id="signup-institution"
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder={
                statusType === "STUDENT"
                  ? "e.g. College of Pharmaceutical Sciences"
                  : "e.g. Apollo Hospital"
              }
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all shadow-sm"
            />
          </div>
        )}

        {/* Referral Code (Optional) */}
        <div>
          <label
            htmlFor="signup-referral"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Referral Code (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Gift className="w-4 h-4 text-red-500" />
            </div>
            <input
              id="signup-referral"
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              placeholder="e.g. PQ7K4M"
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm uppercase transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:via-rose-700 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 transition-all duration-200 disabled:opacity-60 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Your Account...</span>
            </>
          ) : (
            <>
              <span>Create Account & Claim 50 Capsules</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Login Navigation Callout */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href={loginHref}
          className="text-red-600 hover:text-red-700 font-bold transition-colors inline-flex items-center gap-1"
        >
          <span>Sign In</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Unified Android + Web Shared Account Assurance */}
      <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2 text-[11px] text-slate-600">
        <Smartphone className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Instant Sync:</strong> Your account & capsules work immediately on both the Web and Android App.
        </div>
      </div>

      {/* Terms & Privacy */}
      <p className="mt-3 text-center text-[11px] text-slate-400">
        By creating an account, you agree to PharmaFriends{" "}
        <Link href="/terms-and-conditions" className="underline hover:text-slate-600">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="underline hover:text-slate-600">
          Privacy Policy
        </Link>
        .
      </p>

      {/* ─────────────────────────────────────────────────────────────
          3. REGISTRATION SUCCESS MODAL (Preserved Functionality)
          ───────────────────────────────────────────────────────────── */}
      {successModal && (
        <div
          role="dialog"
          aria-labelledby="success-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mx-auto mb-4 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 id="success-modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              Account Created Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              We&apos;ve sent a verification email to <strong className="text-slate-900">{email}</strong>.
              Please check your inbox and click the verification link before signing in.
            </p>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 mb-6 text-left space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base">💊</span>
                <span>
                  <strong>50 Starter Capsules</strong> credited to your account.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">📱</span>
                <span>Ready for shared login on website and Android app.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`)}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:via-rose-700 hover:to-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/25 cursor-pointer text-sm"
            >
              Proceed to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 lg:pt-20 flex flex-col lg:flex-row bg-slate-50">
      {/* ─────────────────────────────────────────────────────────────
          1. LEFT BRANDING PANEL (~50% width on desktop, compact on mobile)
          ───────────────────────────────────────────────────────────── */}
      <AuthBrandingPanel mode="signup" />

      {/* ─────────────────────────────────────────────────────────────
          2. RIGHT AUTHENTICATION PANEL (~50% width on desktop)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-slate-50/80">
        <Suspense
          fallback={
            <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 p-12 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  );
}
