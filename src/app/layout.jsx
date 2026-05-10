import './globals.css';
import '@/styles/swiper.css';

import { ThemeProvider }     from '@/context/ThemeContext';
import Navbar                from '@/components/Navbar';
import Footer                from '@/components/Footer';
import LiveTicker            from '@/components/LiveTicker';
import InstallPrompt         from '@/components/InstallPrompt';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { SEO_CONFIG }        from '@/lib/seo';

// ── JSON-LD Structured Data ────────────────────
const JSONLD_WEBSITE = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  name:       'All Sports World',
  url:        SEO_CONFIG.siteUrl,
  description: SEO_CONFIG.description,
  potentialAction: {
    '@type':       'SearchAction',
    target:        `${SEO_CONFIG.siteUrl}/schedule?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const JSONLD_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type':    'SportsOrganization',
  name:       'All Sports World',
  url:        SEO_CONFIG.siteUrl,
  logo:       `${SEO_CONFIG.siteUrl}/favicon-for-public/web-app-manifest-512x512.png`,
  sameAs: [
    'https://twitter.com/AllSportsWorld',
    'https://instagram.com/allsportsworld',
    'https://youtube.com/allsportsworld',
  ],
  contactPoint: {
    '@type':             'ContactPoint',
    contactType:         'customer service',
    email:               'hello@allsportsworld.com',
    availableLanguage:   'English',
  },
};

const JSONLD_SPORTS_EVENT = {
  '@context':  'https://schema.org',
  '@type':     'SportsEvent',
  name:        'FIFA World Cup 2026',
  startDate:   '2026-06-11',
  endDate:     '2026-07-19',
  location: [
    { '@type': 'Place', name: 'MetLife Stadium',   address: 'East Rutherford, New Jersey, USA' },
    { '@type': 'Place', name: 'SoFi Stadium',      address: 'Inglewood, California, USA'       },
    { '@type': 'Place', name: 'Estadio Azteca',    address: 'Mexico City, Mexico'               },
    { '@type': 'Place', name: 'AT&T Stadium',      address: 'Arlington, Texas, USA'             },
  ],
  organizer: {
    '@type': 'Organization',
    name:    'FIFA',
    url:     'https://www.fifa.com',
  },
  description: 'The 23rd FIFA World Cup, hosted across the United States, Canada, and Mexico, featuring 48 nations competing in 104 matches.',
  sport: 'Football',
  url:   SEO_CONFIG.siteUrl,
};

// ── Root Metadata ──────────────────────────────
export const metadata = {
  // ── Basic ──────────────────────────────────
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: {
    default:  SEO_CONFIG.title,
    template: '%s | All Sports World',
  },
  description: SEO_CONFIG.description,
  keywords:    SEO_CONFIG.keywords,

  // ── Authors & Publisher ─────────────────────
  authors:   [{ name: 'All Sports World', url: SEO_CONFIG.siteUrl }],
  creator:   'All Sports World',
  publisher: 'All Sports World',

  // ── Canonical ──────────────────────────────
  alternates: {
    canonical: SEO_CONFIG.siteUrl,
    languages: {
      'en-US': SEO_CONFIG.siteUrl,
    },
  },

  // ── Open Graph ─────────────────────────────
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         SEO_CONFIG.siteUrl,
    siteName:    SEO_CONFIG.siteName,
    title:       SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: [
      {
        url:    `${SEO_CONFIG.siteUrl}/images/og-image.png`,
        width:  1200,
        height: 630,
        alt:    'All Sports World — FIFA World Cup 2026',
        type:   'image/png',
      },
      {
        url:    `${SEO_CONFIG.siteUrl}/images/og-square.png`,
        width:  600,
        height: 600,
        alt:    'All Sports World',
        type:   'image/png',
      },
    ],
  },

  // ── Twitter / X ────────────────────────────
  twitter: {
    card:        'summary_large_image',
    site:        '@AllSportsWorld',
    creator:     '@AllSportsWorld',
    title:       SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images:      [`${SEO_CONFIG.siteUrl}/images/og-image.png`],
  },

  // ── Robots ─────────────────────────────────
  robots: {
    index:              true,
    follow:             true,
    nocache:            false,
    googleBot: {
      index:                   true,
      follow:                  true,
      noimageindex:            false,
      'max-video-preview':     -1,
      'max-image-preview':     'large',
      'max-snippet':           -1,
    },
  },

  // ── Icons: public/favicon-for-app (UI) + public/favicon-for-public (PWA PNGs) ──
  icons: {
    icon: [
      { url: '/favicon-for-app/icon0.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon-for-app/icon1.png', sizes: '96x96', type: 'image/png' },
      {
        url:    '/favicon-for-public/web-app-manifest-192x192.png',
        sizes:  '192x192',
        type:   'image/png',
      },
      {
        url:    '/favicon-for-public/web-app-manifest-512x512.png',
        sizes:  '512x512',
        type:   'image/png',
      },
    ],
    apple: [{ url: '/favicon-for-app/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon-for-app/favicon.ico',
  },

  // ── PWA Manifest ───────────────────────────
  manifest: '/manifest.json',

  // ── Verification ───────────────────────────
  verification: {
    google: 'your-google-search-console-verification-code',
    // yandex: 'your-yandex-code',
    // bing:   'your-bing-code',
  },

  // ── App specific ───────────────────────────
  appleWebApp: {
    capable:        true,
    statusBarStyle: 'black-translucent',
    title:          'All Sports World',
  },

  // ── Format detection ───────────────────────
  formatDetection: {
    email:     false,
    address:   false,
    telephone: false,
  },

  // ── Category ───────────────────────────────
  category: 'sports',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* ── PWA & Mobile ── */}
        <meta name="apple-mobile-web-app-capable"          content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title"            content="All Sports World" />
        <meta name="mobile-web-app-capable"                content="yes" />
        <meta name="theme-color"                           content="#07111F" />
        <meta name="msapplication-TileColor"               content="#07111F" />
        <meta name="msapplication-TileImage"               content="/favicon-for-public/web-app-manifest-192x192.png" />

        {/* ── Geo targeting ── */}
        <meta name="geo.region"      content="US" />
        <meta name="geo.placename"   content="United States" />
        <meta name="ICBM"            content="37.0902, -95.7129" />

        {/* ── Language ── */}
        <meta httpEquiv="content-language" content="en-us" />
        <link rel="alternate" hrefLang="en" href={SEO_CONFIG.siteUrl} />

        {/* ── Icons (same dirs as metadata.icons) ── */}
        <link rel="icon"             href="/favicon-for-app/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon-for-app/apple-icon.png" />
        <link rel="manifest"         href="/manifest.json" />

        {/* ── Preconnect for speed ── */}
        <link rel="preconnect"    href="https://fonts.googleapis.com" />
        <link rel="preconnect"    href="https://fonts.gstatic.com"    crossOrigin="anonymous" />
        <link rel="preconnect"    href="https://flagcdn.com" />
        <link rel="preconnect"    href="https://images.unsplash.com" />
        <link rel="dns-prefetch"  href="https://img.sofascore.com" />

        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_WEBSITE) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_ORGANIZATION) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_SPORTS_EVENT) }}
        />
      </head>

      <body className="bg-bgPrimary text-textWhite antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ServiceWorkerRegister />
          <Navbar />
          <LiveTicker />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <InstallPrompt />
        </ThemeProvider>
      </body>
    </html>
  );
}
