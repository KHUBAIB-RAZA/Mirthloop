import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { useCookieConsent } from '../consent/CookieContext';
import { Gamepad2, Sliders, Shield, Heart, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const { openModal } = useCookieConsent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#070913] border-t border-[#1D2542] text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group w-fit" aria-label="Mirthloop Home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-glow-purple">
                <div className="w-full h-full bg-[#0A0D18] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">
                Mirth<span className="text-purple-400">loop</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Mirthloop is a modern, lightweight online arcade crafted for lightning-fast browser play across mobile, tablet, and desktop. Zero bloated engines, zero downloads, pure arcade joy.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-500 pt-1">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Built for high performance on HTML5 Canvas</span>
            </div>
          </div>

          {/* Quick Arcade Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Arcade Games</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/games/arrow-dash" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Arrow Dash (Playable)
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Games Catalogue
                </Link>
              </li>
              <li>
                <Link to="/how-to-play" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  How to Play & Controls
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-purple-400 transition-colors">
                  About Mirthloop
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Privacy & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-pink-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-slate-400 hover:text-pink-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-pink-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-400 hover:text-pink-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li className="pt-1">
                <button
                  onClick={openModal}
                  className="flex items-center space-x-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium py-1 px-2 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Cookie Preferences</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#1D2542] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>SSL Protected via Cloudflare</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              <span>for arcade enthusiasts</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
