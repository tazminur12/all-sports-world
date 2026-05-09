'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import SectionHeader from '@/components/SectionHeader';
import NewsCard from '@/components/NewsCard';
import FilterTabs from '@/components/FilterTabs';
import newsData from '@/data/news.json';

const TABS = ['All', 'FIFA', 'Analysis', 'Stadiums'];

export default function TrendingNewsSection() {
  const [activeTab, setActiveTab] = useState('All');

  const featured   = newsData.find((n) => n.featured);
  const rest        = newsData.filter((n) => !n.featured);

  const filteredRest = activeTab === 'All'
    ? rest
    : rest.filter((n) => n.category === activeTab);

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <SectionHeader
          eyebrow="📰 Latest Coverage"
          title="Trending"
          highlight="News"
        />
        <FilterTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Featured article */}
        {featured && (
          <div className="lg:col-span-2">
            <NewsCard article={featured} variant="featured" />
          </div>
        )}

        {/* Standard articles */}
        <div className="lg:col-span-3 flex flex-col divide-y divide-white/5">
          {filteredRest.slice(0, 4).map((article, i) => (
            <NewsCard key={article.id} article={article} variant="standard" index={i} />
          ))}
          {filteredRest.length === 0 && (
            <p className="text-textSecondary text-sm py-8 text-center">
              No articles in this category yet.
            </p>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10"
      >
        <Link href="/news" className="btn-secondary text-sm">
          View All News →
        </Link>
      </motion.div>
    </section>
  );
}
