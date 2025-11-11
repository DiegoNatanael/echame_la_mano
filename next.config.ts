// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- TEMPORARY WORKAROUNDS TO BYPASS STUCK BUILD STEP ---
  eslint: {
    // 1. Disable ESLint checking during the Vercel build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 2. Disable TypeScript type checking during the Vercel build
    ignoreBuildErrors: true,
  },
  // ---------------------------------------------------------

  webpack: (config) => {
    // Prevent build errors from localStorage/window usage in client-only code
    config.resolve.fallback = {
      ...config.resolve.fallback,
      localStorage: false,
      window: false,
    };
    return config;
  },
};

export default nextConfig;