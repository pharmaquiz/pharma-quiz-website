import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, AlertCircle, Database, Trash2, Smartphone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy - PharmaFriends",
  description: `Privacy Policy for PharmaFriends mobile application and website (${SITE_CONFIG.domain}). Clear explanation of account data, direct messages, user-generated content, AdMob, Firebase, and account deletion.`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/privacy-policy`,
  }
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        {/* Header */}
        <div className="py-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: {lastUpdated} | Platform: {SITE_CONFIG.brandName} | Domain: {SITE_CONFIG.domain}
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          {/* Transparent Overview Callout */}
          <div className="p-5 rounded-2xl bg-teal-50 border border-teal-100 text-teal-950 text-xs sm:text-sm space-y-2">
            <p className="font-bold flex items-center gap-1.5 text-teal-900">
              <Lock className="w-4 h-4 text-teal-700" />
              <span>Our Privacy Commitment:</span>
            </p>
            <p>
              At <strong>{SITE_CONFIG.brandName}</strong>, we are committed to transparent, responsible data processing. We collect only the data necessary to provide our pharmacy learning tools, community feeds, direct messaging, quiz battles, and account features. All data transfers between our mobile application and backend services are encrypted in transit using industry-standard HTTPS / TLS 1.3.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">1.</span> Introduction
            </h2>
            <p>
              This Privacy Policy applies to the <strong>{SITE_CONFIG.brandName}</strong> Android mobile application (package identifier <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">com.moneykey.pharmaquiz</span>) and official website (<strong>{SITE_CONFIG.domain}</strong>). It details what personal and technical data we collect, how it is used, how it is safeguarded, and how you can exercise full control over your information, including permanent account deletion.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">2.</span> Information We Collect
            </h2>
            <p>
              We collect information that you voluntarily provide when creating an account, interacting with community features, or using educational quizzes, along with technical telemetry collected automatically by integrated mobile SDKs:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">A. Account Information</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
                  <li><strong>Full Name / Display Name:</strong> Used for account identification, community posts, and leaderboard display.</li>
                  <li><strong>Email Address:</strong> Used for secure Firebase Authentication, account recovery, and essential developer notifications.</li>
                  <li><strong>User Identifiers:</strong> Unique Firebase UID and internal identifier (e.g. PQID) for account isolation and session management.</li>
                  <li><strong>Optional Profile Details:</strong> Profile picture URL, bio, student status, or academic specialization if provided.</li>
                  <li><strong>Approximate Location (Dropdown):</strong> User-selected state or district selected from a manual text dropdown for academic leaderboard grouping. <em>Note: {SITE_CONFIG.brandName} does not request or track continuous GPS location permissions.</em></li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">B. User-Generated Content & Media</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
                  <li><strong>Community Feed Posts:</strong> Text discussions, academic queries, and revision questions you publish.</li>
                  <li><strong>Images & Diagrams:</strong> Study charts, chemical structures, and photos uploaded to Firebase Cloud Storage.</li>
                  <li><strong>Short-Form Videos / Reels:</strong> Video clips explaining clinical concepts uploaded to our media storage pipelines.</li>
                  <li><strong>Comments & Reactions:</strong> Likes, comments, and replies submitted on community posts.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">C. Direct Messages & Chat</h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  Text messages and media exchanged in one-to-one direct conversations between registered users. Messages are transmitted through and stored on Google Firebase Firestore infrastructure to facilitate delivery and message history sync.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">D. Learning Activity & Virtual Items</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
                  <li><strong>Quiz Attempts & Scores:</strong> Accuracy metrics, completed category modules, daily tests, and saved question bookmarks.</li>
                  <li><strong>Pharma Battle History:</strong> Match results and competitive statistics from live quiz challenges.</li>
                  <li><strong>Capsule Balances:</strong> In-app virtual credits earned through quiz milestones or purchased via Google Play.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">E. Device, Technical & Diagnostic Data</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
                  <li><strong>Device Characteristics:</strong> Device model, manufacturer, and Android operating system version.</li>
                  <li><strong>App Diagnostics:</strong> Crash stack traces and performance indicators collected automatically via Firebase Crashlytics to diagnose and fix application crashes.</li>
                  <li><strong>Push Notification Token:</strong> Firebase Cloud Messaging (FCM) registration token to deliver study notifications and message alerts.</li>
                  <li><strong>Advertising Identifiers:</strong> Google Advertising ID (AD_ID / GAID) processed by the Google Mobile Ads (AdMob) SDK to serve contextual and personalized ads where permitted.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">3.</span> How We Use Your Information
            </h2>
            <p>Collected information is utilized strictly to provide, maintain, and protect our platform:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
              <li>To provide core educational quiz functionality, question unlocking, and answer scoring.</li>
              <li>To maintain your personalized study profile, bookmarks, and historical accuracy records.</li>
              <li>To operate real-time peer interactions, including community feeds, comments, and direct chat.</li>
              <li>To conduct live matchmaking for multiplayer Pharma Battles and display leaderboard ranks.</li>
              <li>To process optional in-app purchases and credit virtual Capsules to your account.</li>
              <li>To send study reminders, new question alerts, and message notifications via FCM.</li>
              <li>To investigate user reports, prevent fraud, block abusive accounts, and ensure platform safety.</li>
              <li>To diagnose technical crashes and improve mobile application stability.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">4.</span> Direct Chat Privacy & Safety Notice
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-teal-600" />
                <span>Clear Disclosure Regarding Direct Messaging:</span>
              </p>
              <p>
                When you send direct messages on {SITE_CONFIG.brandName}, your messages are stored on secure cloud backend servers (Google Cloud / Firebase Firestore) to allow both participants to retrieve conversation history across app launches.
              </p>
              <p>
                <strong>No End-to-End Encryption:</strong> Direct messages are NOT end-to-end encrypted. We do not engage in broad, routine human inspection of private chats. However, if a user submits a formal abuse report regarding a specific chat thread (for harassment, extortion, spam, or illegal substance distribution), authorized safety personnel or automated security scanners may review the reported conversation segment to take appropriate moderation or disciplinary action.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">5.</span> Public Visibility of User-Generated Content
            </h2>
            <p>
              Content posted to the public feed, including text notes, case discussions, images, and short-form video reels, is accessible to other registered members of the {SITE_CONFIG.brandName} community. Your display name and avatar will accompany your posts. Please do not share private personal identifying information (such as phone numbers, home addresses, or confidential patient health records) in public community spaces.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">6.</span> Third-Party Service Providers & Cloud Infrastructure
            </h2>
            <p>
              We do not sell, rent, or trade your personal data to third parties. We rely on established enterprise cloud infrastructure partners solely to deliver app functionality:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Google Firebase</p>
                <p className="text-slate-600">Provides secure authentication, Firestore database storage, Cloud Storage for media, FCM notifications, and Crashlytics stability monitoring.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Google Play Billing</p>
                <p className="text-slate-600">Securely handles all financial transactions for virtual Capsules. PharmaFriends never sees, processes, or stores your credit or debit card details.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">Google AdMob</p>
                <p className="text-slate-600">Serves in-app banner, interstitial, and rewarded video ads to support free educational question banks in accordance with Google advertising policies.</p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">7.</span> Data Retention & Storage Limits
            </h2>
            <p>
              We retain personal data and user-generated content for as long as your account remains active. If you choose to delete your account, your personal profile data, quiz progress, bookmarks, and chat references are purged from our active operational databases in accordance with our deletion protocols, subject to temporary technical backup cycles and legal compliance obligations.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">8.</span> User Safety: Blocking & Reporting Controls
            </h2>
            <p>
              You are empowered with direct in-app safety tools:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
              <li><strong>In-App User Blocking:</strong> Blocks selected users from viewing your profile or sending you direct messages.</li>
              <li><strong>Content Reporting:</strong> Flags objectionable posts, images, videos, or messages for administrative review.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">9.</span> Permanent Account Deletion Procedure
            </h2>
            <p>
              In compliance with Google Play Store policies and international data privacy principles, {SITE_CONFIG.brandName} provides seamless self-serve account deletion:
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 text-slate-800 text-xs sm:text-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>How to Permanently Delete Your Account & Associated Data:</span>
              </div>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
                <li>Open the <strong>{SITE_CONFIG.brandName}</strong> mobile app on your Android device.</li>
                <li>Navigate to the <strong>Settings Screen</strong>.</li>
                <li>Scroll to the account section and select <strong>&ldquo;Delete Account Permanently&rdquo;</strong>.</li>
                <li>Confirm deletion by tapping <strong>&ldquo;Delete Forever&rdquo;</strong> (re-authentication may be requested for security).</li>
              </ol>
              <p className="text-slate-600">
                <strong>Data Purged Upon Deletion:</strong> Authentication record, main user profile document (<span className="font-mono text-xs">users/&#123;uid&#125;</span>), quiz progress, active quiz sessions, bookmarks, question history, daily test records, and leaderboard entries.
              </p>
              <p className="text-slate-600 text-xs">
                Alternatively, you may request account deletion via email by writing to <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-700 underline font-semibold">{SITE_CONFIG.contactEmail}</a> from your registered email address.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">10.</span> Content Deletion Controls
            </h2>
            <p>
              You have the ability to delete your own published community posts, comments, and uploaded images directly within the application interface. When you delete a post, it is immediately removed from the community feed and will no longer be visible to other members.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">11.</span> Children&apos;s Privacy Protection
            </h2>
            <p>
              Our platform is designed for university students, healthcare candidates, and pharmacy professionals. Under our eligibility requirements, individuals under the age of 13 are not permitted to register or use the platform. We do not knowingly collect personal identifiable information from children under 13. If you become aware that a child under 13 has registered without parental authorization, please notify us immediately at <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-600 underline font-semibold">{SITE_CONFIG.contactEmail}</a> so we can terminate the account and purge their data.
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">12.</span> Security Measures
            </h2>
            <p>
              We implement comprehensive technical and organizational safeguards to protect your personal information against unauthorized access, loss, or misuse:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
              <li>End-to-server TLS 1.3 / HTTPS encryption for all mobile app and web network traffic.</li>
              <li>Cloud Firestore Security Rules enforcing strict user-owner isolation (<span className="font-mono text-xs">request.auth.uid == userId</span>) to prevent unauthorized cross-account access.</li>
              <li>Secure token-based authentication with Firebase Auth.</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">13.</span> User Rights & Data Requests
            </h2>
            <p>
              Depending on your jurisdiction, you may hold rights to request access to your personal data, rectify inaccuracies, request deletion, or restrict certain processing activities. You can exercise these rights directly within app settings or by submitting an inquiry to <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-600 underline font-semibold">{SITE_CONFIG.contactEmail}</a>.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">14.</span> Updates to This Privacy Policy
            </h2>
            <p>
              We may periodically update this Privacy Policy to reflect app enhancements, new features, or statutory regulatory updates. When changes occur, the updated policy will be posted on this page with a revised &ldquo;Last Updated&rdquo; date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Section 15 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">15.</span> Official Privacy Contact Details
            </h2>
            <p>
              If you have any questions, privacy inquiries, or data protection requests regarding {SITE_CONFIG.brandName}, please contact us at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1">
              <p className="font-bold text-slate-900">{SITE_CONFIG.brandName} Privacy Team</p>
              <p className="text-slate-600">Official Website: <span className="font-mono text-slate-800">{SITE_CONFIG.domain}</span></p>
              <p className="text-slate-600">Email: <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-700 underline font-semibold">{SITE_CONFIG.contactEmail}</a></p>
              <p className="text-slate-500 text-xs mt-2">Android Package ID: <span className="font-mono text-slate-700">com.moneykey.pharmaquiz</span> (Preserved technical identifier)</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
