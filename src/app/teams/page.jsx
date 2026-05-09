'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import TeamCard   from '@/components/TeamCard';
import FilterTabs from '@/components/FilterTabs';
import teamsData  from '@/data/teams.json';

const GROUPS = [
  'All',
  ...new Set(teamsData.map((t) => `Group ${t.group}`)),
];

export default function TeamsPage() {
  const [search,    setSearch]    = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filtered = useMemo(() => {
    let result = teamsData;

    if (activeTab !== 'All') {
      result = result.filter((t) => `Group ${t.group}` === activeTab);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q)  ||
          t.coach.toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, activeTab]);

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
          🌍 48 Nations
        </span>
        <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-white mt-3">
          WORLD CUP{' '}
          <span className="neon-text-green">TEAMS</span>
        </h1>
        <p className="text-textSecondary text-sm mt-3 max-w-md mx-auto">
          Every nation competing for football&apos;s greatest prize.
        </p>
      </motion.div>

      {/* ── Controls ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-10"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team or coach..."
            className="w-full pl-11 pr-4 py-3 rounded-full glass border border-white/10
                       focus:border-accentGreen/60 focus:outline-none text-sm text-white
                       placeholder-textSecondary bg-transparent transition-colors"
          />
        </div>
        <FilterTabs tabs={GROUPS} active={activeTab} onChange={setActiveTab} />
      </motion.div>

      {/* Results count */}
      <p className="text-textSecondary text-xs mb-8">
        Showing{' '}
        <span className="text-accentGreen font-bold">{filtered.length}</span>{' '}
        teams
      </p>

      {/* ── Teams Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((team, i) => (
            <TeamCard key={team.id} team={team} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24
                     text-textSecondary gap-4"
        >
          <span className="text-6xl">🏳️</span>
          <p className="text-base font-medium text-white">No teams found</p>
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
