import type { MetadataRoute } from "next";
import { absoluteUrl, SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/private/",
          "/uploads/",
          "/qr-welcome",
          "/_next/",
          "/*?*", // Avoid duplicate-URL bloat from query strings.
        ],
      },
      // Be especially permissive to Googlebot for images & rich previews.
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/admin", "/api/", "/private/", "/uploads/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/image/", "/og/", "/uploads/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
