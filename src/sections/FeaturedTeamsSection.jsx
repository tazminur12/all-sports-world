'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import SectionHeader from '@/components/SectionHeader';
import TeamCard from '@/components/TeamCard';
import teamsData from '@/data/teams.json';

export default function FeaturedTeamsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <SectionHeader
          eyebrow="🏆 Competing Nations"
          title="Featured"
          highlight="Teams"
          subtitle="The world's best nations competing for the ultimate prize."
        />
        <Link href="/teams" className="btn-secondary text-sm whitespace-nowrap">
          All 48 Teams →
        </Link>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="pb-12"
      >
        {teamsData.map((team, i) => (
          <SwiperSlide key={team.id}>
            <TeamCard team={team} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
