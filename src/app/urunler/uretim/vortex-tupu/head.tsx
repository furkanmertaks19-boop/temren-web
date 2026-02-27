import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/vortex-tupu";
const CANONICAL = `${SITE_URL}${PATH}`;

// ✅ Senin klasör: public/og/vortex_1.webp
const OG_IMAGE = `${SITE_URL}/og/vortex_1.webp`;

export const metadata: Metadata = {
  title: "Vorteks Tüpü | Endüstriyel Soğutma | Temren Makina",
  description:
    "Basınçlı havayı hareketli parça olmadan anında soğuk akıma dönüştüren Vorteks Tüpü. CNC, elektronik bileşen ve endüstriyel soğutma uygulamaları için kompakt çözüm.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Vorteks Tüpü | Temren Makina",
    description:
      "Basınçlı hava ile çalışan, bakım gerektirmeyen kompakt endüstriyel soğutma çözümü.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "article",
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
    title: "Vorteks Tüpü | Temren Makina",
    description:
      "Basınçlı hava ile çalışan, bakım gerektirmeyen kompakt endüstriyel soğutma çözümü.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function Head() {
  return null;
}