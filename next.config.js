/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true, // ✅ সব external images কাজ করবে
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'flagcdn.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'plus.unsplash.com',
          pathname: '/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  