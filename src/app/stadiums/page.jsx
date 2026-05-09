'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import StadiumCard  from '@/components/StadiumCard';
import FilterTabs   from '@/components/FilterTabs';
import stadiumsData from '@/data/stadiums.json';
import { formatCapacity } from '@/utils/formatUtils';

const COUNTRIES = ['All', ...new Set(stadiumsData.map((s) => s.country))];
const totalCapacity = stadiumsData.reduce((acc, s) => acc + s.capacity, 0);

export default function StadiumsPage() {
  const [search,    setSearch]    = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const filtered = useMemo(() => {
    let result = stadiumsData;

    if (activeTab !== 'All') {
      result = result.filter((s) => s.country === activeTab);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q)
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
          🏟️ World Cup Venues
        </span>
        <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-white mt-3">
          ICONIC{' '}
          <span className="neon-text-green">STADIUMS</span>
        </h1>
        <p className="text-textSecondary text-sm mt-3 max-w-md mx-auto">
          {stadiumsData.length} legendary venues hosting the world&apos;s biggest tournament.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-8">
          {[
            { value: stadiumsData.length,        label: 'Venues'        },
            { value: formatCapacity(totalCapacity), label: 'Total Seats' },
            { value: '3',                          label: 'Countries'    },
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
        className="flex flex-col sm:flex-row gap-4 mb-10"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stadium or city..."
            className="w-full pl-11 pr-4 py-3 rounded-full glass border border-white/10
                       focus:border-accentGreen/60 focus:outline-none text-sm text-white
                       placeholder-textSecondary bg-transparent transition-colors"
          />
        </div>
        <FilterTabs tabs={COUNTRIES} active={activeTab} onChange={setActiveTab} />
      </motion.div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((stadium, i) => (
            <StadiumCard key={stadium.id} stadium={stadium} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24
                     text-textSecondary gap-4"
        >
          <span className="text-6xl">🏟️</span>
          <p className="text-base font-medium text-white">No stadiums found</p>
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
