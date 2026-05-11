import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import ConditionalHeader from "@/components/layout/ConditionalHeader";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/seo/JsonLd";

import { SITE, VERIFICATION, absoluteUrl } from "@/lib/site";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
});

const DEFAULT_TITLE =
  "Temren Makina | Traktör Palet Sistemleri, Vakum Tablası & Endüstriyel Çözümler";

const GLOBAL_KEYWORDS = [
  // Brand
  "Temren Makina",
  "Temren Makina Ankara",
  "temrenmakina.com",
  // Palet sistemleri
  "traktör palet sistemi",
  "traktör palet sistemleri",
  "kauçuk palet sistemi",
  "araç palet sistemi",
  "paletli taşıma sistemi",
  "endüstriyel palet sistemleri",
  "PLT-18", "PLT-17", "PLT-16", "PLT-15", "PLT-12", "PLT-10", "PLT-8", "PLT-7",
  // CNC & üretim
  "vakum tablası",
  "CNC vakum tablası",
  "CNC vakum tabla",
  "alüminyum vakum tablası",
  "freze vakum tablası",
  "takım sıkma mekanizması",
  "CNC takım sıkma",
  "mini takım boy ölçer",
  "konik temizleme aparatı",
  "vortex tüpü",
  "vorteks tüpü",
  "BYK-1000 emülsiyon",
  "BYK-500 emülsiyon",
  // Platform & savunma
  "TİKA",
  "mini TİKA",
  "uzaktan kumandalı platform",
  "paletli platform",
  "savunma sanayi platformu",
  "modüler tarım aracı",
  "endüstriyel platform sistemleri",
  // General
  "talaşlı imalat",
  "hassas üretim",
  "savunma sanayi",
  "endüstriyel üretim çözümleri",
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: SITE.themeColor },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.longDescription,
  keywords: GLOBAL_KEYWORDS,
  applicationName: SITE.name,
  referrer: "origin-when-cross-origin",
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: "industrial manufacturing",
  classification: "Industrial Manufacturing, Defense, Agriculture",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  verification: {
    google: VERIFICATION.google,
    yandex: VERIFICATION.yandex,
    other: VERIFICATION.bing
      ? { "msvalidate.01": VERIFICATION.bing }
      : undefined,
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
    languages: {
      "tr-TR": absoluteUrl("/"),
      "x-default": absoluteUrl("/"),
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/logo.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    alternateLocale: ["en_US"],
    url: SITE.url,
    siteName: SITE.name,
    title: DEFAULT_TITLE,
    description: SITE.longDescription,
    images: [
      {
        url: absoluteUrl(SITE.defaultOgImage),
        width: 1200,
        height: 630,
        alt: SITE.defaultOgAlt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle || undefined,
    creator: SITE.twitterHandle || undefined,
    title: DEFAULT_TITLE,
    description: SITE.longDescription,
    images: [absoluteUrl(SITE.defaultOgImage)],
  },
  other: {
    "geo.region": "TR-06",
    "geo.placename": "Kahramankazan / Ankara",
    "geo.position": "40.230;32.715",
    ICBM: "40.230, 32.715",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        {/* Performance: hint the browser to set up connections early. */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
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
        {/* Global schema.org — Organization, LocalBusiness & WebSite. */}
        <JsonLd
          data={[organizationSchema(), localBusinessSchema(), websiteSchema()]}
          id="global-schema"
        />

        <SmoothScroll>
          <ConditionalHeader />
          <main className="min-h-screen">{children}</main>
        </SmoothScroll>

        <GoogleAnalytics gaId="G-0XVWHV8CMP" />
      </body>
    </html>
  );
}
