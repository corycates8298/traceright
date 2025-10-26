/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure experimental features are explicitly defined if needed.
  experimental: {
    //
  },
};

module.exports = nextConfig;
