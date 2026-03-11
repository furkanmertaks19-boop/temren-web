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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://temrenmakina.com"),

  title: {
    default: "Temren Makina | Traktör Palet Sistemleri ve Endüstriyel Çözümler",
    template: "%s | Temren Makina",
  },

  description:
    "Temren Makina; yüksek hassasiyetli talaşlı imalat, traktör palet sistemleri, CNC vakum tablaları ve endüstriyel üretim çözümleri ile işletmelere profesyonel sistemler sunar.",

  keywords: [
    "Temren Makina",
    "talaşlı imalat",
    "Ankara makina",
    "palet sistemleri",
    "traktör palet sistemi",
    "vakum tablası",
    "CNC ekipmanları",
    "hassas üretim",
    "endüstriyel çözümler",
    "konik temizleme makinesi",
    "takım sıkma",
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
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico", "/logo.png"],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://temrenmakina.com",
    siteName: "Temren Makina",
    title: "Temren Makina | Traktör Palet Sistemleri ve Endüstriyel Çözümler",
    description:
      "Temren Makina; traktör palet sistemleri, talaşlı imalat, CNC vakum tablaları ve özel endüstriyel üretim çözümleri sunar.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Temren Makina Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Temren Makina | Traktör Palet Sistemleri ve Endüstriyel Çözümler",
    description:
      "Temren Makina; traktör palet sistemleri, talaşlı imalat, CNC vakum tablaları ve özel endüstriyel üretim çözümleri sunar.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <SmoothScroll>
          <ConditionalHeader />
          <main className="min-h-screen">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}