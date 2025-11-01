
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // Disable server-side features for static export
  async rewrites() {
    return []
  },
  async redirects() {
    return []
  },
  async headers() {
    return []
  }
};

export default nextConfig;