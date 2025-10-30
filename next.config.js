/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
       {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.output = {
        ...config.output,
        chunkLoadTimeout: 600000,
      };
    }
    return config;
  },
  experimental: {
    webpackBuildWorker: false,
  },
};

module.exports = nextConfig;
