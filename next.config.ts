
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    appNewScrollHandler: true,
  },
  allowedDevOrigins: ['127.0.0.1'],
  poweredByHeader: false,
};

export default nextConfig;