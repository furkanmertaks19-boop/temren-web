import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/urunler/palet-sistemleri";

export const metadata: Metadata = buildMetadata({
  title:
    "Palet Sistemleri | Traktör, Araç & Endüstriyel Kauçuk Palet Çözümleri",
  description:
    "Temren Makina palet sistemleri; PLT-7'den PLT-18'e geniş ürün yelpazesi ile traktör, araç ve endüstriyel uygulamalar için yüksek dayanımlı kauçuk palet çözümleri.",
  path: PATH,
  keywords: [
    "palet sistemleri",
    "traktör palet sistemi",
    "araç palet sistemi",
    "kauçuk palet sistemi",
    "endüstriyel palet sistemi",
    "PLT-18",
    "PLT-17",
    "PLT-16",
  ],
});

const breadcrumb = breadcrumbSchema([
  { name: "Anasayfa", path: "/" },
  { name: "Ürünler", path: "/urunler" },
  { name: "Palet Sistemleri", path: PATH },
]);

export default function PaletSistemleriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumb} id="palet-sistemleri-breadcrumb" />
      {children}
    </>
  );
}
