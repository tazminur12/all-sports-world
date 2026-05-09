'use client';
import { motion } from 'framer-motion';

export default function FilterTabs({ tabs, active, onChange, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wide
                      transition-colors duration-200 border
                      ${active === tab
                        ? 'text-bgPrimary border-accentGreen'
                        : 'text-textSecondary border-white/10 hover:text-white hover:border-white/30'
                      }`}
        >
          {active === tab && (
            <motion.span
              layoutId="filter-bg"
              className="absolute inset-0 rounded-full bg-accentGreen"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
}
