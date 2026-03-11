import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/vakumlu-tabla";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/vakum_5.JPG`;

export const metadata: Metadata = {
  title: "Vakumlu Tabla | CNC Vakum Tablası",
  description:
    "Temren Makina vakumlu tabla çözümleri; CNC ve üretim süreçlerinde yüksek tutuş gücü, stabil işleme ve pratik kullanım avantajları sunar.",
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vakumlu Tabla | CNC Vakum Tablası | Temren Makina",
    description:
      "CNC ve üretim süreçleri için vakum tablası. Stabil işleme, yüksek tutuş ve pratik kullanım avantajları sunar.",
    url: CANONICAL,
    siteName: "Temren Makina",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina Vakumlu Tabla",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vakumlu Tabla | CNC Vakum Tablası | Temren Makina",
    description:
      "CNC ve üretim süreçleri için vakum tablası. Stabil işleme, yüksek tutuş ve pratik kullanım avantajları sunar.",
    images: [OG_IMAGE],
  },
};

export default function VakumluTablaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}