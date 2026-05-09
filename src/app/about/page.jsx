'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Target, Users, Zap, Trophy, Heart } from 'lucide-react';

const STATS = [
  { value: '500K+', label: 'Monthly Readers'   },
  { value: '104',   label: 'Matches Covered'   },
  { value: '48',    label: 'Nations Tracked'   },
  { value: '24/7',  label: 'Live Coverage'     },
];

const TEAM = [
  {
    name:   'Tazminur Rahman Tanim',
    role:   'Founder and developer — this website',
    flag:   'bd',
    bio:    'Leads product and engineering, turning the vision for All Sports World into a fast, reliable platform for fans.',
    avatar: 'T',
    color:  '#00FF85',
  },
  {
    name:   'Moynul Hasan Sadik',
    role:   'Professional designer and Video Editor',
    flag:   'bd',
    bio:    'Shapes the look and feel of our brand and crafts video content that brings matches and stories to life.',
    avatar: 'M',
    color:  '#00BFFF',
  },
  {
    name:   'Sakib Al Hasan',
    role:   'Social Media Manager and Website Maintenance',
    flag:   'bd',
    bio:    'Keeps our community engaged across channels and ensures the site stays up to date and running smoothly.',
    avatar: 'S',
    color:  '#00FF85',
  },
];

const VALUES = [
  {
    icon:  Target,
    title: 'Accuracy First',
    desc:  'We verify every stat, scoreline and quote before publishing. Your trust is everything to us.',
  },
  {
    icon:  Zap,
    title: 'Real-Time Coverage',
    desc:  'From kick-off to final whistle, we deliver live updates, match analysis and breaking news instantly.',
  },
  {
    icon:  Globe,
    title: 'Global Perspective',
    desc:  'With correspondents across 6 continents, we cover football from every angle and every culture.',
  },
  {
    icon:  Heart,
    title: 'Fan Focused',
    desc:  'Built by fans, for fans. Every feature we build starts with one question: what do supporters need?',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">

      {/* ── Hero ── */}
      <section className="relative px-4 sm:px-6 max-w-5xl mx-auto text-center mb-24">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96
                        bg-accentGreen/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          {/* Logo */}
          <div className="w-16 h-16 rounded-2xl bg-accentGreen flex items-center
                          justify-center shadow-neon-green">
            <Globe className="w-8 h-8 text-bgPrimary" />
          </div>

          <span className="text-xs font-bold tracking-[0.3em] text-accentGreen uppercase">
            🌍 Our Story
          </span>

          <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-white">
            ABOUT{' '}
            <span className="neon-text-green">ALL SPORTS WORLD</span>
          </h1>

          <p className="text-textSecondary text-base sm:text-lg max-w-2xl leading-relaxed">
            We are a passionate team of football journalists, designers, and developers
            united by one goal — to bring the beautiful game closer to every fan on the planet.
            World Cup 2026 is our biggest stage yet.
          </p>

          <Link href="/schedule" className="btn-primary text-sm mt-2">
            Explore WC 2026 →
          </Link>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center border border-white/5
                         hover:border-accentGreen/30 transition-colors duration-300"
            >
              <p className="font-display text-4xl text-accentGreen">{value}</p>
              <p className="text-textSecondary text-xs tracking-widest uppercase mt-1">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-24">
        <div className="glass rounded-3xl border border-white/5 p-8 sm:p-12
                        flex flex-col lg:flex-row gap-10 items-center">
          <div className="flex-1">
            <span className="text-xs font-bold tracking-widest text-accentGreen uppercase">
              Our Mission
            </span>
            <h2 className="font-display text-4xl tracking-wider text-white mt-2 mb-4">
              THE WORLD'S GAME,{' '}
              <span className="neon-text-green">FOR EVERYONE</span>
            </h2>
            <p className="text-textSecondary text-sm leading-relaxed mb-4">
              All Sports World was founded with a single belief — that football belongs to
              everyone. Whether you're watching from a stadium in New York, a café in
              Casablanca, or a living room in Tokyo, you deserve world-class coverage.
            </p>
            <p className="text-textSecondary text-sm leading-relaxed">
              With FIFA World Cup 2026 expanding to 48 teams across USA, Canada and Mexico,
              we are building the most comprehensive, beautiful, and accessible sports platform
              the game has ever seen.
            </p>
          </div>
          <div className="w-full lg:w-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full bg-accentGreen/10
                              border border-accentGreen/20 flex items-center justify-center">
                <Trophy className="w-20 h-20 text-accentGreen opacity-60" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full
                              bg-accentBlue/20 border border-accentBlue/30
                              flex items-center justify-center">
                <span className="text-2xl">⚽</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold tracking-widest text-accentGreen uppercase">
            What We Stand For
          </span>
          <h2 className="font-display text-4xl tracking-wider text-white mt-2">
            OUR <span className="neon-text-green">VALUES</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VALUES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 border border-white/5
                         hover:border-accentGreen/20 transition-colors duration-300
                         flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-accentGreen/10
                              flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-accentGreen" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
                <p className="text-textSecondary text-xs leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold tracking-widest text-accentGreen uppercase">
            The People Behind It
          </span>
          <h2 className="font-display text-4xl tracking-wider text-white mt-2">
            MEET THE <span className="neon-text-green">TEAM</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map(({ name, role, flag, bio, avatar, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-5 border border-white/5
                         hover:border-accentGreen/20 transition-colors duration-300
                         flex flex-col items-center text-center gap-3"
            >
              {/* Avatar */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center
                           text-bgPrimary font-display text-2xl border-2"
                style={{ backgroundColor: color, borderColor: color }}
              >
                {avatar}
              </div>

              <div>
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <img
                    src={`https://flagcdn.com/w20/${flag}.png`}
                    alt={flag}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <h3 className="font-bold text-white text-sm">{name}</h3>
                </div>
                <p className="text-accentGreen text-[10px] font-bold
                               tracking-widest uppercase mb-2">
                  {role}
                </p>
                <p className="text-textSecondary text-xs leading-relaxed">{bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 sm:px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl border border-accentGreen/20 p-10
                     text-center flex flex-col items-center gap-5"
        >
          <span className="text-4xl">🏆</span>
          <h2 className="font-display text-3xl tracking-wider text-white">
            JOIN THE <span className="neon-text-green">JOURNEY</span>
          </h2>
          <p className="text-textSecondary text-sm max-w-md">
            World Cup 2026 is almost here. Follow every match, every goal,
            every moment with All Sports World.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/schedule" className="btn-primary text-sm">
              View Schedule
            </Link>
            <Link href="/contact" className="btn-secondary text-sm">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
