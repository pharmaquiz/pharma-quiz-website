"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Download, Coins, LogIn, LogOut, Sparkles } from "lucide-react";
import { SITE_CONFIG, PUBLIC_NAV_LINKS, APP_NAV_LINKS } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { formatCapsules } from "@/lib/capsules";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, capsules, loading: authLoading, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsMobileMenuOpen(false);
    await logout();
    router.push("/login");
  };

  // Determine active links based on authentication state
  const navLinks = user ? APP_NAV_LINKS : PUBLIC_NAV_LINKS;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            href={user ? "/feed" : "/login"}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200 border border-teal-500/20 bg-white flex items-center justify-center">
              <Image
                src="/images/app-screenshots/logo.jpg"
                alt="PharmaFriends Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors">
                {SITE_CONFIG.brandName}
              </span>
              <span className="text-[10px] font-semibold text-teal-600 tracking-wider uppercase -mt-1 hidden sm:block">
                Pharmacy Learning & Community
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {authLoading ? (
              // Anti-flicker loading placeholder
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-16 h-7 rounded-lg bg-slate-100 animate-pulse"></div>
                ))}
              </div>
            ) : (
              navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === "/feed" && (pathname === "/feed" || pathname === "/feeds"));
                const isFeed = link.href === "/feed";

                if (isFeed) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                        isActive
                          ? "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-md shadow-rose-500/25 scale-[1.03]"
                          : "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 hover:text-rose-900 border border-rose-200/80 hover:border-rose-300 shadow-sm"
                      }`}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                      <span>Feeds</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "text-teal-600 bg-teal-50/80 font-bold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })
            )}
          </nav>

          {/* Right Action: Auth & Download App */}
          <div className="hidden md:flex items-center gap-2.5">
            {authLoading ? (
              <div className="w-24 h-8 rounded-xl bg-slate-100 animate-pulse"></div>
            ) : user ? (
              // Authenticated Controls
              <div className="flex items-center gap-2">
                {/* Capsule Wallet Badge */}
                <Link
                  href="/wallet"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-bold hover:bg-teal-100/80 transition-colors shadow-sm"
                  title="View Capsule Wallet"
                >
                  <span className="text-sm">💊</span>
                  <span>{formatCapsules(capsules)}</span>
                  <span className="text-[9px] text-teal-600 uppercase font-semibold">Caps</span>
                </Link>

                {/* Profile pill */}
                <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="max-w-[100px] truncate">{profile?.fullName?.split(" ")[0] || "User"}</span>
                </div>

                {/* Sign Out Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              // Unauthenticated Public Controls
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-teal-700 hover:bg-teal-50 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <a
              href={SITE_CONFIG.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>App</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-3 transition-all animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/feed" && (pathname === "/feed" || pathname === "/feeds"));
              const isFeed = link.href === "/feed";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-all ${
                    isFeed
                      ? isActive
                        ? "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold shadow-md shadow-rose-500/20"
                        : "bg-rose-50 text-rose-700 font-bold border border-rose-200/60"
                      : isActive
                      ? "text-teal-600 bg-teal-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isFeed && <span>🔥</span>}
                    <span>{link.label}</span>
                  </span>
                  {isFeed && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white uppercase tracking-wider font-extrabold shadow-sm">
                      Live
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/wallet"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 font-semibold text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span>💊</span>
                    <span>Capsule Wallet</span>
                  </span>
                  <span className="font-bold text-teal-700">{formatCapsules(capsules)} Caps</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({user.email})</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold text-center shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <a
              href={SITE_CONFIG.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-black text-white font-semibold py-3 px-4 rounded-xl shadow text-center text-sm mt-1"
            >
              <Download className="w-4 h-4" />
              <span>Download PharmaFriends on Google Play</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
