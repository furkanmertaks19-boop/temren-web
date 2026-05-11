import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

const PATH = "/medya/foto";

export const metadata: Metadata = buildMetadata({
  title: "Foto Galeri | Temren Makina",
  description:
    "Temren Makina ürünleri, üretim tesisi, fuar etkinlikleri ve saha çalışmalarımızdan kareler.",
  path: PATH,
  keywords: ["Temren Makina foto", "ürün foto galeri", "fabrika fotoğrafları"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Anasayfa", path: "/" },
          { name: "Medya", path: "/medya/blog" },
          { name: "Foto Galeri", path: PATH },
        ])}
        id="foto-breadcrumb"
      />
      {children}
    </>
  );
}
