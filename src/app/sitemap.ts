import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllProducts } from "@/lib/products";
import { getAllBlogPosts } from "@/lib/blog-data";

/**
 * Dynamic sitemap that combines:
 *  - Static marketing pages (home, kurumsal, faaliyet, iletisim, medya)
 *  - All products from the product registry (`src/lib/products.ts`)
 *  - All published blog posts from MongoDB
 *
 * Re-generated at runtime so newly published posts appear within minutes.
 */

// Re-fetch blog data at most once an hour at runtime.
export const revalidate = 3600;

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface StaticEntry {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}

const STATIC_PAGES: StaticEntry[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/urunler/palet-sistemleri", changeFrequency: "weekly", priority: 0.95 },
  { path: "/iletisim", changeFrequency: "monthly", priority: 0.85 },

  // Kurumsal
  { path: "/kurumsal/hakkimizda", changeFrequency: "monthly", priority: 0.9 },
  { path: "/kurumsal/belgelerimiz", changeFrequency: "monthly", priority: 0.8 },
  { path: "/kurumsal/politikalarimiz", changeFrequency: "monthly", priority: 0.8 },
  { path: "/kurumsal/referanslarimiz", changeFrequency: "monthly", priority: 0.8 },
  { path: "/kurumsal/ihracatlarimiz", changeFrequency: "monthly", priority: 0.8 },
  { path: "/kurumsal/e-katalog", changeFrequency: "monthly", priority: 0.8 },
  { path: "/kurumsal/insankaynaklari", changeFrequency: "monthly", priority: 0.75 },
  { path: "/kurumsal/sss", changeFrequency: "monthly", priority: 0.75 },
  { path: "/kurumsal/musterigorusleri", changeFrequency: "monthly", priority: 0.7 },
  { path: "/kurumsal/bankabilgileri", changeFrequency: "monthly", priority: 0.6 },

  // Faaliyet
  { path: "/faaliyet/uretim", changeFrequency: "monthly", priority: 0.85 },
  { path: "/faaliyet/insaat", changeFrequency: "monthly", priority: 0.8 },

  // Medya
  { path: "/medya/blog", changeFrequency: "daily", priority: 0.9 },
  { path: "/medya/foto", changeFrequency: "monthly", priority: 0.7 },
  { path: "/medya/video", changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: now,
    changeFrequency: "weekly",
    priority: p.category === "Palet Sistemleri" ? 0.9 : 0.85,
  }));

  const blogPosts = await getAllBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/medya/blog/${post.slug}`),
    lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries, ...blogEntries];
}
