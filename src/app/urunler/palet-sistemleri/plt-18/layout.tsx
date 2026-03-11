import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/palet-sistemleri/plt-18";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/plt18_1.png`;

export const metadata: Metadata = {
  title: "PLT-18 Palet Sistemleri | Endüstriyel Palet Çözümü",
  description:
    "Temren Makina PLT-18 palet sistemi; zorlu saha koşullarında yüksek çekiş gücü, dayanıklılık ve verimlilik sağlayan endüstriyel paletli çözüm sunar.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "PLT-18 Palet Sistemleri | Endüstriyel Palet Çözümü | Temren Makina",
    description:
      "Zorlu saha koşulları için yüksek çekiş ve dayanıklılık sağlayan PLT-18 palet sistemi çözümü.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "website",
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
    title: "PLT-18 Palet Sistemleri | Endüstriyel Palet Çözümü | Temren Makina",
    description:
      "Zorlu saha koşulları için yüksek çekiş ve dayanıklılık sunan PLT-18 palet sistemi.",
    images: [OG_IMAGE],
  },
};

export default function PLT18Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}