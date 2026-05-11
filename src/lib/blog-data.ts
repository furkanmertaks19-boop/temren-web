import "server-only";
import { cache } from "react";
import { connectDB } from "./db";
import Blog from "@/models/Blog";

/**
 * Server-side blog helpers used by `generateMetadata`, the sitemap, and any
 * server component that needs read-only blog data. Failures are swallowed so
 * SEO never breaks the build.
 */

export interface BlogPostLean {
  _id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  shortDescription: string;
  content?: string;
  gallery?: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * All published posts. Used by the sitemap. Wrapped in `cache()` so multiple
 * server callers in the same request share a single Mongo round-trip.
 */
export const getAllBlogPosts = cache(async (): Promise<BlogPostLean[]> => {
  try {
    await connectDB();
    const posts = await Blog.find({ isActive: { $ne: false } })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("[blog-data] getAllBlogPosts failed:", error);
    return [];
  }
});

/**
 * Single post by slug, or null if not found / DB unreachable. Cached per
 * request so `generateMetadata` and the layout itself can both call it
 * without doubling the work.
 */
export const getBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPostLean | null> => {
    try {
      await connectDB();
      const post = await Blog.findOne({ slug }).lean();
      if (!post) return null;
      return JSON.parse(JSON.stringify(post));
    } catch (error) {
      console.error("[blog-data] getBlogPostBySlug failed:", error);
      return null;
    }
  },
);

/**
 * Best-effort parser for the user-facing "DD.MM.YYYY" date strings used in
 * the editor. Returns an ISO string suitable for OpenGraph `publishedTime`
 * and schema.org `datePublished`.
 */
export function isoFromTrDate(input: string | undefined): string | undefined {
  if (!input) return undefined;
  const match = input.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) {
    const parsed = Date.parse(input);
    return Number.isFinite(parsed) ? new Date(parsed).toISOString() : undefined;
  }
  const [, dd, mm, yyyy] = match;
  return new Date(`${yyyy}-${mm}-${dd}T09:00:00+03:00`).toISOString();
}

/** Strip HTML and return a 155-char excerpt for meta description fallback. */
export function htmlExcerpt(html: string, length = 155): string {
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= length) return text;
  return text.slice(0, length - 1).trimEnd() + "…";
}
