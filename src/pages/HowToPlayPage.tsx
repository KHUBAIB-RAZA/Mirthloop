import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ControlsGuide } from '../games/arrow-dash/components/ControlsGuide';
import { Play, Target, Shield, Zap, Sparkles, Lightbulb, Compass, Award } from 'lucide-react';

export const HowToPlayPage: React.FC = () => {
  useDocumentTitle({
    title: 'How to Play Arrow Dash — Controls & Gameplay Guide',
    description: 'Learn keyboard shortcuts, mobile touch gestures, scoring rules, and survival strategies for Arrow Dash on Mirthloop.',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Player Field Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          How to Play Arrow Dash
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Master the controls, learn collision hitboxes, optimize your star collection routes, and outlast increasing hazard waves.
        </p>
      </div>

      {/* Quick Launch CTA */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-[#121729] to-cyan-900/40 border border-[#232C4F] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Ready to test your reflexes?</h3>
          <p className="text-xs text-slate-300">Launch the game directly and practice your maneuvers.</p>
        </div>
        <Link
          to="/games/arrow-dash"
          className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-glow-button flex items-center space-x-2 shrink-0 transition-transform hover:scale-105"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Play Arrow Dash</span>
        </Link>
      </div>

      {/* Controls Overview Card */}
      <ControlsGuide />

      {/* Core Gameplay Rules */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Target className="w-6 h-6 text-purple-400" />
          <span>Core Mechanics & Objectives</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
              <Zap className="w-4 h-4" />
              <span>Survival Telemetry Score</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every second you keep your arrow vessel flying grants +15 points. Surviving longer is the primary foundation for a massive score run.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Energy Star Collection</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Golden stars spawn periodically across the playfield. Flying through a star yields an instantaneous +100 bonus and increases your star collection tally.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>Plasma Hazard Avoidance</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Orbs and energy spheres glide across the screen from multiple angles. Touching any part of a plasma orb terminates the run immediately.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121729] border border-[#232C4F] space-y-2">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Progressive Difficulty</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every 18 seconds, the engine advances to a higher difficulty level. Obstacles spawn faster, move at increased velocities, and arrive in varied clusters.
            </p>
          </div>
        </div>
      </section>

      {/* Pro Tips for Beginners */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <span>Top Survival Tips for Beginners</span>
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#0F1426] border border-[#232C4F] flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Don&apos;t Camp the Corners</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Corners restrict your exit vectors. It is much easier to maneuver in the lower-center third of the screen where you have 360-degree dodge paths.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1426] border border-[#232C4F] flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Prioritize Safety Over Risky Stars</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                A +100 star is never worth colliding with a 150px plasma burst. If a star is surrounded by hazards, wait for it to clear or wait for the next spawn.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1426] border border-[#232C4F] flex items-start space-x-3">
            <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Use Subtle Micro-Adjustments</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quick directional taps are often safer than holding down a movement key. Gentle micro-movements keep your arrow centered and in full control.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
