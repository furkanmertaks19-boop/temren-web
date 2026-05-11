import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/kurumsal/hakkimizda";

export const metadata: Metadata = buildMetadata({
  title: "Hakkımızda | Temren Makina",
  description:
    "Temren Makina; Ankara merkezli, savunma ve endüstri sektörlerine yüksek hassasiyetli üretim çözümleri sunan mühendislik firmasıdır. Hikayemizi ve değerlerimizi keşfedin.",
  path: PATH,
  keywords: [
    "Temren Makina hakkımızda",
    "Temren Makina hikaye",
    "Ankara endüstriyel firma",
    "savunma sanayi üretici",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
          { name: "Hakkımızda", path: PATH },
        ])}
        id="hakkimizda-breadcrumb"
      />
      {children}
    </>
  );
}
