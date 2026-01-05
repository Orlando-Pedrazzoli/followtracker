/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de imagem otimizadas para SEO
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers de segurança e SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // Headers específicos para assets estáticos - cache longo
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Headers para sitemap e robots
        source: '/(sitemap.xml|robots.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ];
  },

  // Redirects para SEO (consistência de URLs)
  async redirects() {
    return [
      // Redirect de trailing slash para consistência de URLs
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },

  // Compressão habilitada
  compress: true,

  // Gerar ETags para melhor cache
  generateEtags: true,

  // PoweredByHeader removido por segurança
  poweredByHeader: false,

  // Strict mode para melhor qualidade de código
  reactStrictMode: true,

  // Trailing slash desabilitado para consistência de URLs
  trailingSlash: false,
};

module.exports = nextConfig;