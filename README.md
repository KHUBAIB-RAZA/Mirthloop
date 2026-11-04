# MIRTHLOOP — Lightweight Online Arcade Website

> **Production-Ready, Zero-Cost Infrastructure Browser Arcade Platform**  
> Built with React 19, TypeScript, Vite, Tailwind CSS, React Router, HTML5 Canvas, and Cloudflare Pages.

---

## 1. Project Vision & Architecture

**Mirthloop** is a lightweight, modern, responsive online arcade designed for an all-ages international audience. The platform features an original, fully playable arcade game — **Arrow Dash: Dodge, Collect and Survive** — engineered with pure HTML5 Canvas and native Web Audio oscillators, with zero heavyweight dependencies or external runtime assets.

The architecture is completely modular, enabling new arcade titles to be integrated into the catalog without rebuilding or restructuring the website.

### Key Highlights
- **Zero Cost Infrastructure:** Built to deploy for free on Cloudflare Pages with automatic global edge caching and free SSL/TLS encryption.
- **Pure Web Standards:** HTML5 Canvas 60FPS fluid physics, responsive touch D-Pad, keyboard controls, and synthesized Web Audio effects.
- **Privacy-First & Account-Free:** Zero user tracking and no mandatory accounts. High scores and cookie preferences are saved locally on the user's device via standard browser `LocalStorage`.
- **Google AdSense Ready:** Thoughtfully designed ad container reservations with clear labels, proper spacing away from controls, and zero intrusive popups or unverified scripts.
- **Accessible & Responsive:** Meets WCAG Level AA contrast and touch target standards across mobile phones, tablets, and desktop workstations.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | Type-safe UI components and reactive state |
| **Build Tool** | Vite 6 | Lightning-fast development & optimized production rollup |
| **Styling** | Tailwind CSS 3 | Modern dark arcade theme with custom glowing gradients |
| **Routing** | React Router 7 | Client-side SPA routing with Cloudflare fallback (`_redirects`) |
| **Game Engine** | HTML5 Canvas 2D | High-DPI hardware accelerated 60FPS physics loop |
| **Audio** | Web Audio API | Native synthesizer oscillators for pickups and collisions |
| **Icons** | Lucide React | Clean, scalable vector icons |
| **Persistence**| HTML5 LocalStorage | Client-side score records and consent preferences |
| **Hosting** | Cloudflare Pages | Free static edge deployment with HTTPS |

---

## 3. Implemented Pages and Routes

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | **Homepage** | Hero introduction, featured game spotlight, why play section, cross-platform guide, FAQ preview, and header/footer navigation. |
| `/games` | **Games Catalogue** | Search and category filter architecture with detailed cards for playable games. |
| `/games/arrow-dash` | **Arrow Dash Game** | The full playable canvas game with score counter, level progression, pause/restart modals, game-over screen, and mobile D-Pad. |
| `/how-to-play` | **How to Play** | Complete control manual for desktop keyboard and mobile touch, scoring formulas, hazard guides, and beginner survival tips. |
| `/about` | **About Us** | Mirthloop mission, lightweight engineering philosophy, and arcade expansion roadmap. |
| `/contact` | **Contact & Support** | Direct email contact (`contact@mirthloop.com`) and client-validated feedback form. |
| `/faq` | **FAQ** | Comprehensive interactive accordion covering gameplay, compatibility, scores, cookies, and safety. |
| `/accessibility` | **Accessibility** | Statement on WCAG compliance, keyboard operability, color contrast, touch target sizing, and focus indicators. |
| `/privacy-policy` | **Privacy Policy** | Comprehensive policy detailing zero account tracking, LocalStorage usage, Cloudflare edge, and future advertising standards. |
| `/cookie-policy` | **Cookie Policy** | Transparent breakdown of essential vs. optional storage with interactive consent manager. |
| `/terms` | **Terms & Conditions** | Acceptable use policy, intellectual property rights, and limitation of liability. |
| `/disclaimer` | **Disclaimer** | Entertainment-only purpose, local score persistence notice, and future monetization disclosure. |
| `*` | **Custom 404** | Branded error screen with return-to-home and play-game quick links. |

---

## 4. Arrow Dash — Game Engineering

### Gameplay Mechanics
- **Player Vessel:** Experimental neon delta ship with smooth vector movement and particle thrust trail.
- **Movement:** 4-directional velocity with normalized diagonal speed. Clamped cleanly inside the canvas boundaries.
- **Hazard System:** Procedurally spawned plasma orbs and energy bars traveling across multiple angles with scaling velocity.
- **Collectibles:** Luminous 5-pointed energy stars that spin, pulse, and award **+100 bonus points** with sparkle particle explosions and audio chime.
- **Progressive Difficulty:** Level advances every 18 seconds, gradually increasing obstacle spawn frequencies and velocities.
- **Scoring:** Continuous telemetry score (**+15 pts/sec**) plus star bonuses.
- **Persistence:** All-time best score automatically saves to `LocalStorage` under `mirthloop_arrow_dash_best_score_v1`.

### Controls
- **Desktop:**
  - `↑ ↓ ← →` or `W A S D`: 4-directional ship movement
  - `P` or `Escape`: Pause / Resume game
  - `R` or `Spacebar`: Quick restart run
- **Mobile & Tablet:**
  - **Virtual Analog Joystick:** Tactile 360-degree thumb joystick with base perimeter clamping, analog vector intensity, and spring-back release animation
  - **Direct On-Screen Steering:** Touch and drag directly on the canvas screen with floating joystick tracking
  - On-screen Pause, Resume, and Restart buttons
  - `touch-action: manipulation` and `e.preventDefault()` to prevent accidental page scrolling during gameplay

### Robust Engineering Highlights
- **High-DPI / Retina Ready:** Canvas automatically scales with `window.devicePixelRatio` for sharp rendering on iPhone, iPad, and high-res monitors.
- **Visibility Auto-Pause:** Game automatically pauses when the browser tab loses focus or becomes hidden via `document.visibilitychange`.
- **Zero Asset Dependencies:** No external sprite sheets, audio MP3s, or heavy textures downloaded at runtime. Everything is drawn mathematically or synthesized via Web Audio.

---

## 5. Cookie Consent Management

Mirthloop includes an accessible, GDPR and ePrivacy-ready cookie consent system:
- **First-Visit Floating Banner:** Displays clear information with **Accept All**, **Reject Optional**, and **Customize** options.
- **Preferences Modal:** Categorizes storage into:
  1. *Essential & Gameplay Storage* (Always required for local high scores & volume state)
  2. *Performance & Analytics* (Optional / Future)
  3. *Advertising & Personalization* (Optional / Future)
- **Reopen Anytime:** Users can reopen their preferences at any time by clicking the **Cookie Preferences** button in the footer.
- **No Pre-selected Optional Cookies:** Privacy-by-default is strictly respected.

---

## 6. Google AdSense Readiness & Setup Guide

The application is structured to comply with Google AdSense quality and placement guidelines:
- Ad containers are **physically segregated** from gameplay controls, canvas areas, and navigation bars to prevent accidental clicks.
- Ads use clear, prominent labels (`Advertisement` or `Sponsored Partner`).
- No deceptive placements, artificial impression loops, or intrusive popups.
- **Zero Ad Scripts Loaded in V1:** Ad components render compliant placeholder cards until an approved publisher ID is supplied and user consent is granted.

### Adding Google AdSense Post-Approval

Once your site is approved by Google AdSense:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Enable AdSense and enter your verified Publisher ID and Slot IDs:
   ```env
   VITE_ADSENSE_ENABLED=true
   VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   VITE_ADSENSE_SLOT_HOME_TOP=1234567890
   VITE_ADSENSE_SLOT_HOME_BOTTOM=2345678901
   VITE_ADSENSE_SLOT_GAME_SIDEBAR=3456789012
   VITE_ADSENSE_SLOT_GAME_BOTTOM=4567890123
   VITE_ADSENSE_SLOT_CATALOG=5678901234
   ```
3. Add your verified `ads.txt` file to the `public/` directory (only after AdSense verifies your domain):
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
4. In Cloudflare Pages, add these environment variables under **Settings > Environment variables**.

---

## 7. How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation & Execution
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in your browser
# Typically http://localhost:5173
```

### Production Build & Preview
```bash
# Type check and build production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 8. Deploying to Cloudflare Pages (Free Plan)

### Method 1: Git Integration (Recommended)
1. Push this repository to **GitHub** or **GitLab**.
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
3. Click **Create Application** > **Pages** > **Connect to Git**.
4. Select your `mirthloop` repository.
5. In the build settings configuration:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (leave default)
6. Click **Save and Deploy**.
7. Cloudflare Pages will build the site and provide a free `*.pages.dev` subdomain (e.g. `https://mirthloop.pages.dev`).

### Method 2: Direct Upload via Wrangler CLI
```bash
# Build the project
npm run build

# Deploy directly using Cloudflare Wrangler
npx wrangler pages deploy dist --project-name mirthloop
```

### SPA Routing & Security Headers
The repository already includes:
- `public/_redirects`: `/* /index.html 200` to ensure direct page refreshes work on all routes.
- `public/_headers`: Enforces `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and strict referrer/permission policies.

---

## 9. Connecting a Custom Domain on Cloudflare

1. Open your Cloudflare Pages project in the Cloudflare Dashboard.
2. Select the **Custom domains** tab.
3. Click **Set up a custom domain**.
4. Enter your domain (e.g. `mirthloop.com` or `arcade.mirthloop.com`).
5. Cloudflare will automatically configure the DNS CNAME records and issue a free, auto-renewing **SSL/TLS certificate**.
6. Ensure **Always Use HTTPS** is enabled under **SSL/TLS > Edge Certificates**.

---

## 10. Technical Quality Assurance Verification

- [x] All 13 routes and legal pages implemented with meaningful, original content.
- [x] HTML5 Canvas game engine with 60FPS loop, high-DPI scaling, and smooth delta-time physics.
- [x] Multi-directional keyboard navigation (Arrows & WASD) with scroll prevention.
- [x] Touch-friendly on-screen D-Pad and canvas swipe controls for smartphones and tablets.
- [x] LocalStorage persistence for high scores and cookie preferences.
- [x] Tab visibility change detection with automatic gameplay pausing.
- [x] Reusable, compliant AdSense placeholder units.
- [x] Complete technical SEO with OpenGraph, Twitter cards, XML sitemap, and robots.txt.
- [x] Full production build passes with zero TypeScript warnings or errors (`dist/` compiled cleanly).
