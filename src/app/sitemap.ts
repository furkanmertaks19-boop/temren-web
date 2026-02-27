import { MetadataRoute } from "next";

const baseUrl = "https://temrenmakina.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ANA SAYFALAR
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/urunler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/kurumsal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/medya`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },

    // 🔥 PALLET SİSTEMLERİ
    { url: `${baseUrl}/urunler/palet-sistemleri/plt-7`, priority: 0.95 },
    { url: `${baseUrl}/urunler/palet-sistemleri/plt-8`, priority: 0.95 },
    { url: `${baseUrl}/urunler/palet-sistemleri/plt-10`, priority: 0.95 },
    { url: `${baseUrl}/urunler/palet-sistemleri/plt-12`, priority: 0.95 },
    { url: `${baseUrl}/urunler/palet-sistemleri/plt-15`, priority: 0.95 },
    { url: `${baseUrl}/urunler/palet-sistemleri/plt-16`, priority: 0.95 },
    { url: `${baseUrl}/urunler/palet-sistemleri/plt-17`, priority: 0.95 },
    { url: `${baseUrl}/urunler/palet-sistemleri/plt-18`, priority: 0.95 },

    // 🔥 ÜRETİM
    { url: `${baseUrl}/urunler/uretim/byk500`, priority: 0.95 },
    { url: `${baseUrl}/urunler/uretim/byk1000`, priority: 0.95 },
    { url: `${baseUrl}/urunler/uretim/konik-temizleme`, priority: 0.95 },
    { url: `${baseUrl}/urunler/uretim/mini-takim-boy-olcer`, priority: 0.95 },
    { url: `${baseUrl}/urunler/uretim/takim-sikma`, priority: 0.95 },
    { url: `${baseUrl}/urunler/uretim/vakumlu-tabla`, priority: 0.95 },
    { url: `${baseUrl}/urunler/uretim/vortex-tupu`, priority: 1 },

    // DİĞER
    { url: `${baseUrl}/urunler/tika`, priority: 0.9 },
    { url: `${baseUrl}/urunler/mini-tika`, priority: 0.9 },
    { url: `${baseUrl}/urunler/kaucuk-sistemleri`, priority: 0.85 },
  ];
}