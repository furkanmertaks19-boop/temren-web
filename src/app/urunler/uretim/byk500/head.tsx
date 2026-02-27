import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/byk500";
const CANONICAL = `${SITE_URL}${PATH}`;

// ✅ OG görsel: public/og/byk500_1.jpg (farklıysa burayı değiştir)
const OG_IMAGE = `${SITE_URL}/og/byk500_1.jpg`;

export const metadata: Metadata = {
  title: "BYK500 | Üretim Ekipmanı | Temren Makina",
  description:
    "BYK500; üretim süreçlerinde verimlilik ve dayanıklılık odaklı endüstriyel çözüm. Teknik detaylar ve teklif talebi için Temren Makina ile iletişime geçin.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "BYK500 | Temren Makina",
    description:
      "BYK500 üretim ekipmanı: endüstriyel süreçlere uygun, dayanıklı ve verimli çözüm.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina BYK500",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BYK500 | Temren Makina",
    description:
      "BYK500 üretim ekipmanı: endüstriyel süreçlere uygun, dayanıklı ve verimli çözüm.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function Head() {
  return null;
}