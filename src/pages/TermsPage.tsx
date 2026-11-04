import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { siteConfig } from '../config/site';
import { FileText, Shield, AlertTriangle, Scale, Mail } from 'lucide-react';

export const TermsPage: React.FC = () => {
  useDocumentTitle({
    title: 'Terms and Conditions — Mirthloop Arcade',
    description: 'Read the terms of use, intellectual property policies, acceptable use guidelines, and limitations of liability for Mirthloop.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-xs text-slate-400">
          Last Updated: November 4, 2026 | Version 1.0
        </p>
      </div>

      <div className="arcade-glow-card rounded-2xl p-6 sm:p-8 border border-[#232C4F] space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>1. Agreement to Terms</span>
          </h2>
          <p>
            By accessing or playing games on Mirthloop (located at https://mirthloop.pages.dev and its associated domains), you agree to be bound by these Terms and Conditions and all applicable local, national, and international laws. If you disagree with any portion of these terms, you are prohibited from using the platform.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span>2. Acceptable Use of the Platform</span>
          </h2>
          <p>
            Mirthloop is provided strictly for personal, non-commercial entertainment. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Engage in automated scraping, data extraction, or denial-of-service attempts against the platform.</li>
            <li>Modify, decompile, reverse engineer, or tamper with the game scripts and canvas runtime code.</li>
            <li>Use bot tools or automated input injectors to artificially spoof game scores.</li>
            <li>Use the website in any manner that impairs server stability or disrupts other users.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-pink-400" />
            <span>3. Intellectual Property Rights</span>
          </h2>
          <p>
            All original branding, logos, website layout, original game designs (including Arrow Dash rules, physics, and visual aesthetics), codebases, and media assets are the intellectual property of Mirthloop and protected by copyright and intellectual property laws. You may not reproduce, redistribute, or mirror our games on third-party domains without express written authorization.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span>4. Limitation of Liability & &ldquo;As-Is&rdquo; Disclaimer</span>
          </h2>
          <p>
            Mirthloop and its games are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. In no event shall Mirthloop or its developers be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the website, including any loss of saved scores or browser data.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>5. Changes to Terms & Contact</span>
          </h2>
          <p>
            We reserve the right to revise these Terms and Conditions at our discretion. Any changes will become effective upon posting the revised document. Continued use of Mirthloop following modifications constitutes acceptance of the new terms.
          </p>
          <p>
            For questions regarding these Terms, contact us at:{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-cyan-400 font-mono underline">
              {siteConfig.contactEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};
