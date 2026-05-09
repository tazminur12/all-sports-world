'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';

import MatchCard    from '@/components/MatchCard';
import FilterTabs   from '@/components/FilterTabs';
import matchesData  from '@/data/matches.json';
import { toLocalTime } from '@/utils/timeUtils';

const STAGES = ['All', 'Group Stage', 'Final'];

// Group matches by local date string
function groupByDate(matches) {
  return matches.reduce((acc, match) => {
    const { dateStr } = toLocalTime(match.date);
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(match);
    return acc;
  }, {});
}

export default function SchedulePage() {
  const [search,    setSearch]    = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filtered = useMemo(() => {
    let result = matchesData;

    if (activeTab !== 'All') {
      result = result.filter((m) => m.stage === activeTab);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.team1.name.toLowerCase().includes(q) ||
          m.team2.name.toLowerCase().includes(q) ||
          m.stadium.toLowerCase().includes(q)    ||
          m.city.toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, activeTab]);

  const grouped = groupByDate(filtered);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">

      {/* ── Page Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="text-xs font-bold tracking-[0.3em] text-accentGreen uppercase">
          ⚽ FIFA World Cup 2026
        </span>
        <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-white mt-3">
          MATCH{' '}
          <span className="neon-text-green">SCHEDULE</span>
        </h1>
        <p className="text-textSecondary text-sm mt-3 max-w-md mx-auto leading-relaxed">
          {matchesData.length} matches across USA, Canada &amp; Mexico.
          All times shown in your local timezone.
        </p>

        {/* Quick stats */}
        <div className="flex items-center justify-center gap-8 mt-8">
          {[
            { value: '48',              label: 'Teams'   },
            { value: matchesData.length, label: 'Matches' },
            { value: '3',               label: 'Nations' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-display text-3xl text-accentGreen">{value}</span>
              <span className="text-[10px] text-textSecondary tracking-widest uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Controls ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by team, stadium or city..."
            className="w-full pl-11 pr-4 py-3 rounded-full glass border border-white/10
                       focus:border-accentGreen/60 focus:outline-none text-sm text-white
                       placeholder-textSecondary bg-transparent transition-colors duration-200"
          />
        </div>

        {/* Stage Filter */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-textSecondary shrink-0" />
          <FilterTabs tabs={STAGES} active={activeTab} onChange={setActiveTab} />
        </div>
      </motion.div>

      {/* Results count */}
      <p className="text-textSecondary text-xs mb-8">
        Showing{' '}
        <span className="text-accentGreen font-bold">{filtered.length}</span>{' '}
        matches
      </p>

      {/* ── Grouped Matches ── */}
      {Object.keys(grouped).length > 0 ? (
        Object.entries(grouped).map(([date, matches], groupIdx) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: groupIdx * 0.05 }}
            className="mb-12"
          >
            {/* Date header */}
            <div className="flex items-center gap-4 mb-5">
              <h2 className="font-display text-xl tracking-wider text-accentGreen whitespace-nowrap">
                {date}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-accentGreen/30 to-transparent" />
              <span className="text-xs text-textSecondary shrink-0">
                {matches.length} {matches.length === 1 ? 'match' : 'matches'}
              </span>
            </div>

            {/* Match cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {matches.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} />
              ))}
            </div>
          </motion.div>
        ))
      ) : (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24
                     text-textSecondary gap-4"
        >
          <span className="text-6xl">🔍</span>
          <p className="text-base font-medium text-white">No matches found</p>
          <p className="text-sm">Try a different search term or stage filter.</p>
          <button
            onClick={() => { setSearch(''); setActiveTab('All'); }}
            className="btn-primary text-xs mt-2"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
