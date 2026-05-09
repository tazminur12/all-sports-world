'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import SectionHeader from '@/components/SectionHeader';
import StadiumCard from '@/components/StadiumCard';
import stadiumsData from '@/data/stadiums.json';
import { formatCapacity } from '@/utils/formatUtils';

const totalCapacity = stadiumsData.reduce((acc, s) => acc + s.capacity, 0);

export default function StadiumShowcaseSection() {
  return (
    <section className="py-20 bg-bgCard/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeader
            eyebrow="🏟️ World Cup Venues"
            title="Iconic"
            highlight="Stadiums"
            subtitle={`${stadiumsData.length} legendary venues across USA, Canada & Mexico.`}
          />

          {/* Stats */}
          <div className="flex gap-6">
            <div className="flex flex-col items-end">
              <span className="font-display text-2xl text-accentGreen">
                {formatCapacity(totalCapacity)}
              </span>
              <span className="text-[10px] text-textSecondary tracking-widest uppercase">
                Total Capacity
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-display text-2xl text-accentBlue">
                {stadiumsData.length}
              </span>
              <span className="text-[10px] text-textSecondary tracking-widest uppercase">
                Venues
              </span>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {stadiumsData.map((stadium, i) => (
            <SwiperSlide key={stadium.id}>
              <StadiumCard stadium={stadium} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nav buttons */}
        <div className="flex justify-center gap-3 mt-2">
          <button className="swiper-prev w-10 h-10 rounded-full glass border border-white/10
                             flex items-center justify-center text-textSecondary
                             hover:text-accentGreen hover:border-accentGreen/40
                             transition-all duration-200">
            ←
          </button>
          <button className="swiper-next w-10 h-10 rounded-full glass border border-white/10
                             flex items-center justify-center text-textSecondary
                             hover:text-accentGreen hover:border-accentGreen/40
                             transition-all duration-200">
            →
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <Link href="/stadiums" className="btn-secondary text-sm">
            Explore All Stadiums →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
