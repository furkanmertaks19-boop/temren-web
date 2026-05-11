import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/medya/video";

export const metadata: Metadata = buildMetadata({
  title: "Video Galeri | Tanıtım ve Saha Videoları | Temren Makina",
  description:
    "Temren Makina ürün tanıtım videoları, saha test çekimleri ve üretim hattından canlı videolar.",
  path: PATH,
  keywords: [
    "Temren Makina video",
    "palet sistemi videolar",
    "saha videosu",
    "ürün tanıtım video",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Medya", path: "/medya/blog" },
          { name: "Video Galeri", path: PATH },
        ])}
        id="video-breadcrumb"
      />
      {children}
    </>
  );
}
