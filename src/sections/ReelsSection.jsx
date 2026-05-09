'use client';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import SectionHeader from '@/components/SectionHeader';
import ReelCard from '@/components/ReelCard';
import reelsData from '@/data/reels.json';

export default function ReelsSection() {
  return (
    <section className="py-20 bg-bgCard/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="🎥 Highlights"
          title="Reels &"
          highlight="Moments"
          subtitle="Top clips, goals, and viral moments from World Cup 2026."
        />

        <Swiper
          modules={[FreeMode]}
          spaceBetween={16}
          slidesPerView="auto"
          freeMode={{ enabled: true, momentum: true }}
          grabCursor
          className="!overflow-visible"
        >
          {reelsData.map((reel, i) => (
            <SwiperSlide
              key={reel.id}
              style={{ width: 'auto' }}
              className="!h-auto"
            >
              <ReelCard reel={reel} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-white/5"
        >
          {[
            { value: '50M+',  label: 'Total Views'    },
            { value: '200+',  label: 'Highlight Clips' },
            { value: '48',    label: 'Nations'         },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="font-display text-2xl text-accentGreen">{value}</span>
              <span className="text-[10px] text-textSecondary tracking-widest uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
