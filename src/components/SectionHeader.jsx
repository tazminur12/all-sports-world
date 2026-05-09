'use client';
import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, highlight, subtitle, centered = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-2 mb-10 ${centered ? 'items-center text-center' : ''}`}
    >
      {eyebrow && (
        <span className="text-xs font-bold tracking-[0.3em] text-accentGreen uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="section-title">
        {title}{' '}
        {highlight && <span className="neon-text-green">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-textSecondary text-sm max-w-xl mt-1">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
