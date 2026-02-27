import { MetadataRoute } from "next";
import path from "path";
import fs from "fs";

type Entry = {
  url: string;
  lastModified?: Date;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
};

const baseUrl = "https://temrenmakina.com";

function hasPageTsx(dirPath: string) {
  return fs.existsSync(path.join(dirPath, "page.tsx")) || fs.existsSync(path.join(dirPath, "page.jsx"));
}

function isSkippableDir(name: string) {
  // Next.js group route klasörleri (ör: (admin)) indexlenmesin
  if (name.startsWith("(") && name.endsWith(")")) return true;
  // components gibi route olmayan klasörler
  if (name === "components" || name === "ui") return true;
  // api klasörü
  if (name === "api") return true;
  return false;
}

function scanRoutes(rootDir: string, urlPrefix: string): string[] {
  if (!fs.existsSync(rootDir)) return [];

  const items = fs.readdirSync(rootDir, { withFileTypes: true });

  let urls: string[] = [];

  // Eğer bu klasörde page.tsx varsa kendisini ekle
  if (hasPageTsx(rootDir)) {
    urls.push(urlPrefix);
  }

  // Alt klasörleri tara
  for (const item of items) {
    if (!item.isDirectory()) continue;

    const name = item.name;
    if (isSkippableDir(name)) continue;

    const nextDir = path.join(rootDir, name);
    const nextUrl = `${urlPrefix}/${name}`;

    urls = urls.concat(scanRoutes(nextDir, nextUrl));
  }

  return urls;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Statik ana sayfalar (senin menü yapına göre)
  const staticPages: Entry[] = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/kurumsal`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/urunler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/faaliyet/insaat`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faaliyet/uretim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/medya`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  // ✅ Ürün route’larını otomatik topla
  const urunlerDir = path.join(process.cwd(), "src", "app", "urunler");
  const productUrls = scanRoutes(urunlerDir, `${baseUrl}/urunler`)
    // /urunler/components gibi yanlışları yine de güvenlik için filtrele
    .filter((u) => !u.includes("/components/"));

  const productEntries: Entry[] = productUrls.map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: url.includes("/urunler/uretim/") || url.includes("/urunler/palet-sistemleri/")
      ? 0.95
      : 0.85,
  }));

  return [...staticPages, ...productEntries];
}