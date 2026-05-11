import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/kurumsal/ihracatlarimiz";

export const metadata: Metadata = buildMetadata({
  title: "İhracatlarımız | Uluslararası Pazar | Temren Makina",
  description:
    "Temren Makina dünya geneline yaptığı ihracatlar ile uluslararası pazardaki gücünü her geçen gün artırıyor. İhracat yaptığımız ülkeler ve projeler.",
  path: PATH,
  keywords: [
    "Temren Makina ihracat",
    "Türkiye makina ihracatı",
    "endüstriyel ihracat",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
          { name: "İhracatlarımız", path: PATH },
        ])}
        id="ihracat-breadcrumb"
      />
      {children}
    </>
  );
}
