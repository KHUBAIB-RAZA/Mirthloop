import { GameMetadata } from '../types/game';

export const siteConfig = {
  name: 'Mirthloop',
  tagline: 'Lightweight Online Arcade Games',
  description: 'Play Arrow Dash and original lightweight browser arcade games for free on desktop, mobile, and tablet. Instant gameplay, responsive controls, zero downloads.',
  url: 'https://mirthloop.pages.dev',
  author: 'Mirthloop Team',
  contactEmail: 'contact@mirthloop.com', // Explicit contact address
  socials: {
    github: 'https://github.com',
  },
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'Games', path: '/games' },
    { label: 'Arrow Dash', path: '/games/arrow-dash' },
    { label: 'How to Play', path: '/how-to-play' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ],
  legalLinks: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Cookie Policy', path: '/cookie-policy' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'Accessibility', path: '/accessibility' },
  ],
};

export const gamesCatalog: GameMetadata[] = [
  {
    id: 'arrow-dash',
    slug: 'arrow-dash',
    title: 'Arrow Dash',
    tagline: 'Dodge, Collect and Survive',
    category: 'Arcade Survival',
    description: 'Guide your hyper-responsive arrow through incoming plasma hazards, collect luminous energy stars, and rack up your highest survival score in this fast-paced neon arcade runner.',
    releaseDate: '2026-11-04',
    version: '1.0.0',
    ratingScore: 4.9,
    featured: true,
    controls: {
      desktop: ['Arrow Keys or WASD to navigate in 4 directions', 'P or ESC to pause/resume', 'R or Spacebar to restart'],
      mobile: ['Virtual 360° analog joystick or direct screen drag', 'Dedicated pause and restart buttons', 'Portrait and landscape optimized'],
    },
    features: [
      'Pure HTML5 Canvas 60FPS fluid physics',
      'Dynamic progressive difficulty curve',
      'Luminous star pickup multipliers',
      'Local score persistence via secure LocalStorage',
      'Zero download required, instant load',
    ],
    thumbnail: '/favicon.svg',
  },
];
