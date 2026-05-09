'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Clock, RefreshCw } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

import SectionHeader  from '@/components/SectionHeader';
import MatchCard      from '@/components/MatchCard';
import FilterTabs     from '@/components/FilterTabs';
import CountdownTimer from '@/components/CountdownTimer';
import matchesData    from '@/data/matches.json';

// ─────────────────────────────────────────
const TABS         = ['All Upcoming', 'Today', 'Tomorrow', 'This Week'];
const INITIAL_SHOW = 6;
// ─────────────────────────────────────────

/** দুটো Date same calendar day কিনা */
function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth()    === d2.getMonth()    &&
    d1.getDate()     === d2.getDate()
  );
}

/** Tab অনুযায়ী upcoming matches filter */
function filterByTab(tab, now) {
  const upcoming = matchesData
    .filter((m) => new Date(m.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const today   = new Date(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(today.getDate() + 1);

  const nextWeek = new Date(now);
  nextWeek.setDate(today.getDate() + 7);

  switch (tab) {
    case 'Today':
      return upcoming.filter((m) => isSameDay(new Date(m.date), today));
    case 'Tomorrow':
      return upcoming.filter((m) => isSameDay(new Date(m.date), tomorrow));
    case 'This Week':
      return upcoming.filter((m) => new Date(m.date) <= nextWeek);
    case 'All Upcoming':
    default:
      return upcoming;
  }
}

// ─────────────────────────────────────────
// Empty State
// ─────────────────────────────────────────
function EmptyState({ tab, nextMatch }) {
  const INFO = {
    'Today':        { emoji: '📅', msg: 'No matches scheduled for today.'     },
    'Tomorrow':     { emoji: '📆', msg: 'No matches scheduled for tomorrow.'  },
    'This Week':    { emoji: '🗓️', msg: 'No matches this week.'               },
    'All Upcoming': { emoji: '🏆', msg: 'All matches have been played!'       },
  };

  const { emoji, msg } = INFO[tab] || INFO['All Upcoming'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16
                 text-textSecondary gap-4"
    >
      <span className="text-5xl">{emoji}</span>
      <p className="text-base font-semibold text-white">{msg}</p>

      {nextMatch && (
        <div className="flex flex-col items-center gap-3 mt-2 glass
                        rounded-2xl p-6 border border-white/5 text-center">
          <p className="text-xs tracking-widest text-textSecondary uppercase">
            Next Match
          </p>
          <p className="text-lg font-bold text-white">
            {nextMatch.team1.name}
            <span className="text-accentGreen mx-2">vs</span>
            {nextMatch.team2.name}
          </p>
          <p className="text-xs text-textSecondary">
            {nextMatch.stadium} · {nextMatch.city}
          </p>
          <CountdownTimer targetDate={nextMatch.date} size="md" />
        </div>
      )}

      <Link href="/schedule" className="btn-primary text-sm mt-2">
        View Full Schedule →
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────
export default function UpcomingMatchesSection() {
  const [activeTab, setActiveTab] = useState('All Upcoming');
  const [now,       setNow]       = useState(() => new Date());
  const [mounted,   setMounted]   = useState(false);

  // Client mount
  useEffect(() => { setMounted(true); }, []);

  // প্রতি 60 সেকেন্ডে now update → auto filter refresh
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  // Tab অনুযায়ী filtered matches
  const allFiltered = useMemo(
    () => filterByTab(activeTab, now),
    [activeTab, now]
  );

  // সবসময় সর্বোচ্চ INITIAL_SHOW টা দেখাবে
  const displayed = allFiltered.slice(0, INITIAL_SHOW);

  // আজকের match count (badge এর জন্য)
  const todayCount = useMemo(
    () => filterByTab('Today', now).length,
    [now]
  );

  // সবচেয়ে কাছের upcoming match (banner এর জন্য)
  const nextMatch = useMemo(() => {
    return matchesData
      .filter((m) => new Date(m.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0] ?? null;
  }, [now]);

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end
                      md:justify-between gap-6 mb-6">
        <SectionHeader
          eyebrow="⚽ Match Schedule"
          title="Upcoming"
          highlight="Matches"
          subtitle="Automatically filtered by your local date & time."
        />
        <FilterTabs
          tabs={TABS}
          active={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* ── Next Match Banner ── */}
      <AnimatePresence>
        {mounted && nextMatch && activeTab === 'All Upcoming' && (
          <motion.div
            key="next-banner"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="glass border border-accentGreen/25 rounded-2xl p-4
                       mb-8 flex flex-col sm:flex-row items-center
                       justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accentGreen animate-pulse" />
                <span className="text-[10px] text-accentGreen font-bold
                                 tracking-widest uppercase">
                  Next Match
                </span>
              </div>
              <span className="text-white/20 hidden sm:block">|</span>
              <div>
                <p className="text-sm font-bold text-white">
                  {nextMatch.team1.name}
                  <span className="text-accentGreen mx-1.5">vs</span>
                  {nextMatch.team2.name}
                </p>
                <p className="text-xs text-textSecondary mt-0.5">
                  {nextMatch.stadium} · {nextMatch.city}
                </p>
              </div>
            </div>
            <CountdownTimer targetDate={nextMatch.date} size="sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Info Bar ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-xs text-textSecondary">
          <Clock className="w-3 h-3 text-accentGreen" />
          <span>
            Showing{' '}
            <span className="text-accentGreen font-bold">
              {Math.min(displayed.length, INITIAL_SHOW)}
            </span>
            {' '}of{' '}
            <span className="text-white font-bold">{allFiltered.length}</span>
            {' '}upcoming matches
          </span>
          {todayCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-accentGreen/15
                             text-accentGreen text-[10px] font-bold
                             border border-accentGreen/30 ml-2">
              {todayCount} TODAY
            </span>
          )}
        </div>

        {mounted && (
          <div className="flex items-center gap-1.5 text-[10px]
                          text-textSecondary select-none">
            <RefreshCw className="w-3 h-3" />
            <span>Auto-updating</span>
          </div>
        )}
      </div>

      {/* ── Cards / Empty State ── */}
      <AnimatePresence mode="wait">
        {displayed.length > 0 ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0  }}
            exit={{ opacity: 0, y: -10   }}
            transition={{ duration: 0.35 }}
          >
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} />
              ))}
            </div>

            {/* Mobile Swiper */}
            <div className="md:hidden">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="pb-10 matches-swiper"
              >
                {displayed.map((match, i) => (
                  <SwiperSlide key={match.id}>
                    <MatchCard match={match} index={i} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        ) : (
          <EmptyState
            key={`empty-${activeTab}`}
            tab={activeTab}
            nextMatch={nextMatch}
          />
        )}
      </AnimatePresence>

      {/* ── View Full Schedule CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-2 mt-10"
      >
        {allFiltered.length > INITIAL_SHOW && (
          <p className="text-xs text-textSecondary">
            +{allFiltered.length - INITIAL_SHOW} more matches available
          </p>
        )}
        <Link href="/schedule" className="btn-secondary text-sm">
          View Full Schedule →
        </Link>
      </motion.div>

    </section>
  );
}
