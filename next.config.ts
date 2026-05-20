import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // Render RAM optimizasyonu
  output: "standalone",

  // Compression
  compress: true,

  // Security
  poweredByHeader: false,

  // Cache
  generateEtags: true,

  // Production source maps kapalı
  productionBrowserSourceMaps: false,

  // IMAGE OPTIMIZATION
  images: {
    // Render düşük RAM için önemli
    unoptimized: true,

    formats: ["image/avif", "image/webp"],

    minimumCacheTTL: 60 * 60 * 24 * 30,

    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1440, 1920],

    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256],

    dangerouslyAllowSVG: false,

    contentDispositionType: "attachment",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // EXPERIMENTAL
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
      "react-icons",
    ],
  },

  // SECURITY HEADERS
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // REDIRECTS
  async redirects() {
    return [
      {
        source: "/temrenqr/:path*",
        destination: "/qr-welcome",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;