import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig } from '../config/site';
import { ShieldCheck, Lock, EyeOff, Database, Radio, Mail } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  useDocumentTitle({
    title: 'Privacy Policy — Mirthloop Arcade',
    description: 'Learn how Mirthloop protects your privacy, uses LocalStorage for game scores, and prepares for future advertising standards.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency & Data Integrity</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: November 4, 2026 | Platform Version: 1.0 (Static Frontend)
        </p>
      </div>

      <div className="arcade-glow-card rounded-2xl p-6 sm:p-8 border border-[#232C4F] space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>1. Information We Do NOT Collect</span>
          </h2>
          <p>
            Mirthloop is designed as a lightweight, account-free web arcade. When you play games on our platform:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>We do <strong>not</strong> require user registration, usernames, or passwords.</li>
            <li>We do <strong>not</strong> collect personal financial data or payment details.</li>
            <li>We do <strong>not</strong> track your precise GPS geolocation.</li>
            <li>We do <strong>not</strong> sell, trade, or rent personal data to data brokers.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Database className="w-4 h-4 text-purple-400" />
            <span>2. LocalStorage & Client-Side Preferences</span>
          </h2>
          <p>
            To deliver responsive gameplay without maintaining external server databases, Mirthloop uses your web browser&apos;s native <strong>HTML5 LocalStorage</strong>. This storage is strictly confined to your device:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li><strong className="text-slate-200">mirthloop_arrow_dash_best_score_v1:</strong> Stores your highest recorded score in Arrow Dash.</li>
            <li><strong className="text-slate-200">mirthloop_cookie_preferences_v1:</strong> Records your choices regarding optional cookies.</li>
          </ul>
          <p>
            You can remove this data at any time by clearing your browser cache and local website data.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Radio className="w-4 h-4 text-pink-400" />
            <span>3. Current vs. Future Advertising Technologies</span>
          </h2>
          <div className="p-4 rounded-xl bg-[#0B0F1C] border border-[#232C4F] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Current Status (V1):</span>
            <p className="text-slate-300">
              In this initial release, <strong>no commercial advertising or personalized tracking scripts are loaded or active</strong>. Ad areas are reserved placeholders to prepare the layout architecture for future monetization.
            </p>
          </div>
          <p>
            In the future, Mirthloop may partner with Google AdSense or certified advertising networks to offset hosting and development costs. When advertising is activated:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Third-party vendors, including Google, may use cookies to serve ads based on your prior visits to this or other websites.</li>
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on visits to your sites and/or other sites on the Internet.</li>
            <li>Users will be presented with granular cookie consent options in accordance with GDPR, ePrivacy, and CCPA/CPRA prior to any advertising cookie initialization.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <EyeOff className="w-4 h-4 text-yellow-400" />
            <span>4. Hosting & Cloudflare Infrastructure</span>
          </h2>
          <p>
            Mirthloop is hosted globally via Cloudflare Pages. Cloudflare may process transient operational metadata (such as IP addresses, browser user-agent headers, and security challenge responses) for legitimate interests in defending the website against DDoS attacks, automated bots, and malicious requests. For more details, consult Cloudflare&apos;s Privacy Policy.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>5. User Rights & Contact Inquiries</span>
          </h2>
          <p>
            Depending on your jurisdiction (such as the European Economic Area under GDPR or California under CCPA/CPRA), you possess rights regarding your data. Since we do not maintain accounts or store personal identifiers on servers, exercising data deletion is as simple as clearing your local browser storage.
          </p>
          <p>
            For privacy inquiries or technical questions regarding our data practices, contact us directly at:{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-cyan-400 font-mono underline">
              {siteConfig.contactEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};
