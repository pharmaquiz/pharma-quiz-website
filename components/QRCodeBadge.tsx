import React from "react";
import Image from "next/image";
import { QrCode, Smartphone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface QRCodeBadgeProps {
  className?: string;
  showText?: boolean;
}

export default function QRCodeBadge({
  className = "",
  showText = true
}: QRCodeBadgeProps) {
  return (
    <div
      className={`glass-card p-4 rounded-2xl flex items-center gap-4 border border-slate-200/80 shadow-md ${className}`}
    >
      <div className="relative w-24 h-24 bg-white p-1.5 rounded-xl shadow-inner border border-slate-100 flex-shrink-0">
        <Image
          src="/images/qr-code.svg"
          alt="Scan QR code to download PHARMA QUIZ on Google Play"
          width={90}
          height={90}
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
            <QrCode className="w-3.5 h-3.5 text-teal-600" />
            <span>Scan to Download</span>
          </div>
          <p className="text-sm font-bold text-slate-900 leading-tight">
            Install on Android
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-slate-400" />
            <span>Opens Google Play Store</span>
          </p>
          <a
            href={SITE_CONFIG.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 underline pt-0.5"
          >
            Direct Link →
          </a>
        </div>
      )}
    </div>
  );
}
