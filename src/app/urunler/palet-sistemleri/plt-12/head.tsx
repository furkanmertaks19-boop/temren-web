import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/palet-sistemleri/plt-12";
const CANONICAL = `${SITE_URL}${PATH}`;

// OG görsel (public/og içine koyduğun görsel)
const OG_IMAGE = `${SITE_URL}/og/plt12-13.webp`;

export const metadata: Metadata = {
  title: "PLT-12 Palet Sistemi | Endüstriyel Palet Çözümleri | Temren Makina",
  description:
    "PLT-12 palet sistemi; zorlu saha şartlarında yüksek çekiş ve dayanıklılık sağlayan endüstriyel palet çözümüdür. Teknik detaylar ve teklif talebi.",
  alternates: {
    canonical: CANONICAL,
  },

  openGraph: {
    title: "PLT-12 Palet Sistemi | Temren Makina",
    description:
      "PLT-12 palet sistemi ile zorlu arazi koşullarında maksimum stabilite ve performans.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "PLT-12 Palet Sistemi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PLT-12 Palet Sistemi | Temren Makina",
    description:
      "Zorlu çalışma şartları için tasarlanmış PLT-12 palet sistemi.",
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Head() {
  return null;
}