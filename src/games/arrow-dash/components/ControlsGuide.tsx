import React from 'react';
import { Keyboard, Smartphone, Award } from 'lucide-react';

export const ControlsGuide: React.FC = () => {
  return (
    <div className="arcade-glow-card rounded-2xl p-6 border border-[#232C4F]">
      <h3 className="text-base font-bold text-white flex items-center space-x-2 mb-4">
        <Award className="w-5 h-5 text-cyan-400" />
        <span>How to Control Arrow Dash</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Desktop Controls */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm font-semibold text-purple-300">
            <Keyboard className="w-4 h-4" />
            <span>Desktop Keyboard</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center justify-between p-2 rounded-lg bg-[#0A0D18] border border-[#232C4F]">
              <span>Movement (4 Directions)</span>
              <span className="font-mono bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-slate-700">
                ↑ ↓ ← → or W A S D
              </span>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg bg-[#0A0D18] border border-[#232C4F]">
              <span>Pause / Resume</span>
              <span className="font-mono bg-slate-800 text-purple-300 px-2 py-0.5 rounded border border-slate-700">
                P or ESC
              </span>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg bg-[#0A0D18] border border-[#232C4F]">
              <span>Quick Restart</span>
              <span className="font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                R or Spacebar
              </span>
            </li>
          </ul>
        </div>

        {/* Mobile & Tablet Controls */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm font-semibold text-cyan-300">
            <Smartphone className="w-4 h-4" />
            <span>Mobile & Tablet Touch Screen</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center justify-between p-2 rounded-lg bg-[#0A0D18] border border-[#232C4F]">
              <span>Virtual Analog Joystick</span>
              <span className="text-cyan-300 font-semibold">360° fluid thumb stick</span>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg bg-[#0A0D18] border border-[#232C4F]">
              <span>Direct Screen Drag</span>
              <span className="text-slate-400">Drag anywhere on canvas to steer</span>
            </li>
            <li className="flex items-center justify-between p-2 rounded-lg bg-[#0A0D18] border border-[#232C4F]">
              <span>Instant HUD Controls</span>
              <span className="text-slate-400">On-screen Pause & Restart buttons</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#232C4F] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Survive as long as possible (+15 pts/sec)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span>Collect glowing gold stars for +100 bonus pts</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span>Avoid plasma hazards to stay in the run!</span>
        </div>
      </div>
    </div>
  );
};
