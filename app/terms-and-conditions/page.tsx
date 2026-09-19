import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldAlert, CheckCircle2, ShieldCheck, Mail, AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions - PharmaFriends",
  description: `Terms and Conditions of Use for PharmaFriends website (${SITE_CONFIG.domain}) and Android mobile application. Governing educational quizzes, social feed, direct messaging, UGC, and virtual items.`,
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/terms-and-conditions`,
  }
};

export default function TermsPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

        {/* Header */}
        <div className="py-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: {lastUpdated} | Platform: {SITE_CONFIG.brandName} | Domain: {SITE_CONFIG.domain}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          
          {/* Important Notice Banner */}
          <div className="p-5 rounded-2xl bg-teal-50 border border-teal-100 text-teal-900 text-sm space-y-2">
            <p className="font-bold flex items-center gap-1.5 text-teal-950">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Welcome to PharmaFriends</span>
            </p>
            <p className="text-teal-900/90 leading-relaxed text-xs sm:text-sm">
              Please read these Terms & Conditions carefully before using the <strong>{SITE_CONFIG.brandName}</strong> mobile application or website (<strong>{SITE_CONFIG.domain}</strong>). These Terms govern your access to and use of our educational quizzes, social feed, user-generated content, media sharing, direct messaging, virtual items, and related services.
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">1.</span> Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or registering an account on the <strong>{SITE_CONFIG.brandName}</strong> website (<strong>{SITE_CONFIG.domain}</strong>) or downloading and installing the {SITE_CONFIG.brandName} Android mobile application, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these Terms, you must not access or use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">2.</span> Eligibility and Account Requirements
            </h2>
            <p>
              The platform is intended primarily for pharmacy students, medical/healthcare aspirants, pharmaceutical educators, and healthcare professionals. By creating an account or using the platform, you represent and warrant that you are at least 13 years of age. If you are under the age of majority in your jurisdiction, you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">3.</span> Account Registration
            </h2>
            <p>
              To access certain interactive features, including social feeds, direct messaging, quiz progress tracking, and leaderboard rankings, you may be required to create an account via Firebase Authentication (email/password or authorized single-sign-on providers). You agree to provide accurate, current, and complete registration information and to update such information if it changes.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">4.</span> Account Security & Password Protection
            </h2>
            <p>
              You are solely responsible for maintaining the confidentiality of your login credentials, password, and session access. You agree to notify us immediately at <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-600 underline font-semibold">{SITE_CONFIG.contactEmail}</a> upon discovering any unauthorized use or security compromise of your account. {SITE_CONFIG.brandName} cannot and will not be liable for losses or damages arising from your failure to safeguard your credentials.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">5.</span> User Profiles
            </h2>
            <p>
              {SITE_CONFIG.brandName} allows users to create a public or community profile, which may include your name, bio, avatar or profile picture, educational details, and public activity statistics. You agree that profile information you submit will not be misleading, deceptive, offensive, or infringe upon the rights of third parties.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">6.</span> Social Feed & Community Interactions
            </h2>
            <p>
              The platform features an interactive social feed enabling community members to publish educational updates, discuss pharmaceutical topics, share exam preparation strategies, and interact with peers. You acknowledge that interactions in public areas of the platform are visible to other community members.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">7.</span> User-Generated Content (UGC) Scope & License
            </h2>
            <p>
              You retain all ownership rights in the content you create and submit to {SITE_CONFIG.brandName} (including text posts, comments, photos, diagrams, and videos). However, by submitting, posting, or displaying content on or through the platform, you grant {SITE_CONFIG.brandName} a non-exclusive, worldwide, royalty-free, transferable license (with right to sub-license) to host, store, cache, display, format, reproduce, and distribute your content solely for the purpose of operating, developing, and providing the service.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">8.</span> Text Posts
            </h2>
            <p>
              Users may publish text-based posts, case questions, revision summaries, and academic queries. Text posts must adhere to our Community Standards and must not contain fabricated clinical data, academic dishonesty aids, defamatory claims, or prohibited promotions.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">9.</span> Images & Diagrams
            </h2>
            <p>
              Users may upload photographs, educational diagrams, flowcharts, and study notes. You warrant that you hold all necessary rights, permissions, and copyright clearances for any images you submit, and that images do not violate patient confidentiality or applicable privacy laws.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">10.</span> Videos and Short Videos (Reels)
            </h2>
            <p>
              {SITE_CONFIG.brandName} enables users to publish short educational video clips and reels explaining pharmaceutical mechanisms, laboratory procedures, and clinical pearls. Video uploads must comply with all Community Standards and copyright protections. Videos may be watermarked with platform identifiers upon export to attribute content to the community creator.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">11.</span> Direct Messaging / Chat
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
              <p className="font-semibold text-slate-900">Direct Chat Architecture & Privacy Notice:</p>
              <p>
                {SITE_CONFIG.brandName} provides one-to-one direct messaging between registered users to facilitate academic discussion and networking. Direct messages are transmitted through and stored on secure cloud backend infrastructure (Google Cloud / Firebase Firestore) to enable real-time delivery, message sync across sessions, security monitoring, abuse detection, and user report resolution.
              </p>
              <p className="text-slate-600">
                <strong>Important Notice:</strong> Direct messages are NOT end-to-end encrypted. We do not inspect messages arbitrarily, but messages may be reviewed by authorized automated safety systems or personnel when an account or message is formally reported for abuse, harassment, or illegal activity.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">12.</span> Comments and Reactions
            </h2>
            <p>
              Users can post comments and express reactions (such as likes or appreciations) on community posts. Comments must remain civil, constructive, and respectful of diverse viewpoints. Abusive or derogatory commenting is strictly prohibited.
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">13.</span> Following / Social Connections
            </h2>
            <p>
              The platform may provide features allowing users to follow other learners, educators, or contributors to personalize their community feed. We reserve the right to establish reasonable limits on following volume to prevent spamming and automated abuse.
            </p>
          </section>

          {/* Section 14 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">14.</span> Prohibited Content
            </h2>
            <p>You agree not to upload, transmit, share, or link to any content that:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs sm:text-sm">
              <li>Violates any local, national, or international statute, ordinance, or regulation.</li>
              <li>Infringes patents, trademarks, trade secrets, copyrights, or other intellectual property.</li>
              <li>Contains unapproved, dangerous, or lethal instructions regarding controlled substances or prescription pharmaceuticals.</li>
              <li>Facilitates unauthorized sales, trade, or dispensing of prescription drugs or chemicals.</li>
              <li>Contains malicious software, viruses, trojans, or corrupt data.</li>
              <li>Is defamatory, obscene, pornographic, vulgar, predatory, or invasive of another person&apos;s privacy.</li>
            </ul>
          </section>

          {/* Section 15 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">15.</span> Harassment and Abuse
            </h2>
            <p>
              Bullying, stalking, threatening, doxxing, or harassing other users, moderators, or team members will result in immediate disciplinary action, up to and including permanent account termination and blacklisting.
            </p>
          </section>

          {/* Section 16 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">16.</span> Spam and Manipulation
            </h2>
            <p>
              You may not use {SITE_CONFIG.brandName} to send unsolicited bulk communications, commercial advertisements, affiliate spam, pyramid schemes, or engage in artificial inflation of quiz rankings or social engagement metrics.
            </p>
          </section>

          {/* Section 17 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">17.</span> Impersonation
            </h2>
            <p>
              Impersonating another person, healthcare practitioner, university faculty member, administrative authority, or representative of {SITE_CONFIG.brandName} is strictly forbidden.
            </p>
          </section>

          {/* Section 18 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">18.</span> Illegal Activities
            </h2>
            <p>
              The platform must not be used to plan, facilitate, or promote any illegal enterprise, including illicit drug distribution, fraudulent credentialing, or unauthorized medical practice.
            </p>
          </section>

          {/* Section 19 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">19.</span> Threats and Violence
            </h2>
            <p>
              Content depicting, threatening, or encouraging self-harm, suicide, violence against others, or acts of terrorism is strictly prohibited and subject to immediate removal and reporting to legal authorities where warranted.
            </p>
          </section>

          {/* Section 20 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">20.</span> Sexual & Sexually Explicit Content
            </h2>
            <p>
              Nudity, pornography, sexually suggestive media, or sexually explicit dialogue is strictly prohibited. Anatomical or pathological medical images must be purely clinical, educational, non-gratuitous, and clearly contextualized.
            </p>
          </section>

          {/* Section 21 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">21.</span> Hate or Discriminatory Content
            </h2>
            <p>
              We do not tolerate discrimination, derogatory epithets, or hate speech targeting individuals or groups based on race, ethnicity, religion, nationality, disability, gender, gender identity, sexual orientation, or age.
            </p>
          </section>

          {/* Section 22 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">22.</span> Copyright and Intellectual Property
            </h2>
            <p>
              All software, source code, app interfaces, graphic assets, brand trademarks, curriculum questions, and editorial content produced by {SITE_CONFIG.brandName} are the exclusive intellectual property of {SITE_CONFIG.brandName} and its licensors. You may not copy, reverse-engineer, decompile, or create derivative works without prior written consent.
            </p>
          </section>

          {/* Section 23 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">23.</span> Copyright Infringement Reports
            </h2>
            <p>
              If you believe that your copyrighted work has been copied or posted on {SITE_CONFIG.brandName} in a manner that constitutes copyright infringement, please notify our designated agent with full documentation at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
              <p className="font-bold text-slate-900">Copyright Agent — {SITE_CONFIG.brandName}</p>
              <p className="text-slate-600">Email: <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-700 underline font-semibold">{SITE_CONFIG.contactEmail}</a></p>
              <p className="text-slate-500 mt-1 text-xs">Please provide: identification of the copyrighted work, URL/location of the material, your contact details, and a statement of good-faith belief.</p>
            </div>
          </section>

          {/* Section 24 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">24.</span> Medical & Pharmaceutical Information Disclaimer
            </h2>
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Strict Educational & Non-Clinical Disclaimer:</span>
              </p>
              <p>
                <strong>{SITE_CONFIG.brandName}</strong> is designed solely for academic study, examination preparation, and educational self-assessment for pharmacy students and healthcare learners.
              </p>
              <p>
                Information within the application, including quiz questions, rationales, clinical pearls, drug mechanisms, and peer posts, does NOT constitute clinical medical advice, pharmacotherapeutic prescriptions, diagnosis, or patient management guidance. Never disregard professional clinical judgment, hospital protocols, or the advice of a qualified physician based on content encountered in this application. {SITE_CONFIG.brandName} does not establish a doctor-patient or pharmacist-patient relationship.
              </p>
            </div>
          </section>

          {/* Section 25 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">25.</span> AI Features Disclaimer
            </h2>
            <p>
              AI-assisted features (such as PharmaChat learning assistant) provide automated study explanations generated by machine learning models. AI outputs are intended solely as study aids to clarify concepts. Because pharmacology information evolves rapidly, AI responses may occasionally contain inaccuracies or incomplete data. Users must verify all critical formulations, dosages, and mechanisms against official pharmacopeias and recognized textbooks.
            </p>
          </section>

          {/* Section 26 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">26.</span> Jobs and Career Content Disclaimer
            </h2>
            <p>
              Career opportunities, job notices, or fellowship postings shared in the app or website are for informational purposes only. {SITE_CONFIG.brandName} is not an employment agency and does not endorse, guarantee, or verify third-party job listings, employers, hiring outcomes, or compensation packages.
            </p>
          </section>

          {/* Section 27 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">27.</span> User Responsibility
            </h2>
            <p>
              You are exclusively responsible for the content, comments, messages, and files you post or send through the platform. You agree to defend, indemnify, and hold harmless {SITE_CONFIG.brandName} and its operators from any claims, damages, or liabilities arising from your content or violation of these Terms.
            </p>
          </section>

          {/* Section 28 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">28.</span> Content Moderation
            </h2>
            <p>
              {SITE_CONFIG.brandName} employs proactive and reactive moderation tools, including user reporting workflows, automated keyword filters, and administrative review queues. We do not guarantee pre-screening of every post, but we reserve the right to inspect and moderate content at our discretion.
            </p>
          </section>

          {/* Section 29 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">29.</span> Reporting Content
            </h2>
            <p>
              Users can report objectionable posts, comments, or direct messages directly through in-app report buttons or by contacting <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-600 underline font-semibold">{SITE_CONFIG.contactEmail}</a>. Reported items are reviewed by our safety team according to community priority.
            </p>
          </section>

          {/* Section 30 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">30.</span> Blocking Users
            </h2>
            <p>
              The application provides self-serve user blocking capabilities. When you block another user, they will be prevented from messaging you directly or interacting with your profile content.
            </p>
          </section>

          {/* Section 31 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">31.</span> Content Removal & Visibility Restrictions
            </h2>
            <p>
              We reserve the right, without prior notice, to remove, edit, or restrict the visibility of any user content that violates these Terms, infringes intellectual property, or poses safety risks to our community.
            </p>
          </section>

          {/* Section 32 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">32.</span> Account Warnings & Temporary Suspension
            </h2>
            <p>
              For minor or first-time policy violations, {SITE_CONFIG.brandName} may issue an official in-app warning or temporarily suspend social/chat posting privileges while keeping educational quiz features accessible.
            </p>
          </section>

          {/* Section 33 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">33.</span> Account Termination & Blacklisting
            </h2>
            <p>
              We may terminate or permanently ban any account found engaging in egregious violations, including threats, harassment, distributing illicit substances, recurring copyright violations, or malicious system attacks.
            </p>
          </section>

          {/* Section 34 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">34.</span> Advertising
            </h2>
            <p>
              To support the continued availability of free educational quizzes and learning materials, {SITE_CONFIG.brandName} may display third-party advertisements within the mobile application, provided via Google AdMob and authorized advertising partners.
            </p>
          </section>

          {/* Section 35 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">35.</span> Rewarded Advertisements
            </h2>
            <p>
              Users may voluntarily choose to view rewarded video advertisements to earn in-app virtual items (such as Capsules). Rewards are granted only upon successful, completed playback verified by the ad SDK. Ad availability is dynamic and not guaranteed at all times.
            </p>
          </section>

          {/* Section 36 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">36.</span> In-App Purchases & Virtual Items
            </h2>
            <p>
              {SITE_CONFIG.brandName} may offer virtual items, packages (such as Welcome Packs or Remove Ads entitlements), and in-app currency for purchase. All in-app purchases are optional and are conducted through the Google Play Billing system.
            </p>
          </section>

          {/* Section 37 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">37.</span> Capsules (In-App Virtual Currency)
            </h2>
            <p>
              &ldquo;Capsules&rdquo; are digital virtual credits utilized within the application to unlock specialized question sets, initiate learning features, or participate in specific activities. Capsules may be earned through quiz achievements, rewarded ad views, or purchased in packs.
            </p>
          </section>

          {/* Section 38 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">38.</span> No Monetary / Cash Value for Virtual Currency
            </h2>
            <p>
              Capsules and virtual items are limited, personal, non-transferable, revocable licenses for in-app utility only. Capsules have NO cash value, do not accrue interest, cannot be redeemed for fiat currency, real-world goods, or monetary value, and cannot be transferred or sold outside the platform.
            </p>
          </section>

          {/* Section 39 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">39.</span> Payments, Google Play Billing & Refund Policies
            </h2>
            <p>
              All monetary transactions for digital items within the Android app are processed securely through Google Play In-App Billing (`com.android.vending.BILLING`). {SITE_CONFIG.brandName} does not collect, handle, or store your credit or debit card details. Refunds are subject exclusively to Google Play&apos;s standard refund policies and applicable statutory consumer protection laws.
            </p>
          </section>

          {/* Section 40 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">40.</span> Third-Party Services & Integrations
            </h2>
            <p>
              The platform incorporates third-party infrastructure and software libraries to operate smoothly. Your interaction with these third-party components is subject to their respective terms and privacy policies.
            </p>
          </section>

          {/* Section 41 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">41.</span> Google Firebase Backend Infrastructure
            </h2>
            <p>
              Our backend utilizes Google Firebase (including Firebase Authentication, Cloud Firestore, Cloud Storage, Firebase Cloud Messaging, and Firebase Crashlytics) to store data, sync state, and monitor service health.
            </p>
          </section>

          {/* Section 42 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">42.</span> Google Services & Play Ecosystem
            </h2>
            <p>
              The application is published through the Google Play Store under application identifier `com.moneykey.pharmaquiz`. You agree to comply with Google Play Terms of Service when acquiring or updating the app.
            </p>
          </section>

          {/* Section 43 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">43.</span> Google AdMob & Advertising Standards
            </h2>
            <p>
              Advertisements are served according to Google AdMob developer policies. Ad content is managed and delivered dynamically by Google; {SITE_CONFIG.brandName} does not endorse products displayed in third-party commercial advertisements.
            </p>
          </section>

          {/* Section 44 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">44.</span> Push Notifications & In-App Alerts
            </h2>
            <p>
              We may send notifications regarding study reminders, direct messages, battle invitations, or service updates via Firebase Cloud Messaging. You can manage or disable push notification permissions at any time through your Android device settings.
            </p>
          </section>

          {/* Section 45 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">45.</span> Service Availability, Uptime & Maintenance
            </h2>
            <p>
              We strive to provide uninterrupted access to {SITE_CONFIG.brandName}, but we do not warrant that service will be error-free or uninterrupted. We may temporarily suspend access for scheduled maintenance, updates, security hardening, or emergency infrastructure repairs.
            </p>
          </section>

          {/* Section 46 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">46.</span> Changes to the Service
            </h2>
            <p>
              We reserve the right to enhance, modify, expand, or discontinue features, question categories, or interactive modes within {SITE_CONFIG.brandName} at any time to improve educational quality and user experience.
            </p>
          </section>

          {/* Section 47 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">47.</span> Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions from time to time. When modifications occur, the updated document will be published on this page with an updated &ldquo;Last Updated&rdquo; date. Continued access or use of the platform after changes become effective constitutes your binding acceptance of the revised Terms.
            </p>
          </section>

          {/* Section 48 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">48.</span> Relationship with Privacy Policy
            </h2>
            <p>
              Our <Link href="/privacy-policy" className="text-teal-600 underline font-semibold">Privacy Policy</Link> describes how we collect, process, and protect your personal information. The Privacy Policy is incorporated into and forms an integral part of these Terms.
            </p>
          </section>

          {/* Section 49 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">49.</span> Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall {SITE_CONFIG.brandName}, its developers, affiliates, or contributors be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, loss of goodwill, study interruption, or exam performance outcomes, arising from your use of or inability to use the platform.
            </p>
          </section>

          {/* Section 50 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">50.</span> Disclaimer of Warranties (&ldquo;As Is&rdquo; / &ldquo;As Available&rdquo;)
            </h2>
            <p>
              The platform, quizzes, question banks, study notes, and community features are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express, implied, or statutory, including implied warranties of merchantability, fitness for a particular academic purpose, or non-infringement.
            </p>
          </section>

          {/* Section 51 */}
          <section className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">51.</span> Governing Law & Dispute Resolution
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any dispute arising out of or relating to these Terms or the platform shall be subject to the exclusive jurisdiction of the competent courts located in India.
            </p>
          </section>

          {/* Section 52 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-teal-600 font-extrabold">52.</span> Contact Information
            </h2>
            <p>
              For questions, legal notices, or feedback regarding these Terms and Conditions, please contact us at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-1">
              <p className="font-bold text-slate-900">{SITE_CONFIG.brandName}</p>
              <p className="text-slate-600">Official Domain: <span className="font-mono text-slate-800">{SITE_CONFIG.domain}</span></p>
              <p className="text-slate-600">Email: <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-teal-700 underline font-semibold">{SITE_CONFIG.contactEmail}</a></p>
              <p className="text-slate-500 text-xs mt-2">Android Package ID: <span className="font-mono text-slate-700">com.moneykey.pharmaquiz</span> (Preserved technical identifier)</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
