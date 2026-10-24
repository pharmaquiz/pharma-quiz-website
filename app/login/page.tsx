"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthBrandingPanel from "@/components/AuthBrandingPanel";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ShieldAlert,
  Smartphone
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("/feed");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const redir = params.get("redirect");
      if (redir) {
        setRedirectUrl(redir);
      }
    }
  }, []);

  const { user, signInWithEmail, signInWithGoogle, sendPasswordReset, resendVerification } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace(redirectUrl);
    }
  }, [user, redirectUrl, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Modals
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState("");

  const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    const res = await signInWithEmail(email, password);
    setLoading(false);

    if (res.unverified) {
      setShowUnverifiedModal(true);
    } else if (!res.success) {
      setError(res.error || "Failed to sign in. Please verify your credentials.");
    } else {
      router.push(redirectUrl);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    const res = await signInWithGoogle();
    setGoogleLoading(false);

    if (!res.success) {
      setError(res.error || "Google Sign-In failed.");
    } else {
      router.push(redirectUrl);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setResetMsg("Please enter your registered email address.");
      return;
    }
    setResetLoading(true);
    const res = await sendPasswordReset(resetEmail);
    setResetLoading(false);
    if (res.success) {
      setResetMsg("Password reset email sent! Please check your inbox.");
    } else {
      setResetMsg(res.error || "Unable to send reset email.");
    }
  };

  const handleResendVerification = async () => {
    setResending(true);
    setResendStatus("");
    const res = await resendVerification();
    setResending(false);
    if (res.success) {
      setResendStatus("Verification email sent! Check your inbox.");
    } else {
      setResendStatus(res.error || "Failed to resend verification link.");
    }
  };

  const signUpHref =
    redirectUrl && redirectUrl !== "/feed"
      ? `/signup?redirect=${encodeURIComponent(redirectUrl)}`
      : "/signup";

  return (
    <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 relative">
      {/* Facebook-Inspired Segmented Mode Switcher */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
        <button
          type="button"
          className="flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg bg-white text-slate-900 shadow-sm transition-all"
        >
          Sign In
        </button>
        <Link
          href={signUpHref}
          className="flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-500 hover:text-slate-900 text-center transition-all"
        >
          Create Account
        </Link>
      </div>

      {/* Form Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          Sign in to manage your Capsule Wallet and track your quiz ranks.
        </p>
      </div>

      {/* Error & Success Alerts */}
      {error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4 text-red-500" />
            </div>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pharmacist@example.com"
              required
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setResetMsg("");
                setShowForgotModal(true);
              }}
              className="text-xs text-red-600 hover:text-red-700 hover:underline transition-colors font-semibold cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4 text-red-500" />
            </div>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:via-rose-700 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/25 transition-all duration-200 disabled:opacity-60 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Social Sign-in Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase font-medium">
          <span className="bg-white px-3 text-slate-400">or continue with</span>
        </div>
      </div>

      {/* Functional Google Sign In Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50/90 border border-slate-300 rounded-xl text-slate-700 font-semibold text-sm transition-all shadow-sm hover:border-slate-400 disabled:opacity-60 cursor-pointer"
      >
        {googleLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-red-600" />
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 17C3.7 20.7 7.5 23.5 12 23.5z"
            />
          </svg>
        )}
        <span>Sign in with Google</span>
      </button>

      {/* Sign Up Navigation Callout */}
      <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500">
        Don&apos;t have a PharmaFriends account?{" "}
        <Link
          href={signUpHref}
          className="text-red-600 hover:text-red-700 font-bold transition-colors inline-flex items-center gap-1"
        >
          <span>Create Account</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Unified Android + Web Shared Account Assurance */}
      <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
        <Smartphone className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Shared Account Sync:</span>{" "}
          Use the exact same email & password across the PharmaFriends Android App and Website.
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FORGOT PASSWORD MODAL (Accessible, Preserved Functionality)
          ───────────────────────────────────────────────────────────── */}
      {showForgotModal && (
        <div
          role="dialog"
          aria-labelledby="forgot-password-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 text-left shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-3">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 id="forgot-password-title" className="text-lg font-bold text-slate-900 mb-1">
              Reset Password
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your registered email address and we will send you a secure password reset link.
            </p>

            {resetMsg && (
              <div className="mb-3 p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium">
                {resetMsg}
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Email
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="pharmacist@example.com"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="px-4 py-1.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-1.5 shadow cursor-pointer disabled:opacity-60"
                >
                  {resetLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. UNVERIFIED EMAIL MODAL (Preserved Functionality)
          ───────────────────────────────────────────────────────────── */}
      {showUnverifiedModal && (
        <div
          role="dialog"
          aria-labelledby="unverified-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white border border-amber-200 rounded-2xl max-w-sm w-full p-6 text-left shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 id="unverified-title" className="text-lg font-bold text-slate-900 mb-1.5">
              Verify Your Email
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Your account email has not been verified yet. Please check your inbox and click the verification link before logging in.
            </p>

            {resendStatus && (
              <div className="mb-3 p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-medium">
                {resendStatus}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resending}
                className="w-full py-2.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center gap-1.5 shadow cursor-pointer disabled:opacity-60"
              >
                {resending && <Loader2 className="w-3 h-3 animate-spin" />}
                Resend Verification Link
              </button>
              <button
                type="button"
                onClick={() => setShowUnverifiedModal(false)}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pt-16 lg:pt-20 flex flex-col lg:flex-row bg-slate-50">
      {/* ─────────────────────────────────────────────────────────────
          1. LEFT BRANDING PANEL (~50% width on desktop, compact on mobile)
          ───────────────────────────────────────────────────────────── */}
      <AuthBrandingPanel mode="login" />

      {/* ─────────────────────────────────────────────────────────────
          2. RIGHT AUTHENTICATION PANEL (~50% width on desktop)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-slate-50/80">
        <Suspense
          fallback={
            <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 p-12 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
