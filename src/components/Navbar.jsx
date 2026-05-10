'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const NAV_LINKS = [
  { href: '/',            label: 'Home'        },
  { href: '/schedule',    label: 'Schedule'    },
  { href: '/teams',       label: 'Teams'       },
  { href: '/stadiums',    label: 'Stadiums'    },
  { href: '/news',        label: 'News'        },
  { href: '/predictions', label: 'Predictions' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const { resolvedTheme, setTheme } = useTheme(); // ✅ FIX 1: resolvedTheme use koro
  const pathname = usePathname();

  // ✅ FIX 1: mounted check — hydration mismatch theke bachao
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ✅ FIX 1: theme toggle function
  function toggleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-dark py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="w-9 h-9 rounded-xl bg-accentGreen flex items-center
                           justify-center group-hover:scale-110 transition-transform duration-200"
              >
                <Globe className="w-5 h-5 text-bgPrimary" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg tracking-widest text-white">
                  ALL SPORTS
                </span>
                <span className="text-[10px] tracking-[0.3em] text-accentGreen font-medium">
                  WORLD
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative px-4 py-2 text-sm font-medium rounded-lg
                                  transition-all duration-200 group inline-block ${
                        isActive
                          ? 'text-accentGreen'
                          : 'text-textSecondary hover:text-white'
                      }`}
                    >
                      {label}

                      {/* ✅ FIX 2: layoutId span — AnimatePresence wrap kora nav er baaire */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-dot"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2
                                     w-1 h-1 rounded-full bg-accentGreen"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Hover bg */}
                      <span
                        className="absolute inset-0 rounded-lg bg-white/0
                                   group-hover:bg-white/5 transition-colors duration-200
                                   pointer-events-none"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ── Right Controls ── */}
            <div className="flex items-center gap-3">

              {/* ✅ FIX 1: mounted check — theme button only render after mount */}
              {mounted ? (
                <button
                  onClick={toggleTheme}
                  className="w-9 h-9 rounded-full glass border border-white/10
                             flex items-center justify-center text-textSecondary
                             hover:text-accentGreen hover:border-accentGreen/30
                             transition-all duration-200"
                  aria-label="Toggle theme"
                >
                  {resolvedTheme === 'dark'
                    ? <Sun  className="w-4 h-4" />
                    : <Moon className="w-4 h-4" />
                  }
                </button>
              ) : (
                // ✅ FIX 1: placeholder — same size, invisible (no layout shift)
                <div className="w-9 h-9" aria-hidden="true" />
              )}

              {/* CTA */}
              <Link
                href="/schedule"
                className="hidden sm:inline-flex btn-primary text-xs"
              >
                View Schedule
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="lg:hidden w-9 h-9 rounded-full glass border border-white/10
                           flex items-center justify-center text-textSecondary
                           hover:text-white hover:border-white/30 transition-all duration-200"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0,   opacity: 1 }}
                      exit={{   rotate:  90,  opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate:  90, opacity: 0 }}
                      animate={{ rotate:  0,  opacity: 1 }}
                      exit={{   rotate: -90,  opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0   }}
            exit={{    opacity: 0, y: -10  }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-[64px] left-0 right-0 z-40 glass-dark
                       border-b border-white/10 lg:hidden"
          >
            <ul className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium
                                transition-all duration-200 ${
                      pathname === href
                        ? 'bg-accentGreen/10 text-accentGreen'
                        : 'text-textSecondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-white/10">
                <Link
                  href="/schedule"
                  className="btn-primary block text-center text-xs"
                >
                  View Schedule
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
