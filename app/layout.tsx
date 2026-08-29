import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/constants";

export const viewport: Viewport = {
  themeColor: "#0D9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: `${SITE_CONFIG.brandName} - ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.brandName}`
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.brandName }],
  creator: SITE_CONFIG.brandName,
  publisher: SITE_CONFIG.brandName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.brandName,
    title: `${SITE_CONFIG.brandName} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/images/app-screenshots/logo.jpg",
        width: 800,
        height: 800,
        alt: `${SITE_CONFIG.brandName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.brandName} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ["/images/app-screenshots/logo.jpg"],
  },
  icons: {
    icon: "/images/app-screenshots/logo.jpg",
    apple: "/images/app-screenshots/logo.jpg",
  },
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": SITE_CONFIG.brandName,
        "operatingSystem": "Android",
        "applicationCategory": "EducationalApplication",
        "url": SITE_CONFIG.siteUrl,
        "installUrl": SITE_CONFIG.playStoreUrl,
        "description": SITE_CONFIG.description,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "Organization",
        "name": SITE_CONFIG.brandName,
        "url": SITE_CONFIG.siteUrl,
        "logo": `${SITE_CONFIG.siteUrl}/images/app-screenshots/logo.jpg`,
        "email": SITE_CONFIG.contactEmail
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
