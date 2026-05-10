import teamsData    from '@/data/teams.json';
import stadiumsData from '@/data/stadiums.json';
import newsData     from '@/data/news.json';
import { SEO_CONFIG } from '@/lib/seo';
import { toSlug }   from '@/utils/slugUtils';

const BASE = SEO_CONFIG.siteUrl;

export default function sitemap() {
  const now = new Date().toISOString();

  // ── Static pages ──────────────────────────────
  const staticPages = [
    {
      url:             `${BASE}/`,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        1.0,
    },
    {
      url:             `${BASE}/livescore`,
      lastModified:    now,
      changeFrequency: 'always',  // Live scores change constantly
      priority:        0.9,
    },
    {
      url:             `${BASE}/schedule`,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        0.9,
    },
    {
      url:             `${BASE}/teams`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    {
      url:             `${BASE}/stadiums`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
    {
      url:             `${BASE}/news`,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        0.8,
    },
    {
      url:             `${BASE}/predictions`,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        0.7,
    },
    {
      url:             `${BASE}/about`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.4,
    },
    {
      url:             `${BASE}/contact`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.3,
    },
    {
      url:             `${BASE}/privacy`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.2,
    },
    {
      url:             `${BASE}/terms`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.2,
    },
  ];

  // ── Team pages ────────────────────────────────
  const teamPages = teamsData.map((team) => ({
    url:             `${BASE}/teams/${toSlug(team.name)}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.7,
  }));

  // ── Stadium pages ─────────────────────────────
  const stadiumPages = stadiumsData.map((stadium) => ({
    url:             `${BASE}/stadiums/${toSlug(stadium.name)}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.6,
  }));

  // ── News pages ────────────────────────────────
  const newsPages = newsData.map((article) => ({
    url:             `${BASE}/news/${toSlug(article.title)}`,
    lastModified:    new Date(article.date).toISOString(),
    changeFrequency: 'monthly',
    priority:        0.6,
  }));

  return [
    ...staticPages,
    ...teamPages,
    ...stadiumPages,
    ...newsPages,
  ];
}
