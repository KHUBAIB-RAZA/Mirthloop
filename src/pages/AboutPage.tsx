import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Gamepad2, Feather, Heart, Rocket, Shield } from 'lucide-react';

export const AboutPage: React.FC = () => {
  useDocumentTitle({
    title: 'About Us — Lightweight Browser Arcade Vision',
    description: 'Learn about Mirthloop, our dedication to lightweight browser games, privacy-respecting arcade experiences, and future roadmap.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About Mirthloop
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Rediscovering the joy of instant, lightweight browser gaming without the friction of bloated installs, account walls, or heavy client engines.
        </p>
      </div>

      {/* Main Philosophy Card */}
      <div className="arcade-glow-card rounded-3xl p-6 sm:p-10 border border-[#232C4F] space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Feather className="w-6 h-6 text-cyan-400" />
          <span>The Vision Behind Mirthloop</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Over the past decade, web gaming underwent a massive shift. What used to be spontaneous and lightweight evolved into gigabyte-heavy frameworks, endless loading screens, intrusive sign-up popups, and aggressive trackers.
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          <strong>Mirthloop was founded on a simple principle:</strong> anyone, regardless of device speed or connection bandwidth, should be able to open a URL and start playing a high-performance, polished arcade title in less than a second.
        </p>
      </div>

      {/* Core Values Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Feather className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Lightweight Engineering</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every game is built with pure web technologies like HTML5 Canvas and native requestAnimationFrame, consuming minimal RAM and running cool on mobile batteries.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">All-Ages Accessibility</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Clean typography, intuitive touchpads, keyboard navigation, and high-contrast color palettes ensure everyone can enjoy our arcade games comfortably.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Respect for Privacy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We don&apos;t ask for emails, phone numbers, or passwords. Your high scores stay safely in your own browser using standard LocalStorage.
          </p>
        </div>
      </div>

      {/* Future Roadmap Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#0F1424] border border-[#232C4F] space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-lg">
          <Rocket className="w-5 h-5" />
          <h2>Looking Forward: Expanding the Arcade</h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Arrow Dash represents the inaugural title of the Mirthloop platform. Our modular game engine architecture is built to support future arcade genres including puzzle runners, rhythm dodgers, and retro space cruisers.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          We maintain a zero-compromise approach to performance: every future game added to Mirthloop will adhere to the same lightweight standards, zero downloads, and universal touch/keyboard compatibility.
        </p>
        <div className="pt-2">
          <Link
            to="/games/arrow-dash"
            className="inline-flex items-center space-x-2 text-xs font-bold text-purple-400 hover:text-purple-300 underline underline-offset-4"
          >
            <span>Experience Arrow Dash V1</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
