import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/mini-takim-boy-olcer";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/takimboy_1.jpg`;

export const metadata: Metadata = {
  title: "Mini Takım Boy Ölçer | Üretim Ölçüm Ekipmanı",
  description:
    "Temren Makina mini takım boy ölçer; üretimde takım boyu ölçümü ve hassas ayar işlemleri için kompakt, hızlı ve güvenilir bir ölçüm çözümüdür.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mini Takım Boy Ölçer | Üretim Ölçüm Ekipmanı | Temren Makina",
    description:
      "Üretimde takım boyu ölçümü için kompakt ve pratik mini takım boy ölçer çözümü.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina Mini Takım Boy Ölçer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mini Takım Boy Ölçer | Üretim Ölçüm Ekipmanı | Temren Makina",
    description:
      "Üretimde takım boyu ölçümü için kompakt ve pratik mini takım boy ölçer çözümü.",
    images: [OG_IMAGE],
  },
};

export default function MiniTakimBoyOlcerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}