// ── Site-wide SEO config ───────────────────────
export const SEO_CONFIG = {
    siteName:    'All Sports World',
    siteUrl:     'https://allsportsworld.vercel.app',
    title:       'All Sports World — FIFA World Cup 2026 Schedule, Teams & Live Scores',
    description: 'Complete FIFA World Cup 2026 schedule, live scores, team squads, stadium guide and match results. All 104 matches across USA, Canada and Mexico.',
    keywords: [
      // High-volume World Cup keywords
      'FIFA World Cup 2026',
      'World Cup 2026 schedule',
      'World Cup 2026 fixtures',
      'World Cup 2026 matches',
      'World Cup 2026 groups',
      'World Cup 2026 teams',
      'World Cup 2026 live score',
      'World Cup 2026 results',
      'World Cup 2026 standings',
      'World Cup 2026 USA',
      'World Cup 2026 Canada',
      'World Cup 2026 Mexico',
  
      // Match-specific
      'Argentina vs France 2026',
      'Brazil vs England 2026',
      'Germany vs Spain 2026',
      'World Cup Final 2026',
      'World Cup 2026 MetLife Stadium',
  
      // General football
      'football live scores',
      'soccer live scores today',
      'live football results',
      'football match today',
      'World Cup tickets 2026',
      'World Cup 2026 squads',
      'World Cup 2026 predictions',
  
      // Multi-sport
      'live sports scores',
      'sports scores today',
      'all sports live',
    ],
    twitterHandle: '@AllSportsWorld',
    locale:        'en_US',
    type:          'website',
  };
  
  // ── Build full page title ──────────────────────
  export function buildTitle(pageTitle) {
    if (!pageTitle) return SEO_CONFIG.title;
    return `${pageTitle} | All Sports World`;
  }
  
  // ── Build canonical URL ────────────────────────
  export function buildCanonical(path = '') {
    return `${SEO_CONFIG.siteUrl}${path}`;
  }
  
  // ── Build Open Graph metadata ──────────────────
  export function buildOGMeta({
    title,
    description,
    image,
    path = '',
    type = 'website',
  }) {
    return {
      title:       title       || SEO_CONFIG.title,
      description: description || SEO_CONFIG.description,
      url:         buildCanonical(path),
      siteName:    SEO_CONFIG.siteName,
      locale:      SEO_CONFIG.locale,
      type,
      images: [
        {
          url:    image || `${SEO_CONFIG.siteUrl}/images/og-image.png`,
          width:  1200,
          height: 630,
          alt:    title || SEO_CONFIG.title,
        },
      ],
    };
  }
  
  // ── Build Twitter metadata ─────────────────────
  export function buildTwitterMeta({ title, description, image }) {
    return {
      card:        'summary_large_image',
      site:        SEO_CONFIG.twitterHandle,
      creator:     SEO_CONFIG.twitterHandle,
      title:       title       || SEO_CONFIG.title,
      description: description || SEO_CONFIG.description,
      images:      [image || `${SEO_CONFIG.siteUrl}/images/og-image.png`],
    };
  }
  