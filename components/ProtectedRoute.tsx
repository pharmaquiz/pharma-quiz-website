"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      const search = typeof window !== "undefined" ? window.location.search : "";
      const fullPath = pathname ? `${pathname}${search}` : "/feed";
      router.replace(`/login?redirect=${encodeURIComponent(fullPath)}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070C18] flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 animate-ping absolute"></div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-xl shadow-rose-500/30">
            <span className="text-2xl font-black text-white">Rx</span>
          </div>
        </div>
        <p className="mt-5 text-sm font-medium text-slate-400">Verifying authentication...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
