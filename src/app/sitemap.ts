import { MetadataRoute } from "next";
import path from "path";
import fs from "fs";

const baseUrl = "https://temrenmakina.com";

/* --------------------------------------------------
   Helpers
-------------------------------------------------- */

function hasPage(dir: string) {
  return (
    fs.existsSync(path.join(dir, "page.tsx")) ||
    fs.existsSync(path.join(dir, "page.jsx"))
  );
}

function isSkip(name: string) {
  if (name.startsWith("(") && name.endsWith(")")) return true;
  if (["components", "ui", "api"].includes(name)) return true;
  return false;
}

function scanRoutes(rootDir: string, urlPrefix: string): string[] {
  if (!fs.existsSync(rootDir)) return [];

  const items = fs.readdirSync(rootDir, { withFileTypes: true });
  let urls: string[] = [];

  if (hasPage(rootDir)) {
    urls.push(urlPrefix);
  }

  for (const item of items) {
    if (!item.isDirectory()) continue;
    if (isSkip(item.name)) continue;

    const childDir = path.join(rootDir, item.name);
    const childUrl = `${urlPrefix}/${item.name}`;

    urls = urls.concat(scanRoutes(childDir, childUrl));
  }

  return urls;
}

/* --------------------------------------------------
   MAIN SITEMAP
-------------------------------------------------- */

export default function sitemap(): MetadataRoute.Sitemap {
  // 🔵 STATİK SAYFALAR
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/kurumsal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/urunler`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/faaliyet/insaat`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faaliyet/uretim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/medya`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 🔵 TÜM ÜRÜNLERİ OTOMATİK TOPLA
  const urunlerDir = path.join(process.cwd(), "src", "app", "urunler");

  const productUrls = scanRoutes(
    urunlerDir,
    `${baseUrl}/urunler`
  ).filter((u) => !u.includes("/components/"));

  const productEntries: MetadataRoute.Sitemap = productUrls.map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority:
      url.includes("/urunler/uretim/") ||
      url.includes("/urunler/palet-sistemleri/")
        ? 0.95
        : 0.85,
  }));

  return [...staticPages, ...productEntries];
}