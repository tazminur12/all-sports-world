import TeamsPageClient from './TeamsPageClient';
import { buildOGMeta, buildTwitterMeta, SEO_CONFIG } from '@/lib/seo';

export const metadata = {
  title:       'FIFA World Cup 2026 Teams — All 48 Qualified Nations',
  description: 'Explore all 48 FIFA World Cup 2026 teams. Full squad lists, FIFA rankings, coaches, group allocations, and World Cup history for every nation.',
  keywords: [
    'World Cup 2026 teams',
    'World Cup 2026 squads',
    '48 teams World Cup 2026',
    'World Cup 2026 groups',
    'Argentina World Cup 2026',
    'Brazil World Cup 2026',
    'France World Cup 2026',
    'England World Cup 2026',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/teams` },
  openGraph:  buildOGMeta({
    title:       'All 48 FIFA World Cup 2026 Teams',
    description: 'Full squads, rankings, and group details for every nation in 2026.',
    path:        '/teams',
  }),
  twitter: buildTwitterMeta({
    title:       'FIFA World Cup 2026 — All 48 Nations',
    description: 'Squads, coaches, and rankings for every World Cup 2026 team.',
  }),
};

export default function TeamsPage() {
  return <TeamsPageClient />;
}
