import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/kurumsal/referanslarimiz";

export const metadata: Metadata = buildMetadata({
  title: "Referanslarımız | Temren Makina",
  description:
    "Temren Makina'nın yıllardır birlikte çalıştığı kurumsal müşteriler ve referanslarımız. Savunma sanayi, tarım ve endüstride güvenilir iş ortağınız.",
  path: PATH,
  keywords: [
    "Temren Makina referansları",
    "Temren Makina müşterileri",
    "savunma sanayi referans",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
          { name: "Referanslarımız", path: PATH },
        ])}
        id="referanslar-breadcrumb"
      />
      {children}
    </>
  );
}
