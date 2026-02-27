import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/palet-sistemleri/plt-18";
const CANONICAL = `${SITE_URL}${PATH}`;

// ✅ OG görsel: public/og/plt18_1.jpg (dosya adın farklıysa burayı değiştir)
const OG_IMAGE = `${SITE_URL}/og/plt18_1.png`;

export const metadata: Metadata = {
  title: "PLT-18 Palet Sistemleri | Endüstriyel Çözüm | Temren Makina",
  description:
    "PLT-18 palet sistemleri; zorlu saha koşullarında yüksek çekiş, dayanıklılık ve verim için tasarlanmış endüstriyel paletli çözüm. Teknik detaylar ve teklif talebi.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "PLT-18 Palet Sistemleri | Temren Makina",
    description:
      "Zorlu koşullar için yüksek çekiş ve dayanıklılık sunan PLT-18 palet sistemi çözümü.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina PLT-18 Palet Sistemi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PLT-18 Palet Sistemleri | Temren Makina",
    description:
      "Zorlu koşullar için yüksek çekiş ve dayanıklılık sunan PLT-18 palet sistemi.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function Head() {
  return null;
}