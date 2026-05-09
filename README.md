## `README.md`

```markdown
<div align="center">

<img src="public/logo.png" alt="All Sports World Logo" width="80" height="80" />

# 🌍 ALL SPORTS WORLD

### Premium Sports Media Platform — FIFA World Cup 2026

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-00FF85?style=for-the-badge)](LICENSE)

**A cinematic, fully responsive sports media frontend covering FIFA World Cup 2026 and 20+ live sports.**

[🔴 Live Demo](https://allsportsworld.vercel.app) · [📖 Docs](#-project-structure) · [🐛 Report Bug](https://github.com/yourusername/all-sports-world/issues)

---

![All Sports World Preview](public/images/preview.png)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Data & APIs](#-data--apis)
- [Live Score Integration](#-live-score-integration)
- [Environment Variables](#-environment-variables)
- [Design System](#-design-system)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**All Sports World** is a premium, cinematic sports media platform built to deliver
world-class FIFA World Cup 2026 coverage alongside real-time scores for 20+ sports.

Inspired by **ESPN**, **FIFA.com**, **Bleacher Report**, and **OneFootball** — this platform
combines cutting-edge UI design with live sports data to create an international-level
fan experience.

> ⚽ Primary focus: **FIFA World Cup 2026** — USA · Canada · Mexico  
> 🌍 Secondary scope: All major sports worldwide

---

## ✨ Features

### 🏆 World Cup 2026 Coverage
- ✅ Complete 104-match schedule with local timezone conversion
- ✅ All 48 qualified nations with squad details and stats
- ✅ 16 official stadiums with venue guides and hosted matches
- ✅ Live group standings with qualification indicators
- ✅ Interactive fan predictions & voting system
- ✅ Countdown timer to every match and the tournament opener

### 🔴 Live Score System
- ✅ Real-time scores via SportAPI (SofaScore) — 20+ sports
- ✅ Football, Basketball, Tennis, Cricket, MMA, Motorsport, Esports & more
- ✅ Auto-refresh every 30 seconds
- ✅ Live match events (goals, cards, substitutions)
- ✅ Official team & league logos via SofaScore CDN
- ✅ Graceful fallback to demo data when API is unavailable

### 📰 News & Media
- ✅ 24 World Cup 2026 news articles across all teams and categories
- ✅ Featured article + trending news layout
- ✅ Category filtering (FIFA, Analysis, Teams, Stadiums)
- ✅ Full article pages with related content

### 🎨 UI & Experience
- ✅ Dark cinematic glassmorphism design
- ✅ Framer Motion page transitions and scroll animations
- ✅ Fully responsive — Mobile, Tablet, Desktop
- ✅ Dark / Light mode toggle (next-themes)
- ✅ Live news ticker
- ✅ Sport-specific color theming

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 | App Router, SSG, API Routes |
| **React** | 18 | UI Framework |
| **Tailwind CSS** | 3.x | Styling & Design System |
| **Framer Motion** | 11 | Animations & Transitions |
| **Swiper.js** | 11 | Carousels & Sliders |
| **Lucide React** | Latest | Icons |
| **React Icons** | 5.x | Social Media Icons |
| **next-themes** | 0.3 | Dark/Light Mode |
| **date-fns** | Latest | Date Formatting |
| **JavaScript** | ES2024 | Language (no TypeScript) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17+ 
- **npm** 9+ or **yarn** 1.22+
- A free **RapidAPI** account (for live scores)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/all-sports-world.git
cd all-sports-world

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (see Environment Variables section)

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quick Start (without API keys)

The project works **fully without any API keys** using demo data.
Live scores will display sample matches until you add your API key.

```bash
git clone https://github.com/yourusername/all-sports-world.git
cd all-sports-world
npm install
npm run dev
```

---

## 📂 Project Structure

```
all-sports-world/
│
├── public/
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── app/                        # Next.js 15 App Router
│   │   ├── layout.js               # Root layout
│   │   ├── page.js                 # Home page
│   │   ├── globals.css             # Global styles
│   │   │
│   │   ├── api/                    # API Routes (server-side)
│   │   │   └── livescores/
│   │   │       ├── all/route.js    # All sports combined
│   │   │       ├── [sport]/route.js# Per-sport endpoint
│   │   │       └── incidents/
│   │   │           └── [eventId]/  # Match events
│   │   │
│   │   ├── livescore/page.js       # Live scores page
│   │   ├── schedule/page.js        # Match schedule
│   │   ├── teams/
│   │   │   ├── page.js             # All teams
│   │   │   └── [slug]/page.js      # Team detail
│   │   ├── stadiums/
│   │   │   ├── page.js             # All stadiums
│   │   │   └── [slug]/page.js      # Stadium detail
│   │   ├── news/
│   │   │   ├── page.js             # News listing
│   │   │   └── [slug]/page.js      # Article detail
│   │   ├── predictions/page.js     # Fan predictions
│   │   ├── about/page.js           # About us
│   │   ├── contact/page.js         # Contact form
│   │   ├── privacy/page.js         # Privacy policy
│   │   └── terms/page.js           # Terms of service
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── LiveTicker.jsx
│   │   ├── MatchCard.jsx
│   │   ├── TeamCard.jsx
│   │   ├── StadiumCard.jsx
│   │   ├── NewsCard.jsx
│   │   ├── ReelCard.jsx
│   │   ├── LiveScoreCard.jsx
│   │   ├── CountdownTimer.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── FilterTabs.jsx
│   │   ├── Badge.jsx
│   │   └── LoadingSpinner.jsx
│   │
│   ├── sections/                   # Homepage sections
│   │   ├── HeroSection.jsx
│   │   ├── UpcomingMatchesSection.jsx
│   │   ├── FeaturedTeamsSection.jsx
│   │   ├── TrendingNewsSection.jsx
│   │   ├── StadiumShowcaseSection.jsx
│   │   ├── GroupStandingsSection.jsx
│   │   ├── ReelsSection.jsx
│   │   ├── PredictionSection.jsx
│   │   └── NewsletterSection.jsx
│   │
│   ├── data/                       # Static JSON data
│   │   ├── matches.json            # 104 WC 2026 matches
│   │   ├── teams.json              # 48 qualified nations
│   │   ├── stadiums.json           # 16 official venues
│   │   ├── news.json               # 24 news articles
│   │   ├── standings.json          # Group standings
│   │   ├── reels.json              # Highlight clips
│   │   └── livescores.json         # Demo live score data
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useCountdown.js         # Match countdown timer
│   │   ├── useLocalTime.js         # Timezone conversion
│   │   ├── useScrollPosition.js    # Scroll detection
│   │   └── useLiveScores.js        # Live score fetching
│   │
│   ├── utils/                      # Utility functions
│   │   ├── timeUtils.js            # Date/time helpers
│   │   ├── formatUtils.js          # Number formatting
│   │   ├── slugUtils.js            # URL slug generation
│   │   └── sportApiTransformer.js  # API data transformer
│   │
│   ├── config/
│   │   └── sports.js               # All 25+ sport definitions
│   │
│   ├── context/
│   │   └── ThemeContext.js         # Theme provider
│   │
│   └── styles/
│       └── swiper.css              # Swiper custom styles
│
├── .env.local                      # Environment variables
├── .env.example                    # Example env file
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── package.json
└── README.md
```

---

## 📄 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, matches, teams, news, standings |
| `/livescore` | Live Scores | Real-time scores for 20+ sports |
| `/schedule` | Schedule | All 104 WC 2026 matches with filters |
| `/teams` | Teams | All 48 qualified nations |
| `/teams/[slug]` | Team Detail | Squad, stats, upcoming matches |
| `/stadiums` | Stadiums | All 16 official venues |
| `/stadiums/[slug]` | Venue Detail | Capacity, matches, location |
| `/news` | News | Articles, features, analysis |
| `/news/[slug]` | Article | Full article with related content |
| `/predictions` | Predictions | Fan polls & leaderboard |
| `/about` | About | Team, mission, values |
| `/contact` | Contact | Contact form & info |
| `/privacy` | Privacy | Privacy policy |
| `/terms` | Terms | Terms of service |

---

## 📊 Data & APIs

### Static Data (JSON files)

All World Cup 2026 data is stored locally as JSON:

| File | Records | Description |
|---|---|---|
| `matches.json` | 104 matches | Full WC 2026 schedule |
| `teams.json` | 48 teams | All qualified nations |
| `stadiums.json` | 16 venues | Official WC 2026 stadiums |
| `news.json` | 24 articles | Sports news & features |
| `standings.json` | 3 groups | Sample group standings |
| `livescores.json` | 16 matches | Demo live score fallback |

### Match Data Structure

```json
{
  "id": 1,
  "group": "A",
  "matchday": 1,
  "team1": {
    "name": "Argentina",
    "code": "ar",
    "flag": "https://flagcdn.com/w80/ar.png"
  },
  "team2": {
    "name": "France",
    "code": "fr",
    "flag": "https://flagcdn.com/w80/fr.png"
  },
  "stadium": "MetLife Stadium",
  "city": "East Rutherford",
  "country": "USA",
  "date": "2026-06-11T21:00:00Z",
  "stage": "Group Stage",
  "featured": true
}
```

---

## 🔴 Live Score Integration

Real-time scores powered by **SportAPI** (SofaScore) via RapidAPI.

### Supported Sports (25+)

| Category | Sports |
|---|---|
| Ball Sports | Football ⚽, Basketball 🏀, Volleyball 🏐, Handball 🤾, Baseball ⚾ |
| Racket | Tennis 🎾, Table Tennis 🏓, Badminton 🏸 |
| Combat | MMA 🥊, Boxing 🥊 |
| Winter | Ice Hockey 🏒 |
| Cricket | All formats 🏏 |
| Motorsport | F1 🏎️, MotoGP, NASCAR, WRC, IndyCar |
| Precision | Darts 🎯, Snooker 🎱 |
| Esports | CS:GO 🎮, Dota 2, LoL |

### How It Works

```
User visits /livescore
       ↓
useLiveScores() hook fires
       ↓
Fetch /api/livescores/all (Next.js API route)
       ↓
API route calls SportAPI for each sport in parallel
       ↓
sportApiTransformer.js converts API response → our format
       ↓
LiveScoreCard renders with team logos, scores, events
       ↓
Auto-refresh every 30 seconds
```

### Getting a Free API Key

1. Visit [rapidapi.com](https://rapidapi.com)
2. Search for **"SportAPI"** or **"sportapi7"**
3. Subscribe to the **Free plan** (100 requests/day)
4. Copy your API key
5. Add to `.env.local`

---

## 🔐 Environment Variables

Create a `.env.local` file in the root:

```bash
# ── SportAPI (Live Scores) ─────────────────────
# Get free key at: rapidapi.com → search "sportapi7"
RAPIDAPI_KEY=your_rapidapi_key_here
SPORTAPI_HOST=sportapi7.p.rapidapi.com

# ── App URL ────────────────────────────────────
# Development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# Production (update after deployment)
# NEXT_PUBLIC_BASE_URL=https://yourapp.vercel.app
```

### `.env.example`

```bash
RAPIDAPI_KEY=
SPORTAPI_HOST=sportapi7.p.rapidapi.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> **Note:** The app works without any API keys.  
> Live scores will display demo data as a fallback.

---

## 🎨 Design System

### Color Palette

```
Background:       #07111F    Deep navy — primary background
Card Background:  #0F172A    Slightly lighter — cards and panels
Accent Green:     #00FF85    Neon green — primary accent and CTAs
Accent Blue:      #00BFFF    Electric blue — secondary accent
Text White:       #FFFFFF    Primary text
Secondary Text:   #94A3B8    Muted text for descriptions
```

### Typography

| Font | Usage |
|---|---|
| **Bebas Neue** | Headings, scores, stats, display text |
| **Inter** | Body text, descriptions, UI labels |

### Key CSS Classes

```css
.glass        /* Glassmorphism card — blur + transparent bg */
.glass-dark   /* Darker glass — navbar, modals */
.btn-primary  /* Green filled pill button */
.btn-secondary/* Blue outlined pill button */
.neon-text-green  /* Green glowing text */
.neon-text-blue   /* Blue glowing text */
.section-title    /* Large display heading */
```

### Breakpoints

```
Mobile:   < 640px   (mobile-first default)
sm:       640px+    (large phones, small tablets)
md:       768px+    (tablets)
lg:       1024px+   (desktop)
xl:       1280px+   (large desktop)
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Settings → Environment Variables
# Add: RAPIDAPI_KEY, SPORTAPI_HOST, NEXT_PUBLIC_BASE_URL
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/all-sports-world)

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy dist folder to Netlify
# Or connect GitHub repo at netlify.com
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start

# Check for issues
npm run lint
```

---

## 🧪 Available Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint checks
```

---

## 📦 Key Dependencies

```json
{
  "next":           "15.0.0",
  "react":          "^18.3.1",
  "framer-motion":  "^11.3.0",
  "swiper":         "^11.1.0",
  "lucide-react":   "^0.400.0",
  "react-icons":    "^5.2.1",
  "next-themes":    "^0.3.0",
  "date-fns":       "^3.0.0",
  "tailwindcss":    "^3.4.4"
}
```

---

## 🗺️ Roadmap

- [ ] **User Accounts** — Save favorite teams and set match alerts
- [ ] **Push Notifications** — Goal alerts and match start reminders
- [ ] **Fantasy League** — Build your squad, earn points
- [ ] **Match Chat** — Live comments during matches
- [ ] **Video Highlights** — Embedded goal clips and post-match analysis
- [ ] **Multi-language** — Arabic, Spanish, French, Portuguese, Bengali
- [ ] **Mobile App** — React Native version
- [ ] **PWA** — Progressive Web App with offline support

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes and commit
git commit -m "feat: add your feature description"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

### Commit Convention

```
feat:     New feature
fix:      Bug fix
style:    UI/styling changes
refactor: Code refactoring
data:     JSON data updates
docs:     Documentation updates
```

---

## 🐛 Known Issues

- SofaScore CDN team logos may occasionally return 404 — handled gracefully with initials fallback
- `next-themes` causes flash of unstyled content on first load — mitigated with `suppressHydrationWarning`
- Free API tier (100 req/day) may limit live score frequency on high-traffic deployments

---

## 📸 Screenshots

| Page | Preview |
|---|---|
| 🏠 Home | Dark cinematic hero with WC countdown |
| 🔴 Live Scores | Real-time multi-sport score cards |
| 📅 Schedule | 104-match calendar with timezone support |
| 🌍 Teams | 48 nations with squad and stats |
| 🏟️ Stadiums | 16 venue cards with full detail pages |
| 📰 News | Featured + trending article layout |

---

## 📄 License

```
MIT License

Copyright (c) 2026 All Sports World

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.
```

---

## 🙏 Acknowledgements

- [**FIFA**](https://fifa.com) — Official World Cup 2026 data reference
- [**SofaScore / SportAPI**](https://www.sofascore.com) — Live sports data
- [**FlagCDN**](https://flagcdn.com) — Country flag images
- [**Unsplash**](https://unsplash.com) — Stadium photography
- [**Vercel**](https://vercel.com) — Deployment platform

---

<div align="center">

**Built with ❤️ for football fans worldwide**

⚽ **All Sports World** — FIFA World Cup 2026

[🌐 Website](https://allsportsworld.vercel.app) ·
[🐛 Issues](https://github.com/yourusername/all-sports-world/issues) ·
[⭐ Star this repo](https://github.com/yourusername/all-sports-world)

</div>
```

---
