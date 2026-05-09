'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { toSlug } from '@/utils/slugUtils';
import Badge from './Badge';

export default function NewsCard({ article, variant = 'standard', index = 0 }) {
  const slug = toSlug(article.title);
  const badgeColor = article.tagColor === 'accentBlue' ? 'blue' : 'green';

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-2xl overflow-hidden border border-white/5
                   hover:border-accentGreen/30 transition-colors duration-300 group"
      >
        <Link href={`/news/${slug}`}>
          {/* Image */}
          <div className="relative h-56 md:h-72 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bgCard via-bgCard/20 to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge text={article.tag} color={badgeColor} />
              <Badge text={article.category} color="gray" />
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col gap-3">
            <h2 className="font-bold text-lg text-white leading-snug
                           group-hover:text-accentGreen transition-colors duration-200">
              {article.title}
            </h2>
            <p className="text-textSecondary text-sm leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-textSecondary pt-2
                            border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accentGreen/20 flex items-center
                                justify-center text-accentGreen font-bold text-[10px]">
                  {article.author.charAt(0)}
                </div>
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Standard variant
  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors
                 duration-200 group cursor-pointer"
    >
      <Link href={`/news/${slug}`} className="flex gap-3 w-full">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Badge text={article.tag} color={badgeColor} />
          </div>
          <p className="text-sm font-semibold text-white leading-snug line-clamp-2
                        group-hover:text-accentGreen transition-colors duration-200">
            {article.title}
          </p>
          <div className="flex items-center justify-between text-[10px] text-textSecondary mt-1">
            <span>{article.date}</span>
            <div className="flex items-center gap-1 text-accentGreen opacity-0
                            group-hover:opacity-100 transition-opacity duration-200">
              <span>Read</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
