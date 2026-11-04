import React, { useState, useEffect } from 'react';
import { useCookieConsent } from './CookieContext';
import { X, ShieldCheck, BarChart2, Radio, Check } from 'lucide-react';

export const CookieConsentModal: React.FC = () => {
  const { preferences, isModalOpen, closeModal, updatePreferences } = useCookieConsent();
  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [advertising, setAdvertising] = useState(preferences.advertising);

  useEffect(() => {
    if (isModalOpen) {
      setAnalytics(preferences.analytics);
      setAdvertising(preferences.advertising);
    }
  }, [isModalOpen, preferences]);

  if (!isModalOpen) return null;

  const handleSave = () => {
    updatePreferences({ analytics, advertising });
  };

  const handleAcceptAll = () => {
    updatePreferences({ analytics: true, advertising: true });
  };

  const handleRejectAll = () => {
    updatePreferences({ analytics: false, advertising: false });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <div className="bg-[#121729] border border-[#232C4F] rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/60 transition-colors"
          aria-label="Close cookie preferences modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 id="cookie-modal-title" className="text-xl font-bold text-white">
              Cookie & Storage Preferences
            </h2>
            <p className="text-xs text-slate-400">
              Customize how Mirthloop stores your non-sensitive browser preferences
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Mirthloop values your privacy. We use lightweight local browser storage to save your game high scores and volume settings. You have full control over optional categories below.
        </p>

        <div className="space-y-4 mb-6">
          {/* Necessary Storage */}
          <div className="p-4 rounded-xl bg-[#0A0D18] border border-[#232C4F] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-white text-sm">Essential & Gameplay Storage</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Required
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Required for saving your local Arrow Dash high scores, game state, and consent status. No personal tracking or account data is stored.
              </p>
            </div>
            <div className="pt-1">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-purple-600/30 text-purple-300">
                <Check className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Analytics Storage */}
          <div className="p-4 rounded-xl bg-[#0A0D18] border border-[#232C4F] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white text-sm">Performance & Analytics (Future)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Allows aggregated statistical analysis of game performance and load times. In V1, no third-party analytics scripts are running.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {/* Advertising Storage */}
          <div className="p-4 rounded-xl bg-[#0A0D18] border border-[#232C4F] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-white text-sm">Advertising & Personalization (Future)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prepares consent for future Google AdSense displays. No commercial ad scripts or ad tracking are activated until authorized.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={advertising}
                onChange={(e) => setAdvertising(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#232C4F]">
          <div className="flex w-full sm:w-auto gap-2">
            <button
              onClick={handleRejectAll}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Reject Optional
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/30 text-purple-300 transition-colors"
            >
              Accept All
            </button>
          </div>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-md transition-all"
          >
            Save Choices
          </button>
        </div>
      </div>
    </div>
  );
};
