import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import SmoothScroll from "@/components/SmoothScroll";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://temrenmakina.com";
const DEFAULT_OG_IMAGE = `${"https://temrenmakina.com"}/og/temren-home.jpg`;  

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://temrenmakina.com"),
 title: {
  default:
    "Temren Makina | Traktör Palet Sistemleri, Vakum Tablası, Savunma Sanayi ve Endüstriyel Üretim Çözümleri",
  template: "%s | Temren Makina",
},

  description:
    "Temren Makina; traktör palet sistemleri, araç palet sistemleri, CNC vakum tablası, takım sıkma mekanizması, mini takım boy ölçer, vortex tüpü, emülsiyon sistemleri, TİKA ve özel endüstriyel üretim çözümleri sunar.",

  keywords: [
    "Temren Makina",
    "Temren Makina Ankara",
    "Ankara makina firması",
    "endüstriyel makina imalatı",
    "özel makina imalatı",
    "talaşlı imalat",
    "hassas üretim",
    "savunma sanayi",
    "CNC ekipmanları",
    "endüstriyel üretim çözümleri",

    "traktör palet sistemi",
    "traktör palet sistemleri",
    "traktör kar paleti",
    "traktör palet takımı",
    "traktör palet dönüşüm sistemi",
    "palet sistemleri",
    "endüstriyel palet sistemi",
    "kauçuk palet sistemi",
    "araç palet sistemi",
    "paletli araç sistemi",

    "PLT-18",
    "PLT-17",
    "PLT-16",
    "PLT-15",
    "PLT-10",
    "PLT-12",
    "PLT-8",
    "PLT-7",

    "vakum tablası",
    "CNC vakum tablası",
    "CNC vakum tabla",
    "vakumlu tabla",
    "alüminyum vakum tablası",
    "hassas vakum tablası",
    "CNC işleme vakum tablası",
    "freze vakum tablası",
    "özel ölçü vakum tablası",

    "takım sıkma mekanizması",
    "takım sıkma sistemi",
    "CNC takım sıkma",
    "takım bağlama sistemi",
    "mini takım boy ölçer",
    "takım boy ölçer",
    "CNC takım ölçüm",
    "konik temizleme",
    "konik temizleme aparatı",

    "vortex tüpü",
    "vorteks tüpü",
    "soğutma tüpü",
    "CNC soğutma sistemi",
    "emülsiyon sistemi",
    "BYK-1000 emülsiyon",
    "BYK-500 emülsiyon",
    "soğutma ve emülsiyon çözümleri",

    "kauçuk sistemleri",
    "TİKA",
    "Mini TİKA",
    "uzaktan kumandalı araç",
    "modüler tarım aracı",
    "paletli platform",
    "özel endüstriyel çözümler",
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
  url: "https://temrenmakina.com",
  siteName: "Temren Makina",

  title:
    "Temren Makina | Traktör Palet Sistemleri, CNC Vakum Tablası, Savunma Sanayi ve Endüstriyel Çözümler",

  description:
    "Temren Makina; traktör palet sistemleri, CNC vakum tablası, takım sıkma mekanizmaları, vortex tüpü, emülsiyon sistemleri ve savunma sanayi projeleri için profesyonel üretim çözümleri sunar.",

  images: [
    {
      url: "https://temrenmakina.com/og-image.jpg", //  
      width: 1200,
      height: 630,
      alt: "Temren Makina | Traktör Palet Sistemleri ve Endüstriyel Çözümler",
    },
  ],
},

  twitter: {
    card: "summary_large_image",
    title:
      "Temren Makina | Traktör Palet Sistemleri, Vakum Tablası ve Endüstriyel Çözümler",
    description:
      "Temren Makina; traktör palet sistemleri, CNC vakum tablası, takım sıkma mekanizmaları, vortex tüpü ve özel endüstriyel çözümler sunar.",
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

        {/* Google Analytics - Canlı Analiz İçin */}
        <GoogleAnalytics gaId="G-0XVWHV8CMP" />
      </body>
    </html>
  );
}