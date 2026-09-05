import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'standalone',
  sassOptions: {
    loadPaths: [path.join(process.cwd(), 'src')],
  },
  experimental: {
    optimizePackageImports: [
      '@reduxjs/toolkit',
      '@tanstack/react-query',
      'framer-motion',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'softstar.s3.amazonaws.com',
        pathname: '/items/**',
      },
    ],
  },
};

export default nextConfig;
