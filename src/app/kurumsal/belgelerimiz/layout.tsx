import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/kurumsal/belgelerimiz";

export const metadata: Metadata = buildMetadata({
  title: "Belgelerimiz & Sertifikalarımız | Temren Makina",
  description:
    "Temren Makina'nın kalite belgeleri, ISO sertifikaları ve uluslararası akreditasyonları. Yüksek standartlarda üretim için aldığımız onaylar.",
  path: PATH,
  keywords: [
    "Temren Makina belgeler",
    "ISO sertifika",
    "kalite belgeleri",
    "endüstriyel sertifikasyon",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
          { name: "Belgelerimiz", path: PATH },
        ])}
        id="belgelerimiz-breadcrumb"
      />
      {children}
    </>
  );
}
