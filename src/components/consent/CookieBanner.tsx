import React from 'react';
import { useCookieConsent } from './CookieContext';
import { Shield, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieBanner: React.FC = () => {
  const { preferences, acceptAll, rejectOptional, openModal } = useCookieConsent();

  // If already answered, banner does not show (user can still reopen via footer)
  if (preferences.hasAnswered) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 bg-[#0A0D18]/95 backdrop-blur-md border-t border-[#232C4F] shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 mt-0.5">
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">We Value Your Privacy & Clear Storage Choices</h3>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
              Mirthloop uses essential local storage to remember your game controls, sound preferences, and high scores.
              We do not track your personal identity. You can review our full{' '}
              <Link to="/privacy-policy" className="text-cyan-400 underline hover:text-cyan-300">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/cookie-policy" className="text-purple-400 underline hover:text-purple-300">
                Cookie Policy
              </Link>{' '}
              or customize your optional preferences at any time.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end shrink-0">
          <button
            onClick={openModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
          <button
            onClick={rejectOptional}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Reject Optional
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-glow-purple transition-all"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};
