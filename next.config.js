/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  trailingSlash: true,
  output: "standalone",
  transpilePackages: ["@splinetool/react-spline"],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|gif|ico|css|js|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  compiler: {
    emotion: true,
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "react-icons"],
    scrollRestoration: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
