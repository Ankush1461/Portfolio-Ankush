/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@splinetool/react-spline'],
  poweredByHeader: false,
  compiler: {
    emotion: true,
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 100],
    minimumCacheTTL: 31536000,
  },
};

module.exports = nextConfig;
