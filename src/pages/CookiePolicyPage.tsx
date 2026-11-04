import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useCookieConsent } from '../components/consent/CookieContext';
import { Cookie, Settings, Radio, BarChart2 } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  useDocumentTitle({
    title: 'Cookie Policy — Mirthloop Arcade',
    description: 'Understand how Mirthloop uses essential local storage, prepares for future analytics, and gives you complete consent management controls.',
  });

  const { openModal } = useCookieConsent();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
          <Cookie className="w-3.5 h-3.5" />
          <span>Storage & Consent Standards</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: November 4, 2026 | Effective for all Mirthloop visitors
        </p>
      </div>

      {/* Interactive Controls Banner */}
      <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">Manage Your Preferences Instantly</h2>
          <p className="text-xs text-slate-300">
            You can change your consent settings or withdraw optional permissions at any time.
          </p>
        </div>
        <button
          onClick={openModal}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-glow-button flex items-center space-x-2 shrink-0 transition-transform hover:scale-105"
        >
          <Settings className="w-4 h-4" />
          <span>Open Cookie Settings</span>
        </button>
      </div>

      <div className="arcade-glow-card rounded-2xl p-6 sm:p-8 border border-[#232C4F] space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. What Are Cookies and Web Storage?</h2>
          <p>
            Cookies are small text files placed on your device by websites you visit. In addition to traditional cookies, modern browsers support <strong>HTML5 LocalStorage</strong>, which permits web applications to store preferences and game states directly on the user&apos;s machine without transmitting data across external networks.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">2. Categories of Storage Used by Mirthloop</h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#0A0D18] border border-[#232C4F] space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm">Essential & Gameplay Storage</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Always Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Essential for the core functionality of the website. Stores your game high scores locally so your records persist between visits, along with your cookie preferences choice. These cannot be switched off as the platform cannot function without remembering game progress.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0D18] border border-[#232C4F] space-y-1">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white text-sm">Performance & Analytics (Future)</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Optional
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Helps us understand how players interact with games, error crash diagnostics, and device framerate benchmarks. In V1, no external analytics scripts are running.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0A0D18] border border-[#232C4F] space-y-1">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white text-sm">Advertising & Personalization (Future)</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  Optional
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Prepares consent requirements for potential Google AdSense integration. When activated in future releases, advertising cookies may be used by Google and third-party partners to show relevant ads. No commercial ad scripts are initialized without explicit opt-in consent.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. How to Withdraw or Change Consent</h2>
          <p>
            You have the right to withdraw your consent at any time without penalty. You can click the &ldquo;Cookie Preferences&rdquo; link found in the website footer on every page, or toggle your settings using your browser&apos;s privacy settings to clear LocalStorage and cookies for this domain.
          </p>
        </section>
      </div>
    </div>
  );
};
