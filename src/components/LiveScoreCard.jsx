'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLocalTime } from '@/hooks/useLocalTime';

// ── Team Logo with fallback ────────────────────
function TeamLogo({ team }) {
  const [imgError, setImgError] = useState(false);

  if (team.logo && !imgError) {
    return (
      <div className="relative w-9 h-9 rounded-full overflow-hidden
                      border border-white/10 bg-white/5 shrink-0">
        <Image
          src={team.logo}
          alt={team.name}
          fill
          className="object-contain p-1"
          unoptimized
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback: initials
  return (
    <div className="w-9 h-9 rounded-full border border-white/10
                    bg-accentGreen/10 flex items-center justify-center shrink-0">
      <span className="text-[10px] font-bold text-accentGreen">
        {(team.short || team.name).slice(0, 3).toUpperCase()}
      </span>
    </div>
  );
}

// ── League Logo with fallback ──────────────────
function LeagueLogo({ match }) {
  const [imgError, setImgError] = useState(false);

  if (match.leagueImage && !imgError) {
    return (
      <div className="relative w-5 h-5 shrink-0">
        <Image
          src={match.leagueImage}
          alt={match.league}
          fill
          className="object-contain"
          unoptimized
          onError={() => setImgError(true)}
        />
      </div>
    );
  }
  return (
    <span className="text-sm leading-none shrink-0">
      {match.leagueLogo || '🏆'}
    </span>
  );
}

// ── Status Badge ──────────────────────────────
function StatusBadge({ match }) {
  if (match.status === 'live') {
    const label = match.sport === 'Football'
      ? `${match.minute || 0}'`
      : match.period || 'LIVE';

    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full
                      bg-red-500/15 border border-red-500/30 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-bold text-red-400 tracking-wide whitespace-nowrap">
          {label}
        </span>
      </div>
    );
  }

  if (match.status === 'upcoming') {
    return (
      <div className="px-2.5 py-1 rounded-full bg-accentBlue/10
                      border border-accentBlue/30 shrink-0">
        <span className="text-[10px] font-bold text-accentBlue tracking-wide">
          SOON
        </span>
      </div>
    );
  }

  return (
    <div className="px-2.5 py-1 rounded-full bg-white/5
                    border border-white/10 shrink-0">
      <span className="text-[10px] font-bold text-textSecondary tracking-wide">
        FT
      </span>
    </div>
  );
}

// ── Score Box ─────────────────────────────────
function ScoreBox({ match }) {
  const { timeStr } = useLocalTime(match.kickoff || '');

  if (match.status === 'upcoming') {
    return (
      <div className="flex flex-col items-center min-w-[56px]">
        <span className="text-xs font-bold text-white">
          {timeStr || '--:--'}
        </span>
        <span className="text-[10px] text-accentBlue mt-0.5">vs</span>
      </div>
    );
  }

  // Tennis/Cricket — string scores
  if (typeof match.team1.score === 'string' ||
      typeof match.team2.score === 'string') {
    return (
      <div className="flex flex-col items-center min-w-[80px]">
        <div className="text-xs font-bold text-accentGreen text-center whitespace-nowrap">
          {match.team1.score ?? '-'}
        </div>
        <div className="text-white/20 text-xs">vs</div>
        <div className="text-xs font-bold text-white text-center whitespace-nowrap">
          {match.team2.score ?? '-'}
        </div>
      </div>
    );
  }

  // Numeric score
  return (
    <div className="flex items-center gap-1.5 min-w-[64px] justify-center">
      <motion.span
        key={`${match.id}-h-${match.team1.score}`}
        initial={{ scale: 1.4, color: '#00FF85' }}
        animate={{ scale: 1,   color: '#FFFFFF'  }}
        transition={{ duration: 0.4 }}
        className="font-display text-2xl leading-none"
      >
        {match.team1.score ?? 0}
      </motion.span>
      <span className="text-textSecondary font-bold text-lg leading-none">-</span>
      <motion.span
        key={`${match.id}-a-${match.team2.score}`}
        initial={{ scale: 1.4, color: '#00FF85' }}
        animate={{ scale: 1,   color: '#FFFFFF'  }}
        transition={{ duration: 0.4 }}
        className="font-display text-2xl leading-none"
      >
        {match.team2.score ?? 0}
      </motion.span>
    </div>
  );
}

// ── Goal Events ───────────────────────────────
function MatchEvents({ events, teamNum }) {
  const goals = (events || [])
    .filter((e) => e.team === teamNum && e.type === 'goal')
    .slice(-2);

  if (!goals.length) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {goals.map((e, i) => (
        <span key={i} className="text-[9px] text-textSecondary/70 whitespace-nowrap">
          ⚽ {e.minute}&apos; {e.player?.split(' ').at(-1)}
        </span>
      ))}
    </div>
  );
}

// ── Main Card ─────────────────────────────────
export default function LiveScoreCard({ match, index = 0 }) {
  const isLive = match.status === 'live';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0  }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`rounded-2xl border overflow-hidden transition-all duration-300
                  ${isLive
                    ? 'glass border-red-500/20 hover:border-red-500/40'
                    : 'glass border-white/5 hover:border-accentGreen/20'
                  }`}
    >
      {/* Live indicator bar */}
      {isLive && (
        <div className="h-0.5 bg-gradient-to-r from-transparent
                        via-red-500 to-transparent animate-pulse" />
      )}

      <div className="p-4">

        {/* League row */}
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <LeagueLogo match={match} />
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-textSecondary
                             tracking-wider uppercase truncate">
                {match.league}
              </p>
              {match.category && (
                <p className="text-[9px] text-textSecondary/50 truncate">
                  {match.category}
                </p>
              )}
            </div>
          </div>
          <StatusBadge match={match} />
        </div>

        {/* Teams + Score */}
        <div className="flex items-center gap-2">

          {/* Home team */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <TeamLogo team={match.team1} />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {match.team1.name}
              </p>
              {match.events?.length > 0 && (
                <MatchEvents events={match.events} teamNum={1} />
              )}
            </div>
          </div>

          {/* Score */}
          <ScoreBox match={match} />

          {/* Away team */}
          <div className="flex items-center gap-2 flex-1 min-w-0 flex-row-reverse">
            <TeamLogo team={match.team2} />
            <div className="min-w-0 text-right">
              <p className="text-sm font-bold text-white truncate">
                {match.team2.name}
              </p>
              {match.events?.length > 0 && (
                <div className="flex justify-end">
                  <MatchEvents events={match.events} teamNum={2} />
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Venue */}
        <div className="flex items-center gap-1 mt-3 text-[10px]
                        text-textSecondary/50">
          <MapPin className="w-2.5 h-2.5 shrink-0" />
          <span className="truncate">{match.venue}</span>
        </div>

      </div>
    </motion.div>
  );
}
