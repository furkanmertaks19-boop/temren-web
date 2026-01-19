import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Üst üste render (çift root) hatasını önlemek için eklendi
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
};

export default nextConfig;