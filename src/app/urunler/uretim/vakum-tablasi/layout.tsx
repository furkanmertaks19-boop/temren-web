import type { Metadata } from "next";

const SITE_URL = "https://temrenmakina.com";
const PATH = "/urunler/uretim/vakum-tablasi";
const CANONICAL = `${SITE_URL}${PATH}`;
const OG_IMAGE = `${SITE_URL}/og/vakum_5.JPG`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "CNC Vakum Tablası ve Vakumlu Tabla Üretimi | Temren Makina",
    template: "%s | Temren Makina",
  },

  description:
    "Temren Makina; CNC vakum tablası, vakumlu tabla ve özel ölçü vakum tabla çözümleri üretir. Hassas sabitleme, yüksek tutuş gücü ve stabil işleme avantajı sunar.",

  keywords: [
    "vakum tablası",
    "vakumlu tabla",
    "CNC vakum tablası",
    "CNC vakumlu tabla",
    "vakum tabla",
    "vakumlu tabla üretimi",
    "CNC vakum tabla üretimi",
    "özel ölçü vakum tablası",
    "alüminyum vakum tablası",
    "hassas vakum tablası",
    "CNC bağlama sistemleri",
    "CNC sabitleme sistemi",
    "talaşlı imalat vakum tablası",
    "freze vakum tablası",
    "Temren Makina vakum tablası",
    "Ankara vakum tablası üretimi",
  ],

  alternates: {
    canonical: CANONICAL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: CANONICAL,
    siteName: "Temren Makina",
    title: "CNC Vakum Tablası ve Vakumlu Tabla Üretimi | Temren Makina",
    description:
      "CNC tezgahlar için vakum tablası ve vakumlu tabla çözümleri. Özel ölçü üretim, yüksek tutuş gücü, hassas sabitleme ve stabil işleme avantajı.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina CNC Vakum Tablası ve Vakumlu Tabla",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CNC Vakum Tablası ve Vakumlu Tabla | Temren Makina",
    description:
      "Temren Makina CNC vakum tablası ve vakumlu tabla üretimiyle hassas bağlama ve stabil işleme çözümleri sunar.",
    images: [OG_IMAGE],
  },

  other: {
    "geo.region": "TR-06",
    "geo.placename": "Ankara",
    "product:category": "CNC Bağlama Sistemleri",
    "product:brand": "Temren Makina",
  },
};

export default function VakumluTablaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}