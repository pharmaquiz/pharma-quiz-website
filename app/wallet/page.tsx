"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  formatCapsules,
  isCreditTransaction,
  CAPSULE_PRICES
} from "@/lib/capsules";
import {
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  RefreshCw,
  LogOut,
  ChevronRight
} from "lucide-react";

export default function WalletPage() {
  const router = useRouter();
  const { user, profile, capsules, capsuleUnits, transactions, loading, logout, refreshProfile } = useAuth();

  const [spending, setSpending] = useState(false);
  const [spendMsg, setSpendMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // If loading auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-white py-24">
        <Loader2 className="w-10 h-10 animate-spin text-teal-400 mb-4" />
        <p className="text-sm text-cyan-200">Loading your Capsule Wallet...</p>
      </div>
    );
  }

  // If not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#0B1329] to-[#030712] text-slate-100 flex items-center justify-center py-24 px-4">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center mx-auto mb-4">
            <Coins className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Capsule Wallet</h2>
          <p className="text-sm text-slate-300 mb-6">
            Sign in to view your real-time Capsule balance, transaction history, and unlock premium pharmacy study modules.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/login?redirect=/wallet"
              className="w-full py-3 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/20"
            >
              Sign In to Your Account
            </Link>
            <Link
              href="/signup?redirect=/wallet"
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl text-sm transition-all"
            >
              Create New Account (+50 Free Capsules)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalEarned = transactions
    .filter((t) => isCreditTransaction(t.type, t.amount))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalSpent = transactions
    .filter((t) => !isCreditTransaction(t.type, t.amount))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Handle a test unlock spend
  const handleSpend = async (operation: string, targetId: string, cost: number, label: string) => {
    setSpendMsg(null);
    setSpending(true);

    try {
      const idToken = await user.getIdToken();
      const transactionId = `web_spend_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      const res = await fetch("/api/capsules/spend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({
          transactionId,
          operation,
          targetId,
          amount: cost,
          metadata: {
            description: `Unlocked: ${label} (-${cost} Capsules)`,
            reason: operation
          }
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setSpendMsg({ type: "error", text: data.error || "Failed to complete transaction." });
      } else if (data.alreadyUnlocked) {
        setSpendMsg({ type: "success", text: `${label} is already unlocked on your account!` });
      } else {
        setSpendMsg({
          type: "success",
          text: `Successfully unlocked ${label}! Deducted ${cost} Capsules.`
        });
        await refreshProfile();
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setSpendMsg({ type: "error", text: e.message || "Network error. Please try again." });
    } finally {
      setSpending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#0B1329] to-[#030712] text-slate-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* User Identity Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-teal-500/20">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">{profile?.name || user.displayName || "Pharmacist"}</h1>
                {profile?.pqid && (
                  <span className="bg-teal-950/80 border border-teal-500/50 text-teal-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                    {profile.pqid}
                  </span>
                )}
                {profile?.role === "ADMIN" && (
                  <span className="bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refreshProfile()}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs flex items-center gap-1.5 transition-all"
              title="Refresh Balance"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
              className="p-2.5 bg-slate-800 hover:bg-red-950/60 hover:text-red-400 text-slate-400 rounded-xl text-xs flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {spendMsg && (
          <div
            className={`flex items-start gap-3 p-4 rounded-xl text-sm border transition-all ${
              spendMsg.type === "success"
                ? "bg-teal-950/70 border-teal-500/50 text-teal-200"
                : "bg-red-950/70 border-red-500/50 text-red-200"
            }`}
          >
            {spendMsg.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <span>{spendMsg.text}</span>
          </div>
        )}

        {/* Primary Wallet Balance Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900/40 via-slate-900 to-slate-900 border border-teal-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Authoritative Balance</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {formatCapsules(capsules)}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-teal-400">Capsules</span>
              </div>
              <p className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                <span>Minor Units: <strong className="text-slate-200">{capsuleUnits.toLocaleString()} units</strong></span>
                <span>•</span>
                <span>1.00 Capsule = 100 units</span>
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-[11px] text-teal-300 font-medium mb-1">
                  <ArrowDownLeft className="w-3.5 h-3.5 text-teal-400" />
                  <span>Total Earned</span>
                </div>
                <div className="text-base font-bold text-white">+{formatCapsules(totalEarned)}</div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-[11px] text-rose-300 font-medium mb-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-rose-400" />
                  <span>Total Spent</span>
                </div>
                <div className="text-base font-bold text-white">-{formatCapsules(totalSpent)}</div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-slate-800/60 border border-slate-700/60 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-medium mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Activity Logs</span>
                </div>
                <div className="text-base font-bold text-white">{transactions.length} entries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Unlocks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Unlock className="w-5 h-5 text-teal-400" />
              <span>Available Capsule Unlocks</span>
            </h2>
            <span className="text-xs text-slate-400">Pre-approved content access</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Subcategory Unlock */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 text-xs font-bold">
                    Question Bank
                  </span>
                  <span className="text-sm font-bold text-teal-300">
                    {CAPSULE_PRICES.SUBCATEGORY_UNLOCK} 💊
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-1">Pharmacology MCQ Module</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Unlock high-yield cardiovascular & autonomic nervous system practice questions.
                </p>
              </div>
              <button
                type="button"
                disabled={spending || capsules < CAPSULE_PRICES.SUBCATEGORY_UNLOCK}
                onClick={() =>
                  handleSpend(
                    "SUBCATEGORY_UNLOCK",
                    "pharmacology_cardiovascular",
                    CAPSULE_PRICES.SUBCATEGORY_UNLOCK,
                    "Pharmacology MCQ Module"
                  )
                }
                className="w-full py-2.5 px-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {spending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : capsules < CAPSULE_PRICES.SUBCATEGORY_UNLOCK ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Insufficient Capsules</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock for 25 Capsules</span>
                  </>
                )}
              </button>
            </div>

            {/* Card 2: Mock Exam Part */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-bold">
                    Mock Exam
                  </span>
                  <span className="text-sm font-bold text-teal-300">
                    {CAPSULE_PRICES.MOCK_EXAM_PART_UNLOCK} 💊
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-1">GPAT Mock Test Part 1</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Full 25-question timed mock exam section with comprehensive rationales.
                </p>
              </div>
              <button
                type="button"
                disabled={spending || capsules < CAPSULE_PRICES.MOCK_EXAM_PART_UNLOCK}
                onClick={() =>
                  handleSpend(
                    "MOCK_EXAM_PART_UNLOCK",
                    "gpat_mock_part_1",
                    CAPSULE_PRICES.MOCK_EXAM_PART_UNLOCK,
                    "GPAT Mock Test Part 1"
                  )
                }
                className="w-full py-2.5 px-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {spending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : capsules < CAPSULE_PRICES.MOCK_EXAM_PART_UNLOCK ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Insufficient Capsules</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock for 60 Capsules</span>
                  </>
                )}
              </button>
            </div>

            {/* Card 3: Library 1-Hour Access */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 text-xs font-bold">
                    Ebook Library
                  </span>
                  <span className="text-sm font-bold text-teal-300">
                    {CAPSULE_PRICES.LIBRARY_UNLOCK_1_HOUR} 💊
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-1">1-Hour Ebook Pass</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Full unrestricted reading access across all reference textbooks and drug guides.
                </p>
              </div>
              <button
                type="button"
                disabled={spending || capsules < CAPSULE_PRICES.LIBRARY_UNLOCK_1_HOUR}
                onClick={() =>
                  handleSpend(
                    "LIBRARY_UNLOCK_1_HOUR",
                    "library_pass_1hr",
                    CAPSULE_PRICES.LIBRARY_UNLOCK_1_HOUR,
                    "1-Hour Library Pass"
                  )
                }
                className="w-full py-2.5 px-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {spending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : capsules < CAPSULE_PRICES.LIBRARY_UNLOCK_1_HOUR ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Insufficient Capsules</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock for 60 Capsules</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Realtime Transaction History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              <span>Transaction History</span>
            </h2>
            <span className="text-xs text-slate-400">Synchronized in real-time</span>
          </div>

          {transactions.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-sm">
              No transactions recorded yet.
            </div>
          ) : (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl divide-y divide-slate-800/80 overflow-hidden shadow-xl">
              {transactions.map((tx) => {
                const isCredit = isCreditTransaction(tx.type, tx.amount);
                const dateStr = new Date(tx.timestamp).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                });

                return (
                  <div key={tx.transactionId} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isCredit ? "bg-teal-500/10 text-teal-400" : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {isCredit ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm sm:text-base">
                          {tx.description || tx.reason || tx.type}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span>{dateStr}</span>
                          <span>•</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {tx.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`font-bold text-sm sm:text-base ${
                          isCredit ? "text-teal-400" : "text-rose-400"
                        }`}
                      >
                        {isCredit ? `+${formatCapsules(tx.amount)}` : `-${formatCapsules(Math.abs(tx.amount))}`} 💊
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Bal: {formatCapsules(tx.balanceAfter)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Security & Authenticity Footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 py-4 border-t border-slate-800">
          <ShieldCheck className="w-4 h-4 text-teal-500" />
          <span>Secured by Firebase Authentication & Atomic Firestore Ledger (Project: pharmaquiz-c5510)</span>
        </div>
      </div>
    </div>
  );
}
