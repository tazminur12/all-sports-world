'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Eye } from 'lucide-react';

export default function ReelCard({ reel, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer
                 border border-white/5 hover:border-accentGreen/40
                 transition-colors duration-300"
      style={{ aspectRatio: '9/16', minWidth: '160px', maxWidth: '200px' }}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        <Image
          src={reel.thumbnail}
          alt={reel.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Tag badge */}
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-bold bg-black/60 backdrop-blur-sm
                         text-white px-2 py-0.5 rounded-full border border-white/10">
          {reel.tag}
        </span>
      </div>

      {/* Duration */}
      <div className="absolute top-3 right-3">
        <span className="text-[10px] font-bold bg-black/60 backdrop-blur-sm
                         text-white px-2 py-0.5 rounded-full">
          {reel.duration}
        </span>
      </div>

      {/* Play button — appears on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full bg-accentGreen/90 flex items-center
                        justify-center shadow-neon-green opacity-0 group-hover:opacity-100
                        transition-opacity duration-300">
          <Play className="w-5 h-5 text-bgPrimary fill-current" />
        </div>
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-xs font-semibold leading-tight line-clamp-2 mb-1.5">
          {reel.title}
        </p>
        <div className="flex items-center gap-1 text-textSecondary text-[10px]">
          <Eye className="w-3 h-3" />
          <span>{reel.views} views</span>
        </div>
      </div>
    </motion.div>
  );
}
