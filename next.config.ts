import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@reduxjs/toolkit', '@tanstack/react-query'],
  },
};

export default nextConfig;
