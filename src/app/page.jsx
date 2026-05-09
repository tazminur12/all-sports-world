import HeroSection            from '@/sections/HeroSection';
import UpcomingMatchesSection from '@/sections/UpcomingMatchesSection';
import FeaturedTeamsSection   from '@/sections/FeaturedTeamsSection';
import TrendingNewsSection    from '@/sections/TrendingNewsSection';
import StadiumShowcaseSection from '@/sections/StadiumShowcaseSection';
import GroupStandingsSection  from '@/sections/GroupStandingsSection';
import ReelsSection           from '@/sections/ReelsSection';
import PredictionSection      from '@/sections/PredictionSection';
import NewsletterSection      from '@/sections/NewsletterSection';

export default function HomePage() {
  return (
    <>
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
