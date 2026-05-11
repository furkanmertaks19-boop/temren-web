import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/kurumsal/insankaynaklari";

export const metadata: Metadata = buildMetadata({
  title: "İnsan Kaynakları | Kariyer Fırsatları | Temren Makina",
  description:
    "Temren Makina'da kariyer yapmak ister misiniz? Açık pozisyonlar, çalışan değerlerimiz ve başvuru süreci hakkında bilgi alın.",
  path: PATH,
  keywords: [
    "Temren Makina kariyer",
    "Ankara makina iş ilanları",
    "endüstriyel kariyer",
    "Temren Makina insan kaynakları",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
          { name: "İnsan Kaynakları", path: PATH },
        ])}
        id="hr-breadcrumb"
      />
      {children}
    </>
  );
}
