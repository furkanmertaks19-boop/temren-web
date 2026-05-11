import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/kurumsal/musterigorusleri";

export const metadata: Metadata = buildMetadata({
  title: "Müşteri Görüşleri | Temren Makina",
  description:
    "Temren Makina çözümlerini kullanan müşterilerimizin deneyimleri, başarı hikayeleri ve referans yorumları.",
  path: PATH,
  keywords: [
    "Temren Makina müşteri görüşleri",
    "Temren Makina yorumlar",
    "kullanıcı deneyimleri",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
          { name: "Müşteri Görüşleri", path: PATH },
        ])}
        id="reviews-breadcrumb"
      />
      {children}
    </>
  );
}
