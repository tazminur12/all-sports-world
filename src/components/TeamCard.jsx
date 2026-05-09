'use client';

import Image    from 'next/image';
import Link     from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, User, Star, ChevronRight } from 'lucide-react';
import { toSlug } from '@/utils/slugUtils';

export default function TeamCard({ team, index = 0 }) {
  const slug = toSlug(team.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass rounded-2xl overflow-hidden border border-white/5
                 hover:border-accentGreen/30 transition-colors duration-300 group
                 flex flex-col"
    >
      {/* ── Top Color Bar ── */}
      <div
        className="h-1 w-full shrink-0"
        style={{ backgroundColor: team.color }}
      />

      <div className="p-5 flex flex-col items-center gap-4 flex-1">

        {/* ── Flag ── */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden
                        border-2 border-white/10 group-hover:border-accentGreen/40
                        transition-colors duration-300 shadow-lg shrink-0">
          <Image
            src={team.flag}
            alt={`${team.name} flag`}
            fill
            sizes="80px"
            className="object-cover"
            unoptimized
          />
        </div>

        {/* ── Team Name ── */}
        <div className="flex flex-col items-center gap-1">
          <h3 className="font-display text-xl tracking-wider text-white
                         text-center group-hover:text-accentGreen
                         transition-colors duration-200">
            {team.name}
          </h3>
          <span className="text-[10px] text-textSecondary tracking-widest uppercase">
            Group {team.group}
          </span>
        </div>

        {/* ── Stats Row ── */}
        <div className="flex items-center justify-center gap-4
                        text-xs text-textSecondary w-full">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-accentGreen shrink-0" />
            <span>Rank <strong className="text-white">#{team.ranking}</strong></span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1">
            <Trophy className="w-3 h-3 text-yellow-400 shrink-0" />
            <span>
              <strong className="text-white">{team.titles}</strong>{' '}
              {team.titles === 1 ? 'Title' : 'Titles'}
            </span>
          </div>
        </div>

        {/* ── Coach ── */}
        <div className="flex items-center gap-1.5 text-xs text-textSecondary
                        bg-white/5 rounded-xl px-3 py-2 w-full justify-center
                        border border-white/5">
          <User className="w-3 h-3 text-accentBlue shrink-0" />
          <span className="truncate">{team.coach}</span>
        </div>

        {/* ── Squad Preview ── */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {team.players.slice(0, 3).map((player) => (
            <span
              key={player}
              className="text-[10px] px-2 py-0.5 rounded-full
                         bg-white/5 text-textSecondary border border-white/5"
            >
              {player}
            </span>
          ))}
        </div>

        {/* ── Spacer ── */}
        <div className="flex-1" />

        {/* ── CTA Button ── */}
        <Link
          href={`/teams/${slug}`}
          className="w-full flex items-center justify-center gap-1.5
                     py-2.5 rounded-xl text-xs font-bold
                     border border-accentGreen/30 text-accentGreen
                     hover:bg-accentGreen hover:text-bgPrimary
                     hover:border-accentGreen
                     transition-all duration-200"
        >
          View Squad
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>

      </div>
    </motion.div>
  );
}
