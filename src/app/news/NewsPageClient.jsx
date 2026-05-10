'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import NewsCard    from '@/components/NewsCard';
import FilterTabs from '@/components/FilterTabs';
import newsData   from '@/data/news.json';

const CATEGORIES = [
  'All',
  ...new Set(newsData.map((n) => n.category)),
];

export default function NewsPageClient() {
  const [search,    setSearch]    = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const featured = newsData.find((n) => n.featured);
  const rest      = newsData.filter((n) => !n.featured);

  const filteredRest = useMemo(() => {
    let result = rest;

    if (activeTab !== 'All') {
      result = result.filter((n) => n.category === activeTab);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q)   ||
          n.excerpt.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, activeTab, rest]);

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
          📰 Latest Coverage
        </span>
        <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-white mt-3">
          SPORTS{' '}
          <span className="neon-text-green">NEWS</span>
        </h1>
        <p className="text-textSecondary text-sm mt-3 max-w-md mx-auto">
          Breaking news, match previews, and in-depth analysis from World Cup 2026.
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
            placeholder="Search articles..."
            className="w-full pl-11 pr-4 py-3 rounded-full glass border border-white/10
                       focus:border-accentGreen/60 focus:outline-none text-sm text-white
                       placeholder-textSecondary bg-transparent transition-colors"
          />
        </div>
        <FilterTabs tabs={CATEGORIES} active={activeTab} onChange={setActiveTab} />
      </motion.div>

      {/* ── Featured Article ── */}
      {featured && activeTab === 'All' && !search && (
        <div className="mb-10">
          <p className="text-xs font-bold tracking-widest text-accentGreen uppercase mb-4">
            ⭐ Featured Story
          </p>
          <NewsCard article={featured} variant="featured" />
        </div>
      )}

      {/* ── Articles Grid ── */}
      {filteredRest.length > 0 ? (
        <>
          <p className="text-textSecondary text-xs mb-6">
            Showing{' '}
            <span className="text-accentGreen font-bold">{filteredRest.length}</span>{' '}
            articles
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRest.map((article, i) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="featured"
                index={i}
              />
            ))}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24
                     text-textSecondary gap-4"
        >
          <span className="text-6xl">📰</span>
          <p className="text-base font-medium text-white">No articles found</p>
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
