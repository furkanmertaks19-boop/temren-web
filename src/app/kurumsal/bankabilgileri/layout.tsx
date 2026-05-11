import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/kurumsal/bankabilgileri";

export const metadata: Metadata = buildMetadata({
  title: "Banka Bilgileri | Temren Makina",
  description:
    "Temren Makina banka hesap bilgileri. Ödeme bilgilerine güvenli şekilde erişin.",
  path: PATH,
  // Banking info isn't really a marketing page — keep it accessible but
  // don't actively try to rank for it.
  index: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
          { name: "Banka Bilgileri", path: PATH },
        ])}
        id="banka-breadcrumb"
      />
      {children}
    </>
  );
}
