import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
// ✅ DOSYA YOLUNU BU ŞEKİLDE GÜNCELLE (Aradaki layout klasörünü kaldır):
import ConditionalHeader from "@/components/layout/ConditionalHeader";

const inter = Inter({ subsets: ["latin"] });

// ✅ SEO İÇİN KRİTİK: Metadata artık sunucu tarafında çalışıyor
export const metadata: Metadata = {
  title: {
    default: "Temren Makina | Talaşlı İmalat ve Palet Sistemleri",
    template: "%s | Temren Makina"
  },
  description: "Ankara Kahramankazan'da yüksek hassasiyetli talaşlı imalat, özel tasarım palet sistemleri ve savunma sanayii çözümleri.",
  keywords: ["talaşlı imalat", "Ankara makina", "palet sistemleri", "savunma sanayi", "hassas üretim"],
  verification: {
    google: "google-site-verification-kodunuz", // Google Search Console'dan alacağınız kod
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased overflow-x-hidden relative`}>
        {/* ✅ Header kontrolü bu bileşen içinde yapılacak */}
        <ConditionalHeader />

        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}