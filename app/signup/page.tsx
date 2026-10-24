"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
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
  CheckCircle2
} from "lucide-react";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/login";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#0B1329] to-[#030712] text-slate-100 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full relative z-10">
        {/* Emblem & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-teal-500/40 p-1.5 shadow-lg shadow-teal-500/20 backdrop-blur-md mb-3">
            <Image
              src="/images/app-screenshots/logo.jpg"
              alt="PharmaFriends Logo"
              width={56}
              height={56}
              className="w-full h-full object-cover rounded-xl"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Create Your <span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent">PharmaFriends</span> Account
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-cyan-200/80">
            Get instant access to quizzes, study tools, and 50 Starter Capsules 💊
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl p-6 sm:p-8">
          {error && (
            <div className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4 text-cyan-400" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Arun Kumar"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm transition-all"
                />
              </div>
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@pharmacy.edu"
                    required
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Password & Confirm Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password (min 6 chars) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-10 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Academic Qualification & Status Type Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Qualification
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                  </div>
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                  >
                    {qualificationsList.map((q) => (
                      <option key={q} value={q} className="bg-slate-900 text-white">
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Current Status
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                  </div>
                  <select
                    value={statusType}
                    onChange={(e) => setStatusType(e.target.value as "STUDENT" | "WORKING" | "PREPARING")}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                  >
                    <option value="STUDENT" className="bg-slate-900 text-white">Pharmacy Student</option>
                    <option value="WORKING" className="bg-slate-900 text-white">Working Professional</option>
                    <option value="PREPARING" className="bg-slate-900 text-white">Exam Aspirant</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Conditional Status Details */}
            {statusType === "PREPARING" ? (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Exam
                </label>
                <select
                  value={examTarget}
                  onChange={(e) => setExamTarget(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                >
                  {examList.map((ex) => (
                    <option key={ex} value={ex} className="bg-slate-900 text-white">
                      {ex}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  {statusType === "STUDENT" ? "College / Institution" : "Hospital / Company"}
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder={statusType === "STUDENT" ? "e.g. College of Pharmaceutical Sciences" : "e.g. Apollo Hospital"}
                  className="w-full px-3.5 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm transition-all"
                />
              </div>
            )}

            {/* Referral Code (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Referral Code (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Gift className="w-4 h-4 text-cyan-400" />
                </div>
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  placeholder="e.g. PQ7K4M"
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm uppercase transition-all"
                />
              </div>
            </div>

            {/* Starter Capsules Pill */}
            <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-500/40 flex items-center justify-between text-xs text-teal-200">
              <span className="flex items-center gap-2">
                <span className="text-base">💊</span>
                <span><strong>50 Starter Capsules</strong> included upon registration</span>
              </span>
              <span className="bg-teal-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold text-teal-300">
                FREE
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-200 disabled:opacity-50 cursor-pointer transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Your Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Get 50 Capsules</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href={`/login${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
              className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Security / Terms Notice */}
        <p className="mt-4 text-center text-xs text-slate-500">
          By registering, you agree to PharmaFriends{" "}
          <Link href="/terms-and-conditions" className="underline hover:text-slate-400">Terms</Link> and{" "}
          <Link href="/privacy-policy" className="underline hover:text-slate-400">Privacy Policy</Link>.
        </p>
      </div>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-teal-500/50 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Account Created Successfully!</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              We&apos;ve sent a verification email to <strong className="text-cyan-300">{email}</strong>. Please check your inbox and verify your email before logging in.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 mb-6 text-left space-y-1">
              <div>💊 <strong>50 Starter Capsules</strong> credited to your account.</div>
              <div>📱 Ready for shared login on website and Android app.</div>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`)}
              className="w-full py-2.5 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-all shadow"
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
    <Suspense fallback={
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
      </div>
    }>
      <SignUpForm />
    </Suspense>
  );
}
