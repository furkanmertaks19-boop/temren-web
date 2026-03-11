import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/palet-sistemleri/plt-12";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/plt12-13.webp`;

export const metadata: Metadata = {
  title: "PLT-12 Palet Sistemi | Endüstriyel Palet Çözümü",
  description:
    "Temren Makina PLT-12 palet sistemi; zorlu arazi ve saha koşullarında yüksek çekiş gücü, stabilite ve dayanıklılık sağlayan endüstriyel palet çözümüdür.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "PLT-12 Palet Sistemi | Endüstriyel Palet Çözümü | Temren Makina",
    description:
      "PLT-12 palet sistemi ile zorlu arazi koşullarında maksimum stabilite, çekiş ve dayanıklılık.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina PLT-12 Palet Sistemi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PLT-12 Palet Sistemi | Endüstriyel Palet Çözümü | Temren Makina",
    description:
      "Zorlu saha koşullarında yüksek çekiş ve dayanıklılık sağlayan PLT-12 palet sistemi.",
    images: [OG_IMAGE],
  },
};

export default function PLT12Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}