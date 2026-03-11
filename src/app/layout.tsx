import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://temrenmakina.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/temren-home.jpg`; // yoksa uygun bir görsel yükle

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Temren Makina | Traktör Palet Sistemleri, Talaşlı İmalat ve Endüstriyel Çözümler",
    template: "%s | Temren Makina",
  },

  description:
    "Temren Makina; traktör palet sistemleri, talaşlı imalat, CNC vakum tablaları, takım sıkma sistemleri ve endüstriyel üretim ekipmanlarında profesyonel çözümler sunar.",

  keywords: [
    "Temren Makina",
    "temren makina ankara",
    "makina",
    "makina firması",
    "ankara makina",
    "endüstriyel çözümler",
    "endüstriyel üretim",
     "endüstriyel imalat",
    "talaşlı imalat",
    "hassas üretim",
    "CNC ekipmanları",
    "CNC vakum tablası",
    "vakum tablası",
    "takım sıkma sistemi",
    "mini takım boy ölçer",
    "konik temizleme",
    "traktör palet sistemi",
    "araç palet sistemi",
    "palet sistemleri",
    "en büyük firma",
    "palet sistemleri",
    "endüstriyel palet sistemi",
    "üretim ekipmanları",
    "özel makina imalatı",
  ],

  applicationName: "Temren Makina",
  referrer: "origin-when-cross-origin",
  creator: "Temren Makina",
  publisher: "Temren Makina",
  category: "industrial manufacturing",

  verification: {
    google: "google-site-verification-kodunuz",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Temren Makina",
    title: "Temren Makina | Traktör Palet Sistemleri, Talaşlı İmalat ve Endüstriyel Çözümler",
    description:
      "Temren Makina; traktör palet sistemleri, talaşlı imalat, CNC vakum tablaları ve özel endüstriyel üretim çözümleri sunar.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Temren Makina Endüstriyel Çözümler",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Temren Makina | Traktör Palet Sistemleri ve Endüstriyel Çözümler",
    description:
      "Temren Makina; traktör palet sistemleri, talaşlı imalat, CNC vakum tablaları ve özel endüstriyel üretim çözümleri sunar.",
    images: [DEFAULT_OG_IMAGE],
  },

  other: {
    "geo.region": "TR-06",
    "geo.placename": "Ankara",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Temren Makina",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        areaServed: "TR",
        availableLanguage: ["Turkish", "English"],
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Temren Makina",
    url: SITE_URL,
    inLanguage: "tr-TR",
    publisher: {
      "@type": "Organization",
      name: "Temren Makina",
    },
  };

  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`
          ${inter.variable}
          ${inter.className}
          antialiased
          overflow-x-hidden
          relative
          bg-black
          text-white
        `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
        <SmoothScroll>
          <ConditionalHeader />
          <main className="min-h-screen">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}