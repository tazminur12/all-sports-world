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
    <section
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden pt-[calc(env(safe-area-inset-top,0px)+6.5rem)] pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] sm:pt-[calc(env(safe-area-inset-top,0px)+7.5rem)] md:pt-36 lg:pt-40"
    >

      {/* Background layers */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&q=60')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-bgPrimary/40 via-transparent to-bgPrimary" />

      {/* Floating glow orbs — smaller on phone to avoid heavy paint / edge bleed */}
      <div className="pointer-events-none absolute left-[10%] top-1/4 h-48 w-48 rounded-full bg-accentGreen/10 blur-3xl sm:left-1/4 sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
      <div className="pointer-events-none absolute bottom-1/4 right-[8%] h-44 w-44 rounded-full bg-accentBlue/10 blur-3xl sm:right-1/4 sm:h-64 sm:w-80" />

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
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] text-center sm:gap-8 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass flex max-w-full items-start gap-2 rounded-full border border-accentGreen/30 px-3 py-1.5 sm:items-center sm:px-4 sm:py-2"
        >
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accentGreen animate-pulse sm:mt-0" />
          <span className="text-left text-[10px] font-bold uppercase leading-snug tracking-wider text-accentGreen sm:text-xs sm:tracking-widest">
            FIFA World Cup 2026 · USA · Canada · Mexico
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col gap-1 sm:gap-2"
        >
          <h1 className="font-display text-[clamp(2.5rem,11vw,3.5rem)] leading-[0.95] tracking-wide text-white sm:text-7xl sm:leading-none sm:tracking-wider md:text-8xl lg:text-9xl">
            ROAD TO
          </h1>
          <h1 className="font-display text-[clamp(2.5rem,11vw,3.5rem)] leading-[0.95] tracking-wide neon-text-green sm:text-7xl sm:leading-none sm:tracking-wider md:text-8xl lg:text-9xl">
            WORLD CUP
          </h1>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="hidden h-px min-[400px]:block min-[400px]:max-w-[4rem] min-[400px]:flex-1 sm:max-w-xs bg-gradient-to-r from-transparent to-accentGreen/50" />
            <h1 className="font-display text-[clamp(2.75rem,12vw,4rem)] leading-none tracking-wide neon-text-blue sm:text-7xl sm:tracking-wider md:text-8xl lg:text-9xl">
              2026
            </h1>
            <div className="hidden h-px min-[400px]:block min-[400px]:max-w-[4rem] min-[400px]:flex-1 sm:max-w-xs bg-gradient-to-l from-transparent to-accentBlue/50" />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl px-1 text-sm leading-relaxed text-textSecondary sm:text-base md:text-lg"
        >
          48 nations. 3 host countries. 104 matches. One destiny.
          The greatest sporting event on Earth begins <span className="text-white font-semibold">June 11, 2026</span>.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex w-full max-w-full flex-col items-center gap-2 sm:gap-3"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-textSecondary sm:text-xs">
            Tournament begins in
          </span>
          <CountdownTimer targetDate={WC_START_DATE} size="hero" variant="hero" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <Link
            href="/schedule"
            className="btn-primary flex w-full items-center justify-center gap-2 px-8 text-sm sm:w-auto"
          >
            <Calendar className="h-4 w-4 shrink-0" />
            Full Schedule
          </Link>
          <Link
            href="/teams"
            className="btn-secondary flex w-full items-center justify-center gap-2 px-8 text-sm sm:w-auto"
          >
            <Play className="h-4 w-4 shrink-0 fill-current" />
            Explore Teams
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mx-auto mt-2 grid w-full max-w-md grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:mt-4 sm:gap-8 sm:pt-8"
        >
          {[
            { value: '48', label: 'Teams' },
            { value: '104', label: 'Matches' },
            { value: '3', label: 'Nations' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5 sm:gap-1">
              <span className="font-display text-2xl text-accentGreen sm:text-3xl">{value}</span>
              <span className="text-[10px] uppercase tracking-wider text-textSecondary sm:text-xs sm:tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2, duration: 0.5 }, y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-[max(1rem,env(safe-area-inset-bottom,0px)+0.5rem)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-textSecondary/50"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
