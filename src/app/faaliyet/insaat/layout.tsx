import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/faaliyet/insaat";

export const metadata: Metadata = buildMetadata({
  title: "İnşaat Faaliyetlerimiz | Endüstriyel Yapılar | Temren Makina",
  description:
    "Temren Makina'nın inşaat faaliyetleri: fabrika tesisi inşaatı, endüstriyel yapı çözümleri ve mühendislik destekli proje yönetimi.",
  path: PATH,
  keywords: [
    "endüstriyel inşaat",
    "fabrika inşaatı",
    "Temren Makina inşaat",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Faaliyet Alanları", path: "/faaliyet/uretim" },
          { name: "İnşaat", path: PATH },
        ])}
        id="faaliyet-insaat-breadcrumb"
      />
      {children}
    </>
  );
}
