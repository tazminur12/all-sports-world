'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Calendar, ChevronDown } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';

// World Cup 2026 opening match date
const WC_START_DATE = '2026-06-11T20:00:00Z';

const FLOATING_VARIANTS = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-40">

      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&q=60')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-bgPrimary/40 via-transparent to-bgPrimary" />

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accentGreen/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accentBlue/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,133,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,133,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating ball */}
      <motion.div
        variants={FLOATING_VARIANTS}
        animate="animate"
        className="absolute right-10 top-32 hidden xl:block text-8xl select-none pointer-events-none"
        aria-hidden="true"
      >
        ⚽
      </motion.div>
      <motion.div
        variants={FLOATING_VARIANTS}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute left-10 bottom-40 hidden xl:block text-6xl select-none pointer-events-none opacity-40"
        aria-hidden="true"
      >
        🏆
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-accentGreen/30"
        >
          <span className="w-2 h-2 rounded-full bg-accentGreen animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-accentGreen uppercase">
            FIFA World Cup 2026 · USA · Canada · Mexico
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col gap-2"
        >
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none text-white">
            ROAD TO
          </h1>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none neon-text-green">
            WORLD CUP
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-accentGreen/50" />
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none neon-text-blue">
              2026
            </h1>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-accentBlue/50" />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-textSecondary text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          48 nations. 3 host countries. 104 matches. One destiny.
          The greatest sporting event on Earth begins <span className="text-white font-semibold">June 11, 2026</span>.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs tracking-widest text-textSecondary uppercase font-medium">
            Tournament begins in
          </span>
          <CountdownTimer targetDate={WC_START_DATE} size="xl" variant="hero" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/schedule" className="btn-primary flex items-center gap-2 text-sm px-8">
            <Calendar className="w-4 h-4" />
            Full Schedule
          </Link>
          <Link href="/teams" className="btn-secondary flex items-center gap-2 text-sm px-8">
            <Play className="w-4 h-4 fill-current" />
            Explore Teams
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="grid grid-cols-3 gap-8 mt-4 border-t border-white/10 pt-8 w-full max-w-md mx-auto"
        >
          {[
            { value: '48', label: 'Teams' },
            { value: '104', label: 'Matches' },
            { value: '3', label: 'Nations' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-display text-3xl text-accentGreen">{value}</span>
              <span className="text-textSecondary text-xs tracking-widest uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2, duration: 0.5 }, y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-textSecondary/50"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
