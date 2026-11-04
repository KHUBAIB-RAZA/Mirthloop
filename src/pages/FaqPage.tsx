import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export const FaqPage: React.FC = () => {
  useDocumentTitle({
    title: 'Frequently Asked Questions — Mirthloop Arcade',
    description: 'Find answers about Mirthloop free arcade play, controls, device compatibility, high score saving, and privacy policies.',
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqs: FAQItem[] = [
    {
      question: 'Is Mirthloop completely free to play?',
      answer:
        'Yes, Mirthloop is 100% free of charge. There are no paywalls, paid subscriptions, VIP passes, or microtransactions. You get immediate, unrestricted access to our arcade games directly in your browser.',
    },
    {
      question: 'Do I need to download or install an app or executable?',
      answer:
        'No installation or software download is ever required. Mirthloop runs entirely on native web standards (HTML5 Canvas, CSS, and modern JavaScript). Games load into your browser memory in less than a second.',
    },
    {
      question: 'Can I play Arrow Dash on my smartphone or tablet?',
      answer:
        'Yes! Arrow Dash was engineered from day one for mobile browsers including iOS Safari, iPadOS, Android Chrome, and Firefox. It includes intuitive direct touch screen controls with an adaptive on-screen floating joystick.',
    },
    {
      question: 'Can I play on desktop computers with a physical keyboard?',
      answer:
        'Yes. Desktop players can use either the Arrow Keys (Up, Down, Left, Right) or the standard WASD keys for 4-directional flight. You can also press P or Escape to pause, and R or Spacebar to restart immediately.',
    },
    {
      question: 'Is user registration or an account required?',
      answer:
        'No account, username, or password is needed. We believe in barrier-free instant play. You never have to surrender personal credentials or connect social media profiles to play.',
    },
    {
      question: 'How is my all-time best score preserved?',
      answer:
        'Your high score is saved locally on your device via standard HTML5 LocalStorage. As long as you use the same browser and do not clear site data, your record will be ready when you return.',
    },
    {
      question: 'Does Mirthloop use cookies or tracking scripts?',
      answer: (
        <span>
          Mirthloop only uses essential browser storage to preserve your preferences and game high scores. We do not run third-party tracking or commercial advertising scripts in V1. You can inspect or update your choices at any time via our{' '}
          <Link to="/cookie-policy" className="text-cyan-400 underline hover:text-cyan-300">
            Cookie Policy
          </Link>
          .
        </span>
      ),
    },
    {
      question: 'How can I reach the development team or report a bug?',
      answer: (
        <span>
          You can visit our{' '}
          <Link to="/contact" className="text-purple-400 underline hover:text-purple-300">
            Contact Page
          </Link>{' '}
          or send an email directly to <span className="font-mono text-cyan-300">contact@mirthloop.com</span>. We read and appreciate all community feedback!
        </span>
      ),
    },
    {
      question: 'Will more games be added to Mirthloop in the future?',
      answer:
        'Yes! While Arrow Dash is our featured launch title in V1, our modular architecture is built to host a catalog of original, lightweight arcade games. Stay tuned for new releases.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Clear answers to common questions about games, device support, data storage, and the Mirthloop platform.
        </p>
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="arcade-glow-card rounded-2xl border border-[#232C4F] overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-bold text-white flex items-center space-x-3">
                  <span className="text-cyan-400 text-xs font-mono">0{idx + 1}.</span>
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1C2442]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="p-6 rounded-2xl bg-[#0F1426] border border-[#232C4F] text-center space-y-3">
        <h3 className="text-base font-bold text-white">Still have questions or feedback?</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          We are always happy to clarify technical details or listen to player ideas.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact Mirthloop Support</span>
        </Link>
      </div>
    </div>
  );
};
