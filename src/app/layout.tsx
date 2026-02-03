import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata, Viewport } from "next";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import SmoothScroll from "@/components/SmoothScroll";

// 🚀 FONT OPTİMİZASYONU: display: "swap" ekledik, font inene kadar yazı gizlenmez.
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", 
  variable: "--font-inter", // CSS değişkeni olarak tanımladık
});

// 📱 MOBİL UYUMLULUK: Viewport ayarlarını buraya taşıdık (Next.js 14+ standardı)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "Temren Makina | Talaşlı İmalat ve Palet Sistemleri",
    template: "%s | Temren Makina"
  },
  description: "Ankara Kahramankazan'da yüksek hassasiyetli talaşlı imalat, özel tasarım palet sistemleri ve savunma sanayii çözümleri.",
  keywords: ["talaşlı imalat", "Ankara makina", "palet sistemleri", "savunma sanayi", "hassas üretim"],
  verification: {
    google: "google-site-verification-kodunuz",
  },
  robots: "index, follow",
  // 🔗 CANONICAL URL: SEO için ana linki belirtiyoruz
  alternates: {
    canonical: "https://temrenmakina.com",
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