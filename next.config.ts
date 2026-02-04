import type { NextConfig } from "next";

const nextConfig: NextConfig = { 
  reactStrictMode: false, // Mevcut tercihin
  
  // Statik export sırasında Next.js yerel resim optimizasyonunu kullanamaz
  // Bu yüzden Cloudinary veya uzak resim yolları için bu ayar şarttır
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
};

export default nextConfig;