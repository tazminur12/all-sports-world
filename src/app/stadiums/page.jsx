import StadiumsPageClient from './StadiumsPageClient';
import { buildOGMeta, buildTwitterMeta, SEO_CONFIG } from '@/lib/seo';

export const metadata = {
  title:       'FIFA World Cup 2026 Stadiums — 16 Official Venues in USA, Canada & Mexico',
  description: 'Explore all 16 official FIFA World Cup 2026 stadiums. MetLife Stadium (Final venue), SoFi Stadium, Estadio Azteca, and more. Capacity, location, and match schedules.',
  keywords: [
    'World Cup 2026 stadiums',
    'World Cup 2026 venues',
    'MetLife Stadium World Cup',
    'SoFi Stadium World Cup',
    'Estadio Azteca World Cup 2026',
    'World Cup Final venue 2026',
    'FIFA 2026 host cities',
  ],
  alternates: { canonical: `${SEO_CONFIG.siteUrl}/stadiums` },
  openGraph:  buildOGMeta({
    title:       'FIFA World Cup 2026 Stadiums — 16 Official Venues',
    description: '16 iconic venues across USA, Canada and Mexico hosting the World Cup.',
    path:        '/stadiums',
  }),
  twitter: buildTwitterMeta({
    title:       'FIFA World Cup 2026 Stadiums',
    description: '16 official venues. MetLife Stadium hosts the Final on July 19, 2026.',
  }),
};

export default function StadiumsPage() {
  return <StadiumsPageClient />;
}
