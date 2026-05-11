import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/kurumsal/e-katalog";

export const metadata: Metadata = buildMetadata({
  title: "E-Katalog | Ürün Katalogları | Temren Makina",
  description:
    "Temren Makina ürün katalogları — palet sistemleri, CNC ekipmanları, üretim çözümleri ve daha fazlasının dijital katalogları.",
  path: PATH,
  keywords: [
    "Temren Makina katalog",
    "ürün kataloğu",
    "palet sistemi kataloğu",
    "endüstriyel katalog",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
          { name: "E-Katalog", path: PATH },
        ])}
        id="ekatalog-breadcrumb"
      />
      {children}
    </>
  );
}
