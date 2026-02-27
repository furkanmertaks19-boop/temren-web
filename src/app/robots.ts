import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        // Google'ın gereksiz crawl yapmasını engelliyoruz
        disallow: [
          "/admin",
          "/api",
          "/private",
          "/uploads",
          "/qr-welcome",
        ],
      },
    ],

    sitemap: "https://temrenmakina.com/sitemap.xml",
  };
}