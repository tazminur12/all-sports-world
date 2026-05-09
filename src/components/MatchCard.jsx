'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { useLocalTime } from '@/hooks/useLocalTime';
import CountdownTimer from './CountdownTimer';

export default function MatchCard({ match, index = 0 }) {
  const { dateStr, timeStr, tzAbbr, mounted } = useLocalTime(match.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass rounded-2xl p-5 flex flex-col gap-4 border border-white/5
                 hover:border-accentGreen/30 transition-colors duration-300 group"
    >
      {/* Stage Badge */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-accentGreen
                         uppercase bg-accentGreen/10 px-3 py-1 rounded-full">
          {match.stage}
          {match.group && ` · Group ${match.group}`}
        </span>

        {/* ✅ mounted check — hydration mismatch theke bachao */}
        <div className="flex items-center gap-1 text-textSecondary text-xs">
          <Clock className="w-3 h-3" />
          <span>
            {mounted
              ? `${timeStr} ${tzAbbr}`
              : '--:-- --'  /* server-side placeholder */
            }
          </span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-3">

        {/* Team 1 */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="relative w-14 h-14 rounded-full overflow-hidden
                          border-2 border-white/10 group-hover:border-accentGreen/40
                          transition-colors shadow-lg">
            <Image
              src={match.team1.flag}
              alt={match.team1.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="text-sm font-bold text-white text-center leading-tight">
            {match.team1.name}
          </span>
        </div>

        {/* VS */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-display text-textSecondary tracking-widest">
            VS
          </span>
          <span className="text-[10px] text-textSecondary/60 font-medium">
            {mounted ? dateStr : '-- --- ----'}
          </span>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="relative w-14 h-14 rounded-full overflow-hidden
                          border-2 border-white/10 group-hover:border-accentBlue/40
                          transition-colors shadow-lg">
            <Image
              src={match.team2.flag}
              alt={match.team2.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="text-sm font-bold text-white text-center leading-tight">
            {match.team2.name}
          </span>
        </div>
      </div>

      {/* Stadium */}
      <div className="flex items-center justify-center gap-1.5 text-textSecondary
                      text-xs bg-white/5 rounded-xl py-2">
        <MapPin className="w-3 h-3 text-accentBlue" />
        <span>{match.stadium}, {match.city}</span>
      </div>

      {/* Countdown */}
      <div className="flex justify-center">
        <CountdownTimer targetDate={match.date} size="sm" />
      </div>
    </motion.div>
  );
}
