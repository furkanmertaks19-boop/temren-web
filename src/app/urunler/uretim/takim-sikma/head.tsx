import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/takim-sikma";
const CANONICAL = `${SITE_URL}${PATH}`;

// ✅ public/og/takimsikma_1.jpg
const OG_IMAGE = `${SITE_URL}/og/takimsikma_1.jpg`;

export const metadata: Metadata = {
  title: "Takım Sıkma Sistemi | Üretim Ekipmanı | Temren Makina",
  description:
    "Takım Sıkma Sistemi; üretim süreçlerinde hızlı, güvenli ve tekrarlanabilir sıkma için tasarlanmış kompakt çözümdür. Teknik detaylar ve teklif talebi.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Takım Sıkma Sistemi | Temren Makina",
    description:
      "Üretim süreçlerinde hızlı, güvenli ve tekrarlanabilir sıkma için kompakt takım sıkma sistemi.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina Takım Sıkma Sistemi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Takım Sıkma Sistemi | Temren Makina",
    description:
      "Üretim süreçlerinde hızlı, güvenli ve tekrarlanabilir sıkma için kompakt takım sıkma sistemi.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function Head() {
  return null;
}