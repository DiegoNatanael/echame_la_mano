// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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