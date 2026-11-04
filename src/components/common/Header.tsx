import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { Menu, X, Gamepad2, Play } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0A0D18]/90 backdrop-blur-md border-b border-[#232C4F]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl p-1"
            aria-label="Mirthloop Homepage"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-0.5 shadow-glow-purple group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0A0D18] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:text-purple-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">
                Mirth<span className="text-purple-400">loop</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1 hidden sm:block">
                Arcade
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {siteConfig.navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/games/arrow-dash"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-glow-button hover:shadow-glow-purple transition-all duration-200"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Play Arrow Dash</span>
            </Link>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/games/arrow-dash"
              onClick={closeMobileMenu}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-600 text-white flex items-center space-x-1"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Play</span>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#232C4F] bg-[#0C101F]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          {siteConfig.navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-200 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-4 border-t border-[#232C4F]">
            <Link
              to="/games/arrow-dash"
              onClick={closeMobileMenu}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-glow-button"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Arrow Dash</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
