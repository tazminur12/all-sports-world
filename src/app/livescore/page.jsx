import LivescorePageClient from './LivescorePageClient';
import { buildOGMeta, buildTwitterMeta, SEO_CONFIG } from '@/lib/seo';

export const metadata = {
  title:       'Live Football & Cricket Scores — Today’s Fixtures',
  description: 'Real-time football and cricket live scores and today’s scheduled matches.',
  keywords: [
    'live football scores',
    'soccer live scores',
    'cricket live score',
    'live match scores',
    'football scores today',
    'World Cup 2026 live score',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/livescore` },
  openGraph:  buildOGMeta({
    title:       'Live Football & Cricket Scores',
    description: 'Football and cricket fixtures and live scores.',
    path:        '/livescore',
  }),
  twitter: buildTwitterMeta({
    title:       'Live Football & Cricket Scores',
    description: 'Football and cricket — live scores and today’s matches.',
  }),
};

export default function LiveScorePage() {
  return <LivescorePageClient />;
}
