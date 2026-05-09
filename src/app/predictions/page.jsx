'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Share2, CheckCircle } from 'lucide-react';

import SectionHeader from '@/components/SectionHeader';

// ── Data ──────────────────────────────────────────────
const PREDICTION_DATA = [
  {
    id:       'winner',
    icon:     '🏆',
    question: 'Who will win World Cup 2026?',
    options:  [
      { label: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png', votes: 4200 },
      { label: 'France',    flag: 'https://flagcdn.com/w40/fr.png', votes: 2800 },
      { label: 'Brazil',    flag: 'https://flagcdn.com/w40/br.png', votes: 1800 },
      { label: 'England',   flag: 'https://flagcdn.com/w40/gb.png', votes: 1200 },
      { label: 'Spain',     flag: 'https://flagcdn.com/w40/es.png', votes: 900  },
      { label: 'Germany',   flag: 'https://flagcdn.com/w40/de.png', votes: 600  },
    ],
  },
  {
    id:       'boot',
    icon:     '⚽',
    question: 'Who wins the Golden Boot?',
    options:  [
      { label: 'Mbappé',      flag: 'https://flagcdn.com/w40/fr.png', votes: 3500 },
      { label: 'Vinicius Jr', flag: 'https://flagcdn.com/w40/br.png', votes: 3000 },
      { label: 'Messi',       flag: 'https://flagcdn.com/w40/ar.png', votes: 2500 },
      { label: 'Lamine Yamal',flag: 'https://flagcdn.com/w40/es.png', votes: 1800 },
      { label: 'Kane',        flag: 'https://flagcdn.com/w40/gb.png', votes: 1200 },
      { label: 'Ronaldo',     flag: 'https://flagcdn.com/w40/pt.png', votes: 800  },
    ],
  },
  {
    id:       'goalkeeper',
    icon:     '🧤',
    question: 'Best Goalkeeper (Golden Glove)?',
    options:  [
      { label: 'Alisson',    flag: 'https://flagcdn.com/w40/br.png', votes: 2800 },
      { label: 'M. Neuer',   flag: 'https://flagcdn.com/w40/de.png', votes: 2200 },
      { label: 'D. Martínez',flag: 'https://flagcdn.com/w40/ar.png', votes: 3100 },
      { label: 'Courtois',   flag: 'https://flagcdn.com/w40/be.png', votes: 1900 },
    ],
  },
  {
    id:       'surprise',
    icon:     '🌟',
    question: 'Biggest surprise package?',
    options:  [
      { label: 'Morocco',   flag: 'https://flagcdn.com/w40/ma.png', votes: 3200 },
      { label: 'Japan',     flag: 'https://flagcdn.com/w40/jp.png', votes: 2100 },
      { label: 'USA',       flag: 'https://flagcdn.com/w40/us.png', votes: 1800 },
      { label: 'Senegal',   flag: 'https://flagcdn.com/w40/sn.png', votes: 900  },
    ],
  },
  {
    id:       'final',
    icon:     '⚔️',
    question: 'Who reaches the Final?',
    options:  [
      { label: 'Argentina vs France', flag: 'https://flagcdn.com/w40/ar.png', votes: 4100 },
      { label: 'Brazil vs England',   flag: 'https://flagcdn.com/w40/br.png', votes: 2800 },
      { label: 'Argentina vs Brazil', flag: 'https://flagcdn.com/w40/ar.png', votes: 2400 },
      { label: 'France vs Spain',     flag: 'https://flagcdn.com/w40/fr.png', votes: 1200 },
    ],
  },
  {
    id:       'group',
    icon:     '🔥',
    question: 'Which is the "Group of Death"?',
    options:  [
      { label: 'Group A (USA)',     flag: 'https://flagcdn.com/w40/us.png', votes: 2200 },
      { label: 'Group B (Brazil)',  flag: 'https://flagcdn.com/w40/br.png', votes: 3800 },
      { label: 'Group C (France)',  flag: 'https://flagcdn.com/w40/fr.png', votes: 2900 },
      { label: 'Group D (Germany)', flag: 'https://flagcdn.com/w40/de.png', votes: 1800 },
    ],
  },
];

// ── Leaderboard mock data ──────────────────────────────
const LEADERBOARD = [
  { rank: 1, name: 'Carlos M.',   country: 'ar', correct: 9,  points: 450 },
  { rank: 2, name: 'Aisha K.',    country: 'ma', correct: 8,  points: 400 },
  { rank: 3, name: 'Takeshi R.',  country: 'jp', correct: 8,  points: 380 },
  { rank: 4, name: 'Sophie D.',   country: 'fr', correct: 7,  points: 340 },
  { rank: 5, name: 'Alex J.',     country: 'us', correct: 6,  points: 290 },
];

// ── Single card component ──────────────────────────────
function PredictionCard({ data, index }) {
  const [voted,   setVoted]   = useState(null);
  const [options, setOptions] = useState(data.options);

  const total = options.reduce((acc, o) => acc + o.votes, 0);

  function handleVote(label) {
    if (voted) return;
    setVoted(label);
    setOptions((prev) =>
      prev.map((o) =>
        o.label === label ? { ...o, votes: o.votes + 1 } : o
      )
    );
  }

  const sorted = voted
    ? [...options].sort((a, b) => b.votes - a.votes)
    : options;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass rounded-2xl p-6 border border-white/5
                 hover:border-accentGreen/20 transition-colors duration-300
                 flex flex-col gap-5"
    >
      {/* Question */}
      <div className="flex items-start gap-3">
        <span className="text-2xl">{data.icon}</span>
        <h3 className="font-bold text-white text-base leading-snug">{data.question}</h3>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {sorted.map((opt) => {
          const pct      = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
          const isVoted  = voted === opt.label;
          const isWinner = voted && sorted[0].label === opt.label;

          return (
            <button
              key={opt.label}
              onClick={() => handleVote(opt.label)}
              disabled={!!voted}
              className={`w-full text-left rounded-xl overflow-hidden border
                          transition-all duration-200 relative
                          ${isVoted
                            ? 'border-accentGreen'
                            : isWinner && voted
                              ? 'border-accentGreen/40'
                              : voted
                                ? 'border-white/5 opacity-60'
                                : 'border-white/10 hover:border-accentGreen/40'
                          }`}
            >
              {/* Progress bar */}
              {voted && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`absolute inset-0 rounded-xl ${
                    isVoted ? 'bg-accentGreen/15' : 'bg-white/5'
                  }`}
                />
              )}

              <div className="flex items-center gap-3 px-4 py-2.5 relative z-10">
                {/* Flag */}
                <div className="relative w-7 h-7 rounded-full overflow-hidden
                                border border-white/20 shrink-0">
                  <Image
                    src={opt.flag}
                    alt={opt.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Label */}
                <span className={`text-sm font-semibold flex-1 ${
                  isVoted ? 'text-accentGreen' : 'text-white'
                }`}>
                  {opt.label}
                </span>

                {/* Winner crown */}
                {voted && isWinner && (
                  <span className="text-yellow-400 text-sm">👑</span>
                )}

                {/* My vote check */}
                {isVoted && (
                  <CheckCircle className="w-4 h-4 text-accentGreen shrink-0" />
                )}

                {/* Percentage */}
                {voted && (
                  <span className={`text-xs font-bold min-w-[3rem] text-right ${
                    isVoted ? 'text-accentGreen' : 'text-textSecondary'
                  }`}>
                    {pct}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-textSecondary
                      pt-3 border-t border-white/5">
        <span>
          {voted
            ? `${total.toLocaleString()} total votes`
            : 'Tap to cast your vote'}
        </span>
        {voted && (
          <button className="flex items-center gap-1 text-accentBlue hover:text-white
                             transition-colors duration-200">
            <Share2 className="w-3 h-3" />
            Share
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────
export default function PredictionsPage() {
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
          🎯 Fan Predictions
        </span>
        <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-white mt-3">
          MAKE YOUR{' '}
          <span className="neon-text-green">PREDICTION</span>
        </h1>
        <p className="text-textSecondary text-sm mt-3 max-w-lg mx-auto">
          Vote on the biggest questions of World Cup 2026.
          Cast your predictions and see how you compare with fans worldwide.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-8">
          {[
            { value: '2.1M+', label: 'Total Votes'       },
            { value: '6',     label: 'Active Polls'       },
            { value: '180+',  label: 'Countries Voting'   },
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

      {/* ── Prediction Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {PREDICTION_DATA.map((data, i) => (
          <PredictionCard key={data.id} data={data} index={i} />
        ))}
      </div>

      {/* ── Leaderboard ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader
          eyebrow="🏅 Top Predictors"
          title="Global"
          highlight="Leaderboard"
          subtitle="The most accurate predictors from around the world."
        />

        <div className="glass rounded-2xl border border-white/5 overflow-hidden mt-8">
          {/* Table header */}
          <div className="grid grid-cols-4 px-6 py-3 border-b border-white/5 bg-white/5">
            {['Rank', 'Predictor', 'Correct', 'Points'].map((h) => (
              <span
                key={h}
                className="text-[10px] font-bold tracking-widest text-textSecondary uppercase"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {LEADERBOARD.map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`grid grid-cols-4 px-6 py-4 border-b border-white/5
                          hover:bg-white/5 transition-colors duration-200
                          ${i === 0 ? 'bg-accentGreen/5' : ''}`}
            >
              {/* Rank */}
              <div className="flex items-center gap-2">
                <span className={`font-display text-lg ${
                  i === 0 ? 'text-yellow-400' :
                  i === 1 ? 'text-gray-300'   :
                  i === 2 ? 'text-amber-600'  :
                  'text-textSecondary'
                }`}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${user.rank}`}
                </span>
              </div>

              {/* Name */}
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <Image
                    src={`https://flagcdn.com/w20/${user.country}.png`}
                    alt={user.country}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <span className="text-sm font-semibold text-white">{user.name}</span>
              </div>

              {/* Correct */}
              <span className="text-sm text-accentGreen font-bold self-center">
                {user.correct}/9
              </span>

              {/* Points */}
              <span className="text-sm font-bold text-white self-center">
                {user.points} pts
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <button className="btn-primary text-sm flex items-center gap-2">
            <Target className="w-4 h-4" />
            Join the Leaderboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}
