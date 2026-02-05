import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // ✅ Render için önerilen: standalone build üretir
  // Bu sayede `node .next/standalone/server.js` ile çalışır
  output: "standalone",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // 🚀 QR KOD YÖNLENDİRMESİ
  async redirects() {
    return [
      {
        source: "/temrenqr/:path*",
        destination: "/iletisim",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
