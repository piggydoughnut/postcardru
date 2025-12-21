/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable source maps in production to avoid dev server connections
  productionBrowserSourceMaps: false,
  // Explicitly disable dev indicators and features
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },
  // Ensure production optimizations
  swcMinify: true,
};

module.exports = nextConfig;
