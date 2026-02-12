import type { NextConfig } from "next";

const nextConfig: NextConfig = { 
  reactStrictMode: false, 
  
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 🚀 QR KOD YÖNLENDİRMESİ
  async redirects() {
    return [
      {
        // Hem /temrenqr hem de /temrenqr/ linklerini yakalar
        source: '/temrenqr/:path*', 
        destination: '/qr-welcome',
        permanent: true, 
      },
    ]
  },
};

export default nextConfig;