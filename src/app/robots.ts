import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.followerscan.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/analyze',
          '/_next/',
          '/auth/sign-in',
          '/*.json$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/pricing',
          '/tutorial',
          '/sample',
          '/faq',
          '/auth/sign-up',
        ],
        disallow: [
          '/api/',
          '/dashboard/',
          '/analyze',
          '/_next/',
          '/auth/sign-in',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/analyze',
          '/_next/',
          '/auth/sign-in',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}