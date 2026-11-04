import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig } from '../config/site';
import { AlertCircle, Gamepad2, CloudOff, Radio, ShieldCheck } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  useDocumentTitle({
    title: 'Disclaimer — Mirthloop Arcade',
    description: 'General disclaimer regarding game entertainment purposes, availability, local storage scores, and third-party advertising disclosures.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Legal Disclosures</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Platform Disclaimer
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: November 4, 2026 | Mirthloop Arcade
        </p>
      </div>

      <div className="arcade-glow-card rounded-2xl p-6 sm:p-8 border border-[#232C4F] space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span>1. Entertainment-Only Purpose</span>
          </h2>
          <p>
            The content, games, interactive features, and software applications provided on Mirthloop are created solely for leisure and personal entertainment purposes. No real monetary wagering, cash prizes, or financial awards are offered or implied by gameplay.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <CloudOff className="w-4 h-4 text-rose-400" />
            <span>2. No Guarantee of Service or Score Persistence</span>
          </h2>
          <p>
            While we strive to keep Mirthloop highly available 24/7 across global Cloudflare edge servers, we do not warrant that platform operations will be completely uninterrupted, timely, or error-free.
          </p>
          <p>
            Because high scores are stored locally in your browser&apos;s HTML5 LocalStorage rather than on a central database, scores may be permanently erased if you clear your browser history, use incognito/private browsing mode, switch browsers, or reset your device. Mirthloop cannot recover scores lost due to client-side data clearing.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Radio className="w-4 h-4 text-purple-400" />
            <span>3. Future Advertising Disclosure</span>
          </h2>
          <p>
            In order to keep the website free for all players without subscription charges, Mirthloop reserves the right to implement third-party advertising in the future (such as Google AdSense).
          </p>
          <p>
            Advertisements displayed in future releases will be clearly segregated from gameplay and will never constitute endorsements or guarantees by Mirthloop of products or services offered by third-party advertisers.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>4. Third-Party Links & Infrastructure</span>
          </h2>
          <p>
            The website may reference or link to external resources (such as fonts or external documentation). Mirthloop exercises no control over third-party websites and assumes no liability for their content, privacy policies, or practices.
          </p>
          <p>
            If you have any questions about this disclaimer, contact us at:{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-cyan-400 font-mono underline">
              {siteConfig.contactEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};
