import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { gamesCatalog } from '../config/site';
import { AdUnit } from '../components/ads/AdUnit';
import {
  Play,
  Zap,
  ShieldCheck,
  Smartphone,
  Monitor,
  Flame,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Cpu,
  Layers,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  useDocumentTitle({
    title: 'Free Lightweight Browser Arcade Games',
    description: 'Jump right into high-octane browser gaming with Mirthloop. Zero downloads, pure HTML5 Canvas performance, responsive controls on mobile and desktop.',
  });

  const featuredGame = gamesCatalog[0];

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-12 overflow-hidden">
        {/* Glow ambient background circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Generation Lightweight Arcade</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Instant Browser Arcade Fun.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            No Installs. No Bloat.
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Mirthloop brings classic, responsive arcade thrills directly to your modern web browser. Designed for all ages, built with pure web standards, and optimized for instant play on any screen.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/games/arrow-dash"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-glow-button hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Play Arrow Dash Now</span>
          </Link>
          <Link
            to="/games"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-[#232C4F] hover:border-slate-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Browse Games</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#121729] border border-[#232C4F]">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pure HTML5 Canvas 60FPS</span>
          </span>
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#121729] border border-[#232C4F]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Tracking / No Sign-up</span>
          </span>
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#121729] border border-[#232C4F]">
            <Smartphone className="w-3.5 h-3.5 text-purple-400" />
            <span>Mobile & Touch Ready</span>
          </span>
        </div>
      </section>

      {/* Reserved Top Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdUnit format="leaderboard" label="Sponsored Partner" />
      </div>

      {/* Featured Game Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="arcade-glow-card rounded-3xl p-6 sm:p-10 border border-[#232C4F] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Featured Title
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  V1 Debut
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {featuredGame.title} — {featuredGame.tagline}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {featuredGame.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {featuredGame.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to={`/games/${featuredGame.slug}`}
                  className="px-6 py-3 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-glow-purple flex items-center space-x-2 transition-transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Launch Arrow Dash</span>
                </Link>
                <Link
                  to="/how-to-play"
                  className="text-xs font-semibold text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
                >
                  View Controls & Strategies
                </Link>
              </div>
            </div>

            {/* Game Card Preview Graphic */}
            <div className="w-full lg:w-96 aspect-[4/3] rounded-2xl bg-[#090D1A] border border-[#232C4F] p-6 flex flex-col justify-between relative shadow-2xl group hover:border-cyan-500/50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-rose-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Fast-Paced</span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  ★★★★★ {featuredGame.ratingScore}
                </span>
              </div>

              {/* Graphic Icon Artwork */}
              <div className="my-auto flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-1 shadow-glow-purple group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full bg-[#0A0D18] rounded-[14px] flex items-center justify-center">
                    <Play className="w-8 h-8 text-cyan-400 fill-cyan-400" />
                  </div>
                </div>
                <span className="text-base font-bold text-white mt-3">{featuredGame.title}</span>
                <span className="text-xs text-slate-400">Survival Arcade Runner</span>
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-500 border-t border-[#1F2746] pt-3">
                <span>Free to play</span>
                <span>Keyboard & Touch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Play Mirthloop Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            Why Players Love Mirthloop
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            We stripped away loading screens, 500MB engine downloads, and intrusive account logins to restore what web gaming was meant to be: pure, immediate fun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Ultra-Lightweight Engine</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Built with native HTML5 Canvas and mathematical 2D physics. The entire application loads in under a single second with zero battery drain.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Privacy & Account Free</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              No registration passwords, no social media log-ins, and no invasive tracking. High scores are saved cleanly to your device&apos;s own LocalStorage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Cloudflare Edge Fast</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Hosted on Cloudflare&apos;s global edge network across 300+ cities worldwide, ensuring rapid asset delivery and 100% HTTPS encrypted communication.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-Platform Compatibility Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#121729] to-[#182038] border border-[#232C4F] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Monitor className="w-4 h-4" />
              <span>Full Cross-Platform Harmony</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Play Anywhere. Switch Screens Seamlessly.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you are sitting at your multi-monitor gaming desktop with full keyboard precision or commuting with your smartphone, Mirthloop automatically adapts the viewport, HUD layout, and touch controls for your screen.
            </p>
            <div className="flex items-center space-x-6 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <Monitor className="w-4 h-4 text-purple-400" />
                <span>Desktop (Arrow/WASD)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Mobile (Touch Screen Joystick)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/how-to-play"
              className="px-6 py-3 rounded-xl text-sm font-bold bg-[#0A0D18] hover:bg-slate-900 text-slate-200 border border-slate-700 transition-colors text-center"
            >
              Read Control Manual
            </Link>
            <Link
              to="/games/arrow-dash"
              className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-glow-button text-center"
            >
              Play Arrow Dash
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Preview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need to know about Mirthloop and browser arcade play
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#121729] border border-[#232C4F]">
            <h3 className="text-base font-bold text-white mb-1.5 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Is Mirthloop completely free to play?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Yes, 100%. Every game on Mirthloop is completely free without paywalls, subscriptions, in-app microtransactions, or download fees.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121729] border border-[#232C4F]">
            <h3 className="text-base font-bold text-white mb-1.5 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>How are my high scores saved without an account?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your scores are securely retained in your browser&apos;s own private LocalStorage. As long as you don&apos;t clear your browser data for this site, your best runs are preserved for your next visit.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121729] border border-[#232C4F]">
            <h3 className="text-base font-bold text-white mb-1.5 flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-pink-400" />
              <span>Can I play on iOS Safari or Android Chrome?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Absolutely. Our canvas game engine features dedicated mobile touch controls, directional touch buttons, and responsive viewport sizing designed specifically for mobile touchscreens.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/faq"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
          >
            <span>Read all frequently asked questions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Bottom Leaderboard Ad Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdUnit format="leaderboard" label="Partner Spotlight" />
      </div>
    </div>
  );
};
