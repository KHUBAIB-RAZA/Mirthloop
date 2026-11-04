import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ArrowDashGame } from '../games/arrow-dash/ArrowDashGame';
import { ControlsGuide } from '../games/arrow-dash/components/ControlsGuide';
import { AdUnit } from '../components/ads/AdUnit';
import { Link } from 'react-router-dom';
import { gamesCatalog } from '../config/site';
import { ShieldCheck, ArrowLeft, Star, Flame } from 'lucide-react';

export const GameDetailPage: React.FC = () => {
  const game = gamesCatalog[0];

  useDocumentTitle({
    title: `${game.title} — ${game.tagline}`,
    description: `Play ${game.title} for free in your browser. Fast 2D neon arcade runner with fluid HTML5 Canvas physics, keyboard controls and mobile touch screen steering.`,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Top Breadcrumb & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/games"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Games</span>
        </Link>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">
            {game.category}
          </span>
          <span className="flex items-center space-x-1 text-amber-400 font-mono font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{game.ratingScore}</span>
          </span>
        </div>
      </div>

      {/* Main Playable Game Container */}
      <section className="flex flex-col items-center">
        <ArrowDashGame />
      </section>

      {/* Ad placement located SAFELY below game controls with ample spacing */}
      <div className="pt-4">
        <AdUnit format="leaderboard" label="Sponsored Placement" />
      </div>

      {/* Game Story, Lore, Instructions & Controls Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="arcade-glow-card rounded-2xl p-6 border border-[#232C4F] space-y-4">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-rose-400" />
              <h2 className="text-xl font-bold text-white">About Arrow Dash</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Arrow Dash is an adrenaline-fueled neon reflex game. As pilot of the experimental delta-arrow vessel, you must navigate through an unpredictable grid of plasma discharge orbs and cosmic hazard waves.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every second you maintain course adds 15 points to your telemetry score. Collecting luminous golden energy stars rewards you with an instant +100 bonus and propels your score higher. As your survival time extends, hazard velocities surge and density intensifies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#232C4F]">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Energy Stars (+100 Pts)
                </h4>
                <p className="text-xs text-slate-400">
                  Golden pulsating stars grant immediate bonus score and trigger particle resonance.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0D18] border border-[#232C4F]">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                  Plasma Hazards
                </h4>
                <p className="text-xs text-slate-400">
                  Colliding with orbs will instantly compromise ship shields and end your run.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Controls Guide Component */}
          <ControlsGuide />
        </div>

        {/* Sidebar Info & Specifications */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-4">
            <h3 className="text-base font-bold text-white">Game Specifications</h3>
            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#1F2746]">
                <dt className="text-slate-400">Release Version</dt>
                <dd className="font-mono text-slate-200">v{game.version}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1F2746]">
                <dt className="text-slate-400">Engine</dt>
                <dd className="font-mono text-cyan-400">HTML5 Canvas (Pure JS)</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1F2746]">
                <dt className="text-slate-400">Target Framerate</dt>
                <dd className="font-mono text-emerald-400">60 FPS Hardware Sync</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1F2746]">
                <dt className="text-slate-400">Audio</dt>
                <dd className="font-mono text-purple-400">Web Audio Synthesizer</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1F2746]">
                <dt className="text-slate-400">Data Storage</dt>
                <dd className="font-mono text-slate-200">Local Browser Only</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">Audience</dt>
                <dd className="text-slate-200">All Ages (E)</dd>
              </div>
            </dl>
          </div>

          {/* Safety & Performance guarantee */}
          <div className="p-5 rounded-2xl bg-[#0F1424] border border-[#232C4F] space-y-2 text-xs text-slate-400">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Download Policy</span>
            </div>
            <p className="leading-relaxed">
              This game runs entirely in your browser memory without installing executable files or third-party plugins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
