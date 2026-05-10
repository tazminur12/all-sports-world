import NewsPageClient from './NewsPageClient';
import { buildOGMeta, buildTwitterMeta, SEO_CONFIG } from '@/lib/seo';

export const metadata = {
  title:       'FIFA World Cup 2026 News — Latest Updates, Analysis & Features',
  description: 'Latest FIFA World Cup 2026 news, match previews, player spotlights, and tactical analysis. Breaking news from Argentina, Brazil, France, England and all 48 nations.',
  keywords: [
    'World Cup 2026 news',
    'FIFA World Cup latest news',
    'World Cup 2026 updates',
    'football news 2026',
    'Messi World Cup 2026',
    'Mbappe World Cup 2026',
    'World Cup 2026 analysis',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/news` },
  openGraph:  buildOGMeta({
    title:       'FIFA World Cup 2026 News & Analysis',
    description: 'Latest updates, player news, and in-depth analysis from World Cup 2026.',
    path:        '/news',
    type:        'website',
  }),
  twitter: buildTwitterMeta({
    title:       'World Cup 2026 News',
    description: 'Breaking news, previews, and analysis from FIFA World Cup 2026.',
  }),
};

export default function NewsPage() {
  return <NewsPageClient />;
}
