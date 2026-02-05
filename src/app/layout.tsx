import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata, Viewport } from "next";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import SmoothScroll from "@/components/SmoothScroll";

// 🚀 FONT OPTİMİZASYONU
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", 
  variable: "--font-inter", 
});

// 📱 MOBİL UYUMLULUK
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

// 🎯 SEO & LOGO & METADATA AYARLARI
export const metadata: Metadata = {
  // 🟢 SEKME LOGOSU (FAVICON) AYARLARI
  icons: {
    icon: "/logo.png",       // Tarayıcı sekmesindeki logo
    shortcut: "/logo.png",   // Kısayol ikonu
    apple: "/logo.png",      // iPhone ana ekrana ekle ikonu
  },
  title: {
    default: "Temren Makina | Traktör Palet Sistemleri ve Endüstriyel Çözümler",
    template: "%s | Temren Makina"
  },
  description: "Temren Makina; yüksek hassasiyetli talaşlı imalat, traktör palet sistemleri ve CNC vakum tablaları ile endüstriyel üretim süreçlerinize profesyonel çözümler sunar.",
  keywords: [
    "temren makina", 
    "talaşlı imalat", 
    "Ankara makina", 
    "palet sistemleri", 
    "traktör palet sistemi", 
    "vakum tablası", 
    "CNC ekipmanları", 
    "hassas üretim"
  ],
  verification: {
    google: "google-site-verification-kodunuz", 
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://temrenmakina.com",
  },
  openGraph: {
    title: "Temren Makina | Endüstriyel Verimlilik Çözümleri",
    description: "Traktör palet sistemleri ve hassas üretim ekipmanlarında öncü çözümler.",
    url: "https://temrenmakina.com",
    siteName: "Temren Makina",
    images: [
      {
        url: "/logo.png", // Paylaşımlarda görünecek görsel
        width: 1200,
        height: 630,
        alt: "Temren Makina Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
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
          <main className="min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}