import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/konik-temizleme";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/konik_3.jpg`;

export const metadata: Metadata = {
  title: "Konik Temizleme | Üretim Temizleme Ekipmanı",
  description:
    "Temren Makina konik temizleme sistemi; üretim süreçlerinde konik yüzeylerin hızlı, etkili ve güvenilir şekilde temizlenmesi için geliştirilmiş endüstriyel bir çözümdür.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Konik Temizleme | Üretim Temizleme Ekipmanı | Temren Makina",
    description:
      "Üretimde konik yüzeylerin etkili temizliği için pratik ve güvenilir konik temizleme çözümü.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "website",
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
    title: "Konik Temizleme | Üretim Temizleme Ekipmanı | Temren Makina",
    description:
      "Üretimde konik yüzeylerin etkili temizliği için pratik ve güvenilir çözüm.",
    images: [OG_IMAGE],
  },
};

export default function KonikTemizlemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}