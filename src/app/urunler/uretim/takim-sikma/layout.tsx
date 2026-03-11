import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/takim-sikma";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/takimsikma_1.jpg`;

export const metadata: Metadata = {
  title: "Takım Sıkma Sistemi | Üretim Ekipmanı",
  description:
    "Temren Makina takım sıkma sistemi; üretim süreçlerinde hızlı, güvenli ve tekrarlanabilir sıkma için geliştirilmiş kompakt ve verimli bir çözümdür.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Takım Sıkma Sistemi | Üretim Ekipmanı | Temren Makina",
    description:
      "Üretim süreçlerinde hızlı, güvenli ve tekrarlanabilir sıkma için kompakt takım sıkma sistemi.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "website",
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
    title: "Takım Sıkma Sistemi | Üretim Ekipmanı | Temren Makina",
    description:
      "Üretim süreçlerinde hızlı, güvenli ve tekrarlanabilir sıkma için kompakt takım sıkma sistemi.",
    images: [OG_IMAGE],
  },
};

export default function TakimSikmaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}