import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/byk1000";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/byk1000.jpg`;

export const metadata: Metadata = {
  title: "BYK1000 | Endüstriyel Üretim Ekipmanı",
  description:
    "Temren Makina BYK1000 üretim ekipmanı; endüstriyel üretim süreçleri için dayanıklı yapı, yüksek verimlilik ve güvenilir performans sunar.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "BYK1000 | Endüstriyel Üretim Ekipmanı | Temren Makina",
    description:
      "BYK1000 üretim ekipmanı; dayanıklı yapı, yüksek verimlilik ve endüstriyel kullanım için geliştirilmiş çözüm.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina BYK1000",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BYK1000 | Endüstriyel Üretim Ekipmanı | Temren Makina",
    description:
      "BYK1000 üretim ekipmanı; dayanıklı yapı ve verimli üretim süreçleri için geliştirilmiş endüstriyel çözüm.",
    images: [OG_IMAGE],
  },
};

export default function BYK1000Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}