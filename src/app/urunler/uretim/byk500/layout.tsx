import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/byk500";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/byk500_1.jpg`;

export const metadata: Metadata = {
  title: "BYK500 | Endüstriyel Üretim Ekipmanı",
  description:
    "Temren Makina BYK500 üretim ekipmanı; endüstriyel üretim süreçlerinde dayanıklılık, verimlilik ve güvenilir performans sunan kompakt bir çözümdür.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "BYK500 | Endüstriyel Üretim Ekipmanı | Temren Makina",
    description:
      "BYK500 üretim ekipmanı; endüstriyel süreçlere uygun, dayanıklı ve verimli kullanım sunan çözüm.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "website",
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
    title: "BYK500 | Endüstriyel Üretim Ekipmanı | Temren Makina",
    description:
      "BYK500 üretim ekipmanı; dayanıklı yapı ve verimli endüstriyel kullanım için geliştirilmiş çözüm.",
    images: [OG_IMAGE],
  },
};

export default function BYK500Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}