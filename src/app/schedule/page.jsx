import SchedulePageClient from './SchedulePageClient';
import { buildOGMeta, buildTwitterMeta, SEO_CONFIG } from '@/lib/seo';

export const metadata = {
  title:       'FIFA World Cup 2026 Schedule — All 104 Matches & Fixtures',
  description: 'Complete FIFA World Cup 2026 match schedule. View all 104 fixtures from Group Stage to the Final at MetLife Stadium. Local timezone support.',
  keywords: [
    'World Cup 2026 schedule',
    'World Cup 2026 fixtures',
    'World Cup 2026 match dates',
    'World Cup 2026 groups',
    'FIFA 2026 calendar',
    'World Cup 2026 kickoff times',
    'football schedule 2026',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/schedule` },
  openGraph:  buildOGMeta({
    title:       'FIFA World Cup 2026 Schedule — All 104 Matches',
    description: 'Complete fixture list for FIFA World Cup 2026. Group Stage to Final.',
    path:        '/schedule',
  }),
  twitter: buildTwitterMeta({
    title:       'FIFA World Cup 2026 Schedule',
    description: 'All 104 matches — Group Stage through to the Final at MetLife Stadium.',
  }),
};

export default function SchedulePage() {
  return <SchedulePageClient />;
}
