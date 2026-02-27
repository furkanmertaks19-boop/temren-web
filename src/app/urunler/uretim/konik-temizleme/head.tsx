import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/konik-temizleme";
const CANONICAL = `${SITE_URL}${PATH}`;

// ✅ OG görsel: public/og/konik_3.jpg (dosya adın farklıysa burayı değiştir)
const OG_IMAGE = `${SITE_URL}/og/konik_3.jpg`;

export const metadata: Metadata = {
  title: "Konik Temizleme | Üretim Temizleme Ekipmanı | Temren Makina",
  description:
    "Konik Temizleme; üretim süreçlerinde konik yüzeylerin etkili temizliği için pratik ve güvenilir çözümdür. Endüstriyel kullanım, teknik detaylar ve teklif talebi.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Konik Temizleme | Temren Makina",
    description:
      "Üretimde konik yüzeylerin etkili temizliği için pratik ve güvenilir konik temizleme çözümü.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina Konik Temizleme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konik Temizleme | Temren Makina",
    description:
      "Üretimde konik yüzeylerin etkili temizliği için pratik ve güvenilir çözüm.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function Head() {
  return null;
}