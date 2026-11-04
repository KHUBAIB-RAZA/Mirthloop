import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Eye, Keyboard, Smartphone, Sparkles, Shield } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  useDocumentTitle({
    title: 'Accessibility Statement — Mirthloop Arcade',
    description: 'Learn about Mirthloop’s commitment to digital accessibility, high contrast, keyboard navigation, and inclusive design standards.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <Eye className="w-3.5 h-3.5" />
          <span>Inclusive Web Entertainment</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Accessibility Statement
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Mirthloop is committed to ensuring digital accessibility for all users, including individuals with disabilities and those using assistive technologies.
        </p>
      </div>

      {/* Main Statement Card */}
      <div className="arcade-glow-card rounded-2xl p-6 sm:p-8 border border-[#232C4F] space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span>Our Commitment to WCAG Guidelines</span>
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          We continually strive to apply relevant accessibility standards across our platform. Our interface and game containers aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA recommendations.
        </p>
      </div>

      {/* Specific Accessibility Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
            <Keyboard className="w-5 h-5" />
            <span>Full Keyboard Operability</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All site navigation, links, buttons, and cookie dialogs can be accessed and operated entirely using standard keyboard controls (Tab, Enter, Space, Escape). Our games support standard Arrow and WASD keystrokes.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
            <Eye className="w-5 h-5" />
            <span>High Contrast & Clear Typography</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We use legible sans-serif fonts with distinct hierarchy and high contrast ratios between foreground text and dark background containers, enhancing readability for low-vision players.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
          <div className="flex items-center space-x-2 text-pink-400 font-bold text-sm">
            <Smartphone className="w-5 h-5" />
            <span>Generous Touch Target Sizing</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Mobile controls and interactive buttons meet minimum 44×44 pixel touch dimensions with ample padding to prevent accidental clicks or missed inputs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <Sparkles className="w-5 h-5" />
            <span>Reduced Motion & Focus Rings</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Visible, high-contrast focus rings appear around active interactive elements when navigating via keyboard. Non-essential decorative animations are designed to be unobtrusive.
          </p>
        </div>
      </div>

      {/* Feedback & Contact */}
      <section className="p-6 rounded-2xl bg-[#0F1424] border border-[#232C4F] space-y-3">
        <h3 className="text-base font-bold text-white">Accessibility Feedback</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          We welcome input on how to improve the accessibility of Mirthloop. If you encounter any barriers or have recommendations, please contact our team at{' '}
          <span className="font-mono text-cyan-400">contact@mirthloop.com</span>. We treat accessibility reports with high priority.
        </p>
      </section>
    </div>
  );
};
