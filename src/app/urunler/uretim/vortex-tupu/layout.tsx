import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/vortex-tupu";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/vortex_1.jpg`; // public/og içindeki gerçek dosya adına göre değiştir

export const metadata: Metadata = {
  title: "Vorteks Tüpü | Endüstriyel Soğutma Çözümü",
  description:
    "Temren Makina vorteks tüpü; basınçlı havayı hareketli parça olmadan anında soğuk akıma dönüştüren, bakım gerektirmeyen endüstriyel soğutma çözümüdür.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vorteks Tüpü | Endüstriyel Soğutma Çözümü | Temren Makina",
    description:
      "Basınçlı havayı anında soğuk akıma dönüştüren, kompakt ve bakım gerektirmeyen vorteks tüpü çözümü.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina Vorteks Tüpü",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vorteks Tüpü | Endüstriyel Soğutma Çözümü | Temren Makina",
    description:
      "Basınçlı havayı anında soğuk akıma dönüştüren kompakt vorteks tüpü çözümü.",
    images: [OG_IMAGE],
  },
};

export default function VortexTupuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}