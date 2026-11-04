import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from '../consent/CookieBanner';
import { CookieConsentModal } from '../consent/CookieConsentModal';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0D18] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-purple-600 text-white font-bold rounded-lg shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1 w-full focus:outline-none">
        {children}
      </main>

      <Footer />

      {/* Cookie Consent Interface */}
      <CookieBanner />
      <CookieConsentModal />
    </div>
  );
};
