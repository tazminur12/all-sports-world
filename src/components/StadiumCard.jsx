'use client';

import Image from 'next/image';
import Link  from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar } from 'lucide-react';
import { formatCapacity } from '@/utils/formatUtils';
import { toSlug }         from '@/utils/slugUtils';
import Badge              from './Badge';

export default function StadiumCard({ stadium, index = 0 }) {
  // ✅ slug generate করো
  const slug = toSlug(stadium.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer
                 border border-white/5 hover:border-accentGreen/30
                 transition-colors duration-300"
    >
      {/* ✅ Link wraps the whole card */}
      <Link href={`/stadiums/${slug}`}>

        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={stadium.image}
            alt={stadium.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700
                       group-hover:scale-105"
            unoptimized
          />
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t
                          from-bgCard via-bgCard/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3">
            <Badge text={stadium.highlight} color="green" />
          </div>
          <div className="absolute top-3 right-3">
            <Badge text={`${stadium.matches} Matches`} color="blue" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 bg-bgCard flex flex-col gap-3">
          <h3 className="font-display text-xl tracking-wider text-white
                         group-hover:text-accentGreen transition-colors duration-200">
            {stadium.name}
          </h3>

          <div className="flex flex-col gap-1.5 text-xs text-textSecondary">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-accentBlue shrink-0" />
              <span>{stadium.city}, {stadium.country}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 text-accentGreen shrink-0" />
              <span>Capacity: {formatCapacity(stadium.capacity)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-textSecondary shrink-0" />
              <span>Opened: {stadium.opened}</span>
            </div>
          </div>

          {/* View Details */}
          <div className="flex items-center justify-end">
            <span className="text-[10px] text-accentGreen font-bold
                             tracking-widest uppercase opacity-0
                             group-hover:opacity-100 transition-opacity duration-200">
              View Details →
            </span>
          </div>
        </div>

      </Link>
    </motion.div>
  );
}
