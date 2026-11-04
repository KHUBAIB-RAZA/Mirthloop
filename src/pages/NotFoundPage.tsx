import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Home, Gamepad2, AlertTriangle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useDocumentTitle({
    title: '404 — Page Not Found | Mirthloop',
    description: 'The requested arcade page or game route could not be found.',
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#121729] border border-[#232C4F] shadow-glow-purple">
        <AlertTriangle className="w-12 h-12 text-rose-500 animate-pulse" />
      </div>

      <div className="space-y-2">
        <span className="font-mono text-sm font-extrabold tracking-widest text-cyan-400 uppercase">
          Error 404 — Missing Vector
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Sector Not Found
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
          The arcade link or game route you followed has drifted off our telemetry grid.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-glow-button hover:brightness-110 flex items-center justify-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/games/arrow-dash"
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center space-x-2"
        >
          <Gamepad2 className="w-4 h-4 text-cyan-400" />
          <span>Play Arrow Dash</span>
        </Link>
      </div>
    </div>
  );
};
