import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/faaliyet/uretim";

export const metadata: Metadata = buildMetadata({
  title: "Üretim Faaliyetlerimiz | Talaşlı İmalat & Hassas Üretim",
  description:
    "Temren Makina'nın üretim faaliyetleri: CNC işleme, talaşlı imalat, kaynak, montaj ve özel üretim süreçleri ile yüksek hassasiyetli endüstriyel çözümler.",
  path: PATH,
  keywords: [
    "talaşlı imalat",
    "CNC üretim",
    "hassas üretim",
    "Temren Makina üretim",
    "endüstriyel imalat",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Faaliyet Alanları", path: PATH },
          { name: "Üretim", path: PATH },
        ])}
        id="faaliyet-uretim-breadcrumb"
      />
      {children}
    </>
  );
}
