/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@splinetool/react-spline'],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    qualities: [25, 50, 75, 90, 100],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
};

module.exports = nextConfig;
