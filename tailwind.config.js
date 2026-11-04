/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          bg: '#0A0D18',
          card: '#121729',
          cardHover: '#1B223C',
          border: '#232C4F',
          borderLight: '#354378',
          purple: '#8B5CF6',
          purpleHover: '#7C3AED',
          cyan: '#06B6D4',
          cyanHover: '#0891B2',
          blue: '#3B82F6',
          blueHover: '#2563EB',
          accent: '#EC4899',
          gold: '#FBBF24',
          danger: '#EF4444',
          success: '#10B981',
          textMuted: '#94A3B8',
          textMain: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-button': '0 0 20px 2px rgba(139, 92, 246, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
