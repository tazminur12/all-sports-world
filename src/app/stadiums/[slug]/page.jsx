import Image from 'next/image';
import Link  from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Users, Calendar, Layers, Star } from 'lucide-react';

import stadiumsData from '@/data/stadiums.json';
import matchesData  from '@/data/matches.json';
import MatchCard    from '@/components/MatchCard';
import Badge        from '@/components/Badge';
import { toSlug }   from '@/utils/slugUtils';
import { formatCapacity } from '@/utils/formatUtils';
import { buildOGMeta, buildTwitterMeta, SEO_CONFIG } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug }   = await params;
  const stadium    = stadiumsData.find((s) => toSlug(s.name) === slug);
  if (!stadium) return { title: 'Stadium Not Found' };

  const title       = `${stadium.name} — FIFA World Cup 2026 Venue | ${stadium.city}`;
  const description = `${stadium.name} in ${stadium.city}, ${stadium.country}. Capacity: ${stadium.capacity.toLocaleString()} seats. Hosting ${stadium.matches} World Cup 2026 matches. ${stadium.highlight}.`;

  return {
    title,
    description,
    keywords: [
      `${stadium.name} World Cup 2026`,
      `${stadium.name} capacity`,
      `World Cup 2026 ${stadium.city}`,
      `${stadium.city} FIFA World Cup`,
      `${stadium.country} World Cup venue 2026`,
      stadium.highlight,
    ],
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}/stadiums/${slug}`,
    },
    openGraph: buildOGMeta({
      title,
      description,
      image: stadium.image,
      path:  `/stadiums/${slug}`,
    }),
    twitter: buildTwitterMeta({ title, description }),
  };
}


// ✅ Static params
export async function generateStaticParams() {
  return stadiumsData.map((s) => ({
    slug: toSlug(s.name),
  }));
}

// ✅ Main Page — async + await params
export default async function StadiumDetailPage({ params }) {
  const { slug } = await params; // ✅ Next.js 15

  const stadium = stadiumsData.find((s) => toSlug(s.name) === slug);
  if (!stadium) notFound();

  const stadiumMatches = matchesData.filter(
    (m) => m.stadium === stadium.name
  );

  return (
    <div className="min-h-screen pt-20 pb-20">

      {/* ── Hero Image ── */}
      <div className="relative h-72 sm:h-[420px] overflow-hidden">
        <Image
          src={stadium.image}
          alt={stadium.name}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b
                        from-bgPrimary/50 via-transparent to-bgPrimary" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            href="/stadiums"
            className="flex items-center gap-2 text-sm text-textSecondary
                       hover:text-white glass px-4 py-2 rounded-full border
                       border-white/10 hover:border-white/30 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            All Stadiums
          </Link>
        </div>

        {/* Highlight badge */}
        <div className="absolute top-6 right-4 sm:right-8 z-10">
          <Badge text={stadium.highlight} color="green" />
        </div>

        {/* Stadium name bottom */}
        <div className="absolute bottom-0 left-0 right-0
                        px-4 sm:px-8 pb-6 z-10">
          <p className="text-xs text-accentGreen font-bold tracking-widest
                        uppercase mb-2">
            {stadium.country} · {stadium.state}
          </p>
          <h1 className="font-display text-4xl sm:text-6xl tracking-wider text-white">
            {stadium.name.toUpperCase()}
          </h1>
          <div className="flex items-center gap-1.5 text-textSecondary text-sm mt-2">
            <MapPin className="w-4 h-4 text-accentBlue" />
            <span>{stadium.city}, {stadium.state}, {stadium.country}</span>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10 flex flex-col gap-10">

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              icon:  Users,
              label: 'Capacity',
              value: formatCapacity(stadium.capacity),
              color: 'text-accentGreen',
              bg:    'bg-accentGreen/10',
            },
            {
              icon:  Calendar,
              label: 'Year Opened',
              value: stadium.opened,
              color: 'text-accentBlue',
              bg:    'bg-accentBlue/10',
            },
            {
              icon:  Layers,
              label: 'Surface',
              value: stadium.surface,
              color: 'text-white',
              bg:    'bg-white/5',
            },
            {
              icon:  Star,
              label: 'WC Matches',
              value: `${stadium.matches} Matches`,
              color: 'text-yellow-400',
              bg:    'bg-yellow-400/10',
            },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div
              key={label}
              className="glass rounded-2xl p-4 flex flex-col gap-2
                         border border-white/5 hover:border-accentGreen/20
                         transition-colors duration-300"
            >
              <div className={`w-8 h-8 rounded-lg ${bg}
                              flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-[10px] text-textSecondary tracking-widest uppercase">
                {label}
              </p>
              <p className={`font-bold text-sm ${color} leading-tight`}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* ── About ── */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="font-display text-xl tracking-wider text-accentGreen mb-3">
            ABOUT THE VENUE
          </h2>
          <p className="text-textSecondary text-sm leading-relaxed">
            {stadium.name} is located in {stadium.city}, {stadium.state},{' '}
            {stadium.country}. With a capacity of{' '}
            {formatCapacity(stadium.capacity)} seats, it is one of the premier
            venues for FIFA World Cup 2026. The stadium opened in {stadium.opened}{' '}
            and features a {stadium.surface.toLowerCase()} playing surface.
            It will host {stadium.matches} World Cup matches, making it one of
            the most important venues in the tournament.
          </p>
        </div>

        {/* ── Map Placeholder ── */}
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center
                          justify-between">
            <h2 className="font-display text-xl tracking-wider text-accentGreen">
              LOCATION
            </h2>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                stadium.name + ' ' + stadium.city
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accentBlue hover:underline
                         flex items-center gap-1"
            >
              Open in Maps →
            </a>
          </div>
          <div className="h-48 bg-bgCard flex flex-col items-center
                          justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-accentGreen/10
                            border border-accentGreen/20
                            flex items-center justify-center">
              <MapPin className="w-7 h-7 text-accentGreen/60" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-white">
                {stadium.name}
              </p>
              <p className="text-xs text-textSecondary mt-0.5">
                {stadium.city}, {stadium.state}, {stadium.country}
              </p>
            </div>
          </div>
        </div>

        {/* ── Hosted Matches ── */}
        {stadiumMatches.length > 0 ? (
          <div>
            <h2 className="font-display text-2xl tracking-wider text-white mb-6">
              HOSTED{' '}
              <span className="neon-text-green">MATCHES</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {stadiumMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl border border-white/5 p-8
                          text-center text-textSecondary">
            <p className="text-3xl mb-3">🏟️</p>
            <p className="text-sm">
              Match schedule for this venue will be confirmed soon.
            </p>
          </div>
        )}

        {/* ── Back CTA ── */}
        <div className="flex justify-center pt-4">
          <Link href="/stadiums" className="btn-secondary text-sm">
            ← Back to All Stadiums
          </Link>
        </div>

      </div>
    </div>
  );
}
