import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/vakumlu-tabla";
const CANONICAL = `${SITE_URL}${PATH}`;

// ✅ Senin dosya: public/og/vakum_5.JPG
const OG_IMAGE = `${SITE_URL}/og/vakum_5.JPG`;

export const metadata: Metadata = {
  title: "Vakumlu Tabla | CNC Vakum Tablası | Temren Makina",
  description:
    "CNC ve üretim süreçleri için Vakumlu Tabla (Vakum Tablası). Yüksek tutuş gücü, stabil işleme ve pratik kullanım. Teknik detaylar ve teklif talebi.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Vakumlu Tabla | Temren Makina",
    description:
      "CNC ve üretim süreçleri için vakum tablası. Stabil işleme, yüksek tutuş ve pratik kullanım.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina Vakumlu Tabla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vakumlu Tabla | Temren Makina",
    description:
      "CNC ve üretim süreçleri için vakum tablası. Stabil işleme, yüksek tutuş ve pratik kullanım.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function Head() {
  return null;
}