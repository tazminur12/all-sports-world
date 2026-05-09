'use client';
import { motion } from 'framer-motion';

const TICKER_ITEMS = [
  '🔴 LIVE: Argentina 2-0 Brazil (72\')',
  '⚽ GOAL: Mbappé scores for France vs England',
  '📊 Group B standings updated',
  '🏆 World Cup 2026 starts June 11 — 48 teams, 3 nations',
  '⭐ Messi confirms participation for Argentina',
  '🏟️ MetLife Stadium confirmed as Final venue',
  '🎯 Golden Boot race: Vinicius Jr leads with 4 goals',
];

export default function LiveTicker() {
  const content = [...TICKER_ITEMS, ...TICKER_ITEMS].join('  •  ');

  return (
    <div className="fixed top-[60px] sm:top-[72px] left-0 right-0 z-40 bg-accentGreen/10 border-b border-accentGreen/20 backdrop-blur-sm overflow-hidden h-8 flex items-center">
      <span className="text-accentGreen text-[10px] font-bold tracking-widest px-3 shrink-0 border-r border-accentGreen/30 h-full flex items-center">
        LIVE
      </span>
      <div className="ticker-wrap flex-1 overflow-hidden">
        <motion.span
          className="ticker-content text-[11px] text-white/80 font-medium whitespace-nowrap"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          {content}
        </motion.span>
      </div>
    </div>
  );
}
