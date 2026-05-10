import { SEO_CONFIG } from '@/lib/seo';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/', '/_next/', '/private/'],
      },
      {
        // Google specifically
        userAgent: 'Googlebot',
        allow:     '/',
        disallow:  ['/api/'],
      },
    ],
    sitemap:    `${SEO_CONFIG.siteUrl}/sitemap.xml`,
    host:       SEO_CONFIG.siteUrl,
  };
}
