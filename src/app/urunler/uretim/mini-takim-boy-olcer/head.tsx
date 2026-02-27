import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/mini-takim-boy-olcer";
const CANONICAL = `${SITE_URL}${PATH}`;

// ✅ public/og/takimboy_1.jpg
const OG_IMAGE = `${SITE_URL}/og/takimboy_1.jpg`;

export const metadata: Metadata = {
  title: "Mini Takım Boy Ölçer | Üretim Ölçüm Ekipmanı | Temren Makina",
  description:
    "Mini Takım Boy Ölçer; üretimde takım boyu ölçümü ve tekrarlanabilir ayar için kompakt çözüm. Hızlı kurulum, pratik kullanım ve teklif talebi.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Mini Takım Boy Ölçer | Temren Makina",
    description:
      "Üretimde takım boyu ölçümü için kompakt ve pratik mini takım boy ölçer çözümü.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "article",
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
    title: "Mini Takım Boy Ölçer | Temren Makina",
    description:
      "Üretimde takım boyu ölçümü için kompakt ve pratik mini takım boy ölçer çözümü.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function Head() {
  return null;
}