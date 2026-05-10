'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, AlertCircle, Wifi, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

import LiveScoreCard  from '@/components/LiveScoreCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useLiveScores } from '@/hooks/useLiveScores';
import { ALL_SPORTS, SPORT_CATEGORIES } from '../../config/sports';

/** Must match `DEFAULT_SPORTS` in `src/app/api/livescore/all/route.js` */
const LIVESCORE_SLUGS = new Set(['football', 'cricket']);
const LIVESCORE_SPORTS = ALL_SPORTS.filter((s) => LIVESCORE_SLUGS.has(s.slug));

const STATUSES = ['All', 'Live', 'Upcoming', 'Finished'];

function groupByLeague(matches) {
  return matches.reduce((acc, m) => {
    const key = `${m.sport}__${m.league}`;
    if (!acc[key]) {
      acc[key] = {
        sport:       m.sport,
        league:      m.league,
        leagueLogo:  m.leagueLogo,
        leagueImage: m.leagueImage,
        matches:     [],
      };
    }
    acc[key].matches.push(m);
    return acc;
  }, {});
}

// ── Sport Selector Modal ───────────────────────
function SportSelector({ activeSport, onChange }) {
  const [open, setOpen] = useState(false);

  const currentSport = LIVESCORE_SPORTS.find((s) => s.label === activeSport);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 glass border border-white/10
                   px-4 py-2 rounded-full text-sm text-white
                   hover:border-accentGreen/40 transition-all duration-200"
      >
        <span>{currentSport?.emoji || '🌍'}</span>
        <span className="font-medium">{activeSport}</span>
        <ChevronDown className={`w-4 h-4 text-textSecondary transition-transform
                                 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1  }}
            exit={{   opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 z-50 glass-dark border
                       border-white/10 rounded-2xl overflow-hidden shadow-card
                       min-w-[280px]"
          >
            {/* All Sports option */}
            <button
              onClick={() => { onChange('All Sports'); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm
                          text-left hover:bg-white/5 transition-colors duration-150
                          ${activeSport === 'All Sports'
                            ? 'text-accentGreen bg-accentGreen/5'
                            : 'text-textSecondary'
                          }`}
            >
              <span className="text-lg">🌍</span>
              <span className="font-medium">All Sports</span>
            </button>

            <div className="border-t border-white/5" />

            {/* Group by category */}
            {SPORT_CATEGORIES.slice(1).map((cat) => {
              const sportsInCat = LIVESCORE_SPORTS.filter((s) => s.category === cat);
              if (!sportsInCat.length) return null;

              return (
                <div key={cat}>
                  <div className="px-4 py-2 text-[10px] font-bold text-textSecondary/50
                                  tracking-widest uppercase bg-white/2">
                    {cat}
                  </div>
                  {sportsInCat.map((sport) => (
                    <button
                      key={sport.slug}
                      onClick={() => { onChange(sport.label); setOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm
                                  text-left hover:bg-white/5 transition-colors duration-150
                                  ${activeSport === sport.label
                                    ? 'text-accentGreen bg-accentGreen/5'
                                    : 'text-textSecondary hover:text-white'
                                  }`}
                    >
                      <span className="text-base w-6 text-center">{sport.emoji}</span>
                      <span className="font-medium">{sport.label}</span>
                    </button>
                  ))}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────
export default function LivescorePageClient() {
  const [activeSport,  setActiveSport]  = useState('All Sports');
  const [activeStatus, setActiveStatus] = useState('All');

  const {
    scores, loading, error,
    lastUpdate, isUpdating, usingMock, rateLimitSample,
    liveCount, upcomingCount, finishedCount,
    refresh,
  } = useLiveScores();

  const filtered = useMemo(() => {
    let result = scores;

    // Sport filter
    if (activeSport !== 'All Sports') {
      result = result.filter((s) => s.sport === activeSport);
    }

    // Status filter
    const statusMap = {
      Live:     'live',
      Upcoming: 'upcoming',
      Finished: 'finished',
    };
    if (activeStatus !== 'All') {
      result = result.filter((s) => s.status === statusMap[activeStatus]);
    }

    // Sort: live → upcoming → finished
    return result.sort((a, b) => {
      const order = { live: 0, upcoming: 1, finished: 2 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });
  }, [scores, activeSport, activeStatus]);

  const grouped = groupByLeague(filtered);

  // Available sports in current data
  const activeSports = useMemo(() => {
    const sportSet = new Set(scores.map((s) => s.sport));
    return LIVESCORE_SPORTS.filter((s) => sportSet.has(s.label));
  }, [scores]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center
                      justify-center gap-6">
        <LoadingSpinner size="lg" />
        <p className="text-textSecondary text-sm animate-pulse">
          Fetching football &amp; cricket scores...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold tracking-[0.3em] text-red-400 uppercase">
            Real-Time · Football &amp; Cricket
          </span>
        </div>
        <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-white">
          LIVE{' '}
          <span className="text-red-400"
                style={{ textShadow: '0 0 20px rgba(239,68,68,0.5)' }}>
            SCORES
          </span>
        </h1>
        <p className="text-textSecondary text-sm mt-3">
          Live fixtures and scores — football &amp; cricket only (RapidAPI-friendly).
        </p>

        {/* Connection status */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {usingMock ? (
            rateLimitSample ? (
              <span className="flex items-center gap-1.5 text-xs text-amber-400 max-w-md mx-auto text-center">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                RapidAPI returned 429 (quota). Sample football &amp; cricket rows below until the feed works again.
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-yellow-400">
                <AlertCircle className="w-3.5 h-3.5" />
                Demo data — Add API key for live scores
              </span>
            )
          ) : scores.length === 0 ? (
            <span className="flex items-center gap-1.5 text-xs text-textSecondary">
              <Wifi className="w-3.5 h-3.5 text-accentGreen" />
              Football &amp; cricket feed — no matches in this view yet. Try Refresh or widen filters.
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-accentGreen">
              <Wifi className="w-3.5 h-3.5" />
              Live updates · {scores.length} {scores.length === 1 ? 'match' : 'matches'}
              {activeSports.length > 0 && (
                <> · {activeSports.length} {activeSports.length === 1 ? 'sport' : 'sports'}</>
              )}
            </span>
          )}
        </div>
      </motion.div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { value: liveCount,     label: 'Live Now',  color: 'text-red-400',       dot: 'bg-red-500 animate-pulse' },
          { value: upcomingCount, label: 'Upcoming',  color: 'text-accentBlue',    dot: 'bg-accentBlue'            },
          { value: finishedCount, label: 'Finished',  color: 'text-textSecondary', dot: 'bg-textSecondary'         },
        ].map(({ value, label, color, dot }) => (
          <div key={label}
               className="glass rounded-2xl p-4 text-center border border-white/5">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              <span className={`font-display text-2xl ${color}`}>{value}</span>
            </div>
            <p className="text-[10px] text-textSecondary tracking-widest uppercase">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

        <div className="flex flex-wrap items-center gap-3">
          {/* Sport selector dropdown */}
          <SportSelector
            activeSport={activeSport}
            onChange={setActiveSport}
          />

          {/* Status tabs */}
          <div className="flex items-center gap-1.5">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold
                            transition-all duration-200 border
                            ${activeStatus === s
                              ? 'bg-accentGreen text-bgPrimary border-accentGreen'
                              : 'glass border-white/10 text-textSecondary hover:text-white'
                            }`}
              >
                {s === 'Live' && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full
                                   bg-red-500 animate-pulse mr-1" />
                )}
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Refresh */}
        <div className="flex items-center gap-3">
          {lastUpdate && (
            <span className="text-xs text-textSecondary hidden sm:block">
              {format(lastUpdate, 'HH:mm:ss')}
            </span>
          )}
          <button
            onClick={refresh}
            disabled={isUpdating}
            className="flex items-center gap-1.5 glass border border-white/10
                       px-3 py-2 rounded-full text-xs text-textSecondary
                       hover:text-accentGreen hover:border-accentGreen/30
                       transition-all duration-200 disabled:opacity-40"
          >
            <RefreshCw className={`w-3 h-3 ${isUpdating ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Active Sports Pills ── */}
      {activeSports.length > 0 && activeSport === 'All Sports' && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeSports.map((sport) => {
            const count = scores.filter((s) => s.sport === sport.label).length;
            return (
              <button
                key={sport.slug}
                onClick={() => setActiveSport(sport.label)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full
                           glass border border-white/10 text-xs text-textSecondary
                           hover:text-white hover:border-accentGreen/30
                           transition-all duration-200"
              >
                <span>{sport.emoji}</span>
                <span>{sport.label}</span>
                <span className="text-accentGreen font-bold">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Info bar ── */}
      <div className="flex items-center justify-between mb-6 text-xs text-textSecondary">
        <span>
          <span className="text-accentGreen font-bold">{filtered.length}</span>
          {' '}matches
          {activeSport !== 'All Sports' && (
            <span> in {activeSport}</span>
          )}
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full bg-accentGreen
                            ${isUpdating ? 'animate-ping' : 'animate-pulse'}`} />
          Auto-refresh 2m
        </span>
      </div>

      {/* ── Error banner ── */}
      {error && !usingMock && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass border border-yellow-400/20 rounded-2xl p-4 mb-6
                     flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-yellow-400">API Issue</p>
            <p className="text-xs text-textSecondary mt-0.5">
              Check RAPIDAPI_KEY in .env.local
            </p>
          </div>
        </motion.div>
      )}

      {/* ── Match groups ── */}
      <AnimatePresence mode="wait">
        {Object.keys(grouped).length > 0 ? (
          <motion.div
            key={`${activeSport}-${activeStatus}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            {Object.values(grouped).map(({ sport, league, leagueLogo, leagueImage, matches }) => (
              <div key={`${sport}-${league}`}>
                {/* League header */}
                <div className="flex items-center gap-3 mb-4">
                  {leagueImage ? (
                    <div className="relative w-6 h-6 shrink-0">
                      <img
                        src={leagueImage}
                        alt={league}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'inline';
                        }}
                      />
                      <span className="text-lg hidden">{leagueLogo}</span>
                    </div>
                  ) : (
                    <span className="text-xl">{leagueLogo}</span>
                  )}
                  <div>
                    <h2 className="font-display text-base tracking-wider text-white">
                      {league}
                    </h2>
                    <p className="text-[10px] text-textSecondary/60 uppercase tracking-wider">
                      {sport}
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-xs text-textSecondary shrink-0">
                    {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {matches.map((match, i) => (
                    <LiveScoreCard key={match.id} match={match} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <span className="text-6xl">📺</span>
            <p className="text-base font-medium text-white">No matches found</p>
            <p className="text-sm text-textSecondary">
              Try a different sport or check back later.
            </p>
            <button
              onClick={() => {
                setActiveSport('All Sports');
                setActiveStatus('All');
              }}
              className="btn-primary text-xs"
            >
              Show All Sports
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
