import Image from 'next/image';
import Link  from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';

import newsData   from '@/data/news.json';
import NewsCard   from '@/components/NewsCard';
import Badge      from '@/components/Badge';
import { toSlug } from '@/utils/slugUtils';
import { buildTwitterMeta, SEO_CONFIG } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { slug }   = await params;
  const article    = newsData.find((n) => toSlug(n.title) === slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title:       `${article.title} | All Sports World`,
    description: article.excerpt,
    keywords: [
      article.category,
      'World Cup 2026',
      'FIFA 2026',
      article.tag,
      'football news',
    ],
    authors:   [{ name: article.author }],
    publishedTime: new Date(article.date).toISOString(),
    alternates: {
      canonical: `${SEO_CONFIG.siteUrl}/news/${slug}`,
    },
    openGraph: {
      type:            'article',
      url:             `${SEO_CONFIG.siteUrl}/news/${slug}`,
      title:           article.title,
      description:     article.excerpt,
      siteName:        'All Sports World',
      publishedTime:   new Date(article.date).toISOString(),
      authors:         [article.author],
      tags:            [article.category, 'World Cup 2026', 'FIFA'],
      images: [
        {
          url:    article.image,
          width:  800,
          height: 450,
          alt:    article.title,
        },
      ],
    },
    twitter: buildTwitterMeta({
      title:       article.title,
      description: article.excerpt,
      image:       article.image,
    }),
  };
}


export async function generateStaticParams() {
  return newsData.map((article) => ({ slug: toSlug(article.title) }));
}

// Dummy article body paragraphs
const ARTICLE_BODY = [
  `The anticipation surrounding this year's tournament has reached fever pitch, as fans from every corner of the globe prepare to witness football history. With 48 nations competing across three host countries for the first time, the scale of FIFA World Cup 2026 is unprecedented.`,
  `Analysts and former players alike have weighed in on the tactical battles that will define this summer's competition. From the pressing intensity of European sides to the technical flair of South American giants, the group stage promises to deliver unforgettable moments.`,
  `Stadium infrastructure across the United States, Canada, and Mexico has been upgraded to world-class standards, with each venue offering a unique atmosphere. MetLife Stadium in New Jersey — confirmed as the Final venue — is set to become the site of one of football's most historic nights.`,
  `As preparations intensify, team managers are finalizing their squads and tactical setups. The competition for places has never been fiercer, with emerging talents pushing established stars for starting positions across every squad.`,
  `History will be written across 104 matches spanning five weeks. For players, coaches, and fans, this represents the pinnacle of the beautiful game — a chance to etch their names into football's eternal record forever.`,
];

export default function ArticleDetailPage({ params }) {
  const article = newsData.find((n) => toSlug(n.title) === params.slug);
  if (!article) notFound();

  const related = newsData
    .filter((n) => n.id !== article.id && n.category === article.category)
    .slice(0, 3);

  const badgeColor = article.tagColor === 'accentBlue' ? 'blue' : 'green';

  return (
    <div className="min-h-screen pt-20 pb-20">

      {/* ── Hero Image ── */}
      <div className="relative h-64 sm:h-96 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bgPrimary/60 via-transparent to-bgPrimary" />

        {/* Back button */}
        <div className="absolute top-6 left-4 sm:left-8">
          <Link
            href="/news"
            className="flex items-center gap-2 text-sm text-textSecondary
                       hover:text-white glass px-4 py-2 rounded-full border
                       border-white/10 hover:border-white/30 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            All News
          </Link>
        </div>
      </div>

      {/* ── Article Content ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-10 flex flex-col gap-8">

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge text={article.tag}      color={badgeColor} />
          <Badge text={article.category} color="gray"       />
        </div>

        {/* Title */}
        <h1 className="font-bold text-2xl sm:text-4xl text-white leading-tight">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-6 text-xs text-textSecondary
                        pb-6 border-b border-white/10 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-accentGreen/20 flex items-center
                            justify-center text-accentGreen font-bold text-sm">
              {article.author.charAt(0)}
            </div>
            <span className="font-medium text-white">{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-textSecondary text-base leading-relaxed font-medium italic
                      border-l-2 border-accentGreen pl-4">
          {article.excerpt}
        </p>

        {/* Article body */}
        <div className="flex flex-col gap-5">
          {ARTICLE_BODY.map((para, i) => (
            <p key={i} className="text-textSecondary text-sm leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/10 flex-wrap">
          <span className="text-xs text-textSecondary">Tags:</span>
          {['World Cup 2026', article.category, 'FIFA', 'Football'].map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full glass border border-white/10
                         text-textSecondary hover:text-accentGreen hover:border-accentGreen/30
                         transition-colors duration-200 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
          <h2 className="font-display text-2xl tracking-wider text-white mb-6">
            RELATED{' '}
            <span className="neon-text-green">ARTICLES</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rel, i) => (
              <NewsCard key={rel.id} article={rel} variant="featured" index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Back CTA */}
      <div className="flex justify-center mt-12">
        <Link href="/news" className="btn-secondary text-sm">
          ← Back to All News
        </Link>
      </div>
    </div>
  );
}
