/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ← REQUIRED for Cloud Run
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;