import HeroSection            from '@/sections/HeroSection';
import UpcomingMatchesSection from '@/sections/UpcomingMatchesSection';
import FeaturedTeamsSection   from '@/sections/FeaturedTeamsSection';
import TrendingNewsSection    from '@/sections/TrendingNewsSection';
import StadiumShowcaseSection from '@/sections/StadiumShowcaseSection';
import GroupStandingsSection  from '@/sections/GroupStandingsSection';
import ReelsSection           from '@/sections/ReelsSection';
import PredictionSection      from '@/sections/PredictionSection';
import NewsletterSection      from '@/sections/NewsletterSection';
import { SEO_CONFIG }         from '@/lib/seo';

export const metadata = {
  title:       'All Sports World — FIFA World Cup 2026 Schedule, Teams & Live Scores',
  description: 'Your #1 destination for FIFA World Cup 2026. Live scores, full match schedule, all 48 teams, 16 stadiums, and breaking news. USA · Canada · Mexico.',
  keywords: [
    'FIFA World Cup 2026',
    'World Cup 2026 schedule',
    'World Cup 2026 live score',
    'World Cup 2026 teams',
    'football live scores',
    'sports scores today',
  ],
  alternates: { canonical: SEO_CONFIG.siteUrl },
};

// Home page JSON-LD
const JSONLD_FAQ = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type':          'Question',
      name:             'When does FIFA World Cup 2026 start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'FIFA World Cup 2026 starts on June 11, 2026, with the opening match at MetLife Stadium in East Rutherford, New Jersey, USA.',
      },
    },
    {
      '@type':          'Question',
      name:             'Where is the World Cup 2026 Final?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'The FIFA World Cup 2026 Final will be held at MetLife Stadium in East Rutherford, New Jersey, USA on July 19, 2026.',
      },
    },
    {
      '@type':          'Question',
      name:             'How many teams are in World Cup 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'FIFA World Cup 2026 features 48 teams for the first time, up from 32 teams in previous editions.',
      },
    },
    {
      '@type':          'Question',
      name:             'Which countries are hosting the 2026 World Cup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'The 2026 FIFA World Cup is co-hosted by the United States, Canada, and Mexico, with 16 stadiums across all three nations.',
      },
    },
    {
      '@type':          'Question',
      name:             'How many matches are in World Cup 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'FIFA World Cup 2026 will feature 104 matches in total, including 72 group stage matches and 32 knockout round matches.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* FAQ Schema for Google Featured Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD_FAQ) }}
      />

      <HeroSection />
      <UpcomingMatchesSection />
      <FeaturedTeamsSection />
      <TrendingNewsSection />
      <StadiumShowcaseSection />
      <GroupStandingsSection />
      <ReelsSection />
      <PredictionSection />
      <NewsletterSection />
    </>
  );
}
