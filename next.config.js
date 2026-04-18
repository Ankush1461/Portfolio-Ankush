/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@splinetool/react-spline'],
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};


module.exports = nextConfig;
