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

  // Render optimizasyonu
  output: "standalone",

  // Compression
  compress: true,

  // Güvenlik
  poweredByHeader: false,

  // Cache
  generateEtags: true,

  // Source map kapalı
  productionBrowserSourceMaps: false,

  // IMAGE CONFIG
  images: {
    // Next image optimizer tamamen kapalı
    unoptimized: true,
  },

  // EXPERIMENTAL
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
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