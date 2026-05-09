import Image from 'next/image';
import Link  from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Trophy, User, Star, Users } from 'lucide-react';

import teamsData   from '@/data/teams.json';
import matchesData from '@/data/matches.json';
import MatchCard   from '@/components/MatchCard';
import Badge       from '@/components/Badge';
import { toSlug }  from '@/utils/slugUtils';

// ✅ Static params generate করো
export async function generateStaticParams() {
  return teamsData.map((team) => ({
    slug: toSlug(team.name),
  }));
}

// ✅ Page metadata
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ Next.js 15: await params
  const team = teamsData.find((t) => toSlug(t.name) === slug);
  if (!team) return { title: 'Team Not Found' };
  return {
    title:       `${team.name} — All Sports World`,
    description: team.bio,
  };
}

// ✅ Main page — async + await params
export default async function TeamDetailPage({ params }) {
  const { slug } = await params; // ✅ Next.js 15: await params

  const team = teamsData.find((t) => toSlug(t.name) === slug);
  if (!team) notFound();

  const teamMatches = matchesData.filter(
    (m) =>
      m.team1.name === team.name ||
      m.team2.name === team.name
  );

  return (
    <div className="min-h-screen pt-20 pb-20">

      {/* ── Hero Banner ── */}
      <div className="relative h-64 sm:h-80 overflow-hidden">

        {/* Blurred flag bg */}
        <div className="absolute inset-0">
          <Image
            src={team.flag}
            alt={team.name}
            fill
            className="object-cover blur-2xl scale-110 opacity-20"
            unoptimized
          />
        </div>

        {/* Color overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: team.color }}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b
                        from-bgPrimary/60 via-transparent to-bgPrimary" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <Link
            href="/teams"
            className="flex items-center gap-2 text-sm text-textSecondary
                       hover:text-white glass px-4 py-2 rounded-full border
                       border-white/10 hover:border-white/30 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            All Teams
          </Link>
        </div>

        {/* Flag + Name */}
        <div className="absolute bottom-0 left-0 right-0
                        flex items-end gap-6 px-4 sm:px-8 pb-6 z-10">
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden
                       border-4 shadow-2xl shrink-0"
            style={{ borderColor: team.color }}
          >
            <Image
              src={team.flag}
              alt={team.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-accentGreen font-bold
                               tracking-widest uppercase bg-accentGreen/10
                               px-2 py-0.5 rounded-full border border-accentGreen/30">
                Group {team.group}
              </span>
              <Badge text={`${team.titles} ${team.titles === 1 ? 'Title' : 'Titles'}`} color="yellow" />
            </div>
            <h1 className="font-display text-4xl sm:text-6xl tracking-wider text-white">
              {team.name.toUpperCase()}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10 flex flex-col gap-10">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              icon:  Star,
              label: 'FIFA Ranking',
              value: `#${team.ranking}`,
              color: 'text-accentGreen',
              bg:    'bg-accentGreen/10',
            },
            {
              icon:  Trophy,
              label: 'World Titles',
              value: team.titles,
              color: 'text-yellow-400',
              bg:    'bg-yellow-400/10',
            },
            {
              icon:  User,
              label: 'Head Coach',
              value: team.coach,
              color: 'text-accentBlue',
              bg:    'bg-accentBlue/10',
            },
            {
              icon:  Users,
              label: 'Group',
              value: `Group ${team.group}`,
              color: 'text-white',
              bg:    'bg-white/5',
            },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div
              key={label}
              className="glass rounded-2xl p-4 flex flex-col gap-2
                         border border-white/5"
            >
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-[10px] text-textSecondary tracking-widest uppercase">
                {label}
              </p>
              <p className={`font-bold text-sm ${color} leading-tight`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="font-display text-xl tracking-wider text-accentGreen mb-3">
            ABOUT
          </h2>
          <p className="text-textSecondary text-sm leading-relaxed">{team.bio}</p>
        </div>

        {/* Key Players */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="font-display text-xl tracking-wider text-accentGreen mb-5">
            KEY PLAYERS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {team.players.map((player, i) => (
              <div
                key={player}
                className="flex items-center gap-2.5 p-3 rounded-xl
                           bg-white/5 border border-white/5
                           hover:border-accentGreen/30 transition-colors duration-200"
              >
                <span className="w-6 h-6 rounded-full bg-accentGreen/10
                                 flex items-center justify-center
                                 text-accentGreen text-[10px] font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-xs text-white font-medium truncate">
                  {player}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Matches */}
        {teamMatches.length > 0 && (
          <div>
            <h2 className="font-display text-2xl tracking-wider text-white mb-6">
              {team.name.toUpperCase()}&apos;S{' '}
              <span className="neon-text-green">MATCHES</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {teamMatches.slice(0, 6).map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Back CTA */}
        <div className="flex justify-center pt-4">
          <Link href="/teams" className="btn-secondary text-sm">
            ← Back to All Teams
          </Link>
        </div>

      </div>
    </div>
  );
}
