/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    staticPageGenerationTimeout: 60000,
  },
};

module.exports = nextConfig;
