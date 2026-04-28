import { MetadataRoute } from "next";

const baseUrl = "https://temrenmakina.com";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ANA SAYFALAR
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/urunler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },

    // KURUMSAL
    {
      url: `${baseUrl}/kurumsal/hakkimizda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kurumsal/belgelerimiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kurumsal/politikalarimiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kurumsal/referanslarimiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kurumsal/ihracatlarimiz`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kurumsal/e-katalog`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kurumsal/insankaynaklari`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kurumsal/sss`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kurumsal/musterigorusleri`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/kurumsal/bankabilgileri`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // FAALİYET ALANLARI
    {
      url: `${baseUrl}/faaliyet/uretim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faaliyet/insaat`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // MEDYA
    {
      url: `${baseUrl}/medya/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/medya/foto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/medya/video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    // ÜRÜNLER - PALET SİSTEMLERİ
    {
      url: `${baseUrl}/urunler/palet-sistemleri`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler/palet-sistemleri/plt-18`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/urunler/palet-sistemleri/plt-17`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler/palet-sistemleri/plt-16`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler/palet-sistemleri/plt-15`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler/palet-sistemleri/plt-12`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/urunler/palet-sistemleri/plt-10`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/urunler/palet-sistemleri/plt-8`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/urunler/palet-sistemleri/plt-7`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // ÜRÜNLER - ÜRETİM EKİPMANLARI
    {
      url: `${baseUrl}/urunler/uretim/vakum-tablasi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/urunler/uretim/takim-sikma`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler/uretim/mini-takim-boy-olcer`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler/uretim/konik-temizleme`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/urunler/uretim/vortex-tupu`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler/uretim/byk1000`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/urunler/uretim/byk500`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    // ÜRÜNLER - DİĞER SİSTEMLER
    {
      url: `${baseUrl}/urunler/tika`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/urunler/mini-tika`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/urunler/kaucuk-sistemleri`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];
}