'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

const PREDICTIONS = [
  {
    id:       'winner',
    question: '🏆 Who will win World Cup 2026?',
    options:  [
      { label: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png', votes: 42 },
      { label: 'France',    flag: 'https://flagcdn.com/w40/fr.png', votes: 28 },
      { label: 'Brazil',    flag: 'https://flagcdn.com/w40/br.png', votes: 18 },
      { label: 'England',   flag: 'https://flagcdn.com/w40/gb.png', votes: 12 },
    ],
  },
  {
    id:       'boot',
    question: '⚽ Who wins the Golden Boot?',
    options:  [
      { label: 'Mbappé',      flag: 'https://flagcdn.com/w40/fr.png', votes: 35 },
      { label: 'Vinicius Jr', flag: 'https://flagcdn.com/w40/br.png', votes: 30 },
      { label: 'Messi',       flag: 'https://flagcdn.com/w40/ar.png', votes: 25 },
      { label: 'Yamal',       flag: 'https://flagcdn.com/w40/es.png', votes: 10 },
    ],
  },
  {
    id:       'group',
    question: '🔥 Top Scoring Group?',
    options:  [
      { label: 'Group A', flag: 'https://flagcdn.com/w40/us.png', votes: 40 },
      { label: 'Group B', flag: 'https://flagcdn.com/w40/ar.png', votes: 38 },
      { label: 'Group C', flag: 'https://flagcdn.com/w40/fr.png', votes: 22 },
    ],
  },
];

function PredictionCard({ data }) {
  const [voted, setVoted]       = useState(null);
  const [options, setOptions]   = useState(data.options);
  const total                   = options.reduce((acc, o) => acc + o.votes, 0);

  function handleVote(label) {
    if (voted) return;
    setVoted(label);
    setOptions((prev) =>
      prev.map((o) => o.label === label ? { ...o, votes: o.votes + 1 } : o)
    );
  }

  return (
    <div className="glass rounded-2xl p-6 border border-white/5 hover:border-accentGreen/20
                    transition-colors duration-300 flex flex-col gap-5">
      <h3 className="font-bold text-white text-base leading-snug">{data.question}</h3>

      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
          const isVoted = voted === opt.label;

          return (
            <button
              key={opt.label}
              onClick={() => handleVote(opt.label)}
              disabled={!!voted}
              className={`w-full text-left rounded-xl overflow-hidden border transition-all
                          duration-200 ${isVoted
                            ? 'border-accentGreen'
                            : voted
                              ? 'border-white/5 opacity-70'
                              : 'border-white/10 hover:border-accentGreen/40'
                          }`}
            >
              <div className="flex items-center gap-3 px-4 py-2.5 relative">
                {/* Progress bar background */}
                {voted && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`absolute inset-0 rounded-xl ${
                      isVoted ? 'bg-accentGreen/15' : 'bg-white/5'
                    }`}
                  />
                )}

                {/* Flag */}
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0 z-10">
                  <Image src={opt.flag} alt={opt.label} fill className="object-cover" unoptimized />
                </div>

                {/* Label */}
                <span className={`text-sm font-semibold flex-1 z-10 ${
                  isVoted ? 'text-accentGreen' : 'text-white'
                }`}>
                  {opt.label}
                </span>

                {/* Percentage */}
                {voted && (
                  <span className={`text-xs font-bold z-10 ${
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

      {voted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-textSecondary text-center"
        >
          {total.toLocaleString()} total votes
        </motion.p>
      )}

      {!voted && (
        <p className="text-xs text-textSecondary text-center">
          Tap to cast your vote
        </p>
      )}
    </div>
  );
}

export default function PredictionSection() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="🎯 Fan Predictions"
        title="Make Your"
        highlight="Prediction"
        subtitle="Vote now — who will make history at World Cup 2026?"
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {PREDICTIONS.map((p) => (
          <PredictionCard key={p.id} data={p} />
        ))}
      </div>
    </section>
  );
}
