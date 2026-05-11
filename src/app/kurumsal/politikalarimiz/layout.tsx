import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/kurumsal/politikalarimiz";

export const metadata: Metadata = buildMetadata({
  title: "Politikalarımız | Kalite, Çevre, İSG | Temren Makina",
  description:
    "Temren Makina kalite, çevre, iş sağlığı ve güvenliği politikalarımız. Sürdürülebilir üretim ve etik değerlerimize bağlılığımızın taahhüdü.",
  path: PATH,
  keywords: [
    "kalite politikası",
    "çevre politikası",
    "İSG politikası",
    "Temren Makina politika",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
          { name: "Politikalarımız", path: PATH },
        ])}
        id="politikalar-breadcrumb"
      />
      {children}
    </>
  );
}
