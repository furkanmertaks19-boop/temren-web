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

  // Gzip/brotli at the framework level.
  compress: true,

  // Removes the `X-Powered-By: Next.js` header — small security win.
  poweredByHeader: false,

  // Generate ETag headers for browser caching.
  generateEtags: true,

  // ─── IMAGE OPTIMIZATION ───────────────────────────────────────────
  // We rely on Next's built-in image optimizer: AVIF/WebP, responsive
  // srcset, automatic lazy-loading and long-term caching.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384],
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

  // ─── EXPERIMENTAL ─────────────────────────────────────────────────
  experimental: {
    // Tree-shake icon packs and other heavy libs.
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
      "react-icons",
    ],
  },

  // ─── HEADERS ──────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // ─── REDIRECTS ────────────────────────────────────────────────────
  async redirects() {
    return [
      {
        // QR-Code şort redirect (keeps single canonical destination).
        source: "/temrenqr/:path*",
        destination: "/qr-welcome",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
