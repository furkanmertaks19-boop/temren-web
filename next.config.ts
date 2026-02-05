import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

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
