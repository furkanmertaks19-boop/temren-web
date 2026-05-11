import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";
import { getProductBySlug, type ProductDef } from "./products";

/**
 * Lightweight typed builders for Next.js `Metadata`.
 *
 * Every helper accepts a path relative to the site root and produces a
 * canonical URL + OpenGraph + Twitter cards with sensible defaults.
 */

interface OpenGraphImageInput {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string | OpenGraphImageInput;
  /** @default "website" */
  openGraphType?: "website" | "article" | "profile" | "product";
  /** Set false for utility pages that shouldn't be indexed. */
  index?: boolean;
  /** Published / modified timestamps for article-like pages. */
  publishedTime?: string;
  modifiedTime?: string;
  /** Article author(s) for article-like pages. */
  authors?: string[];
  /** Optional locale alternates: { "en-US": "/en/..." } */
  alternateLocales?: Record<string, string>;
}

function normalizeImage(
  image: string | OpenGraphImageInput | undefined,
  fallbackAlt: string,
) {
  const raw = image ?? SITE.defaultOgImage;
  if (typeof raw === "string") {
    return {
      url: absoluteUrl(raw),
      alt: fallbackAlt,
      width: 1200,
      height: 630,
    };
  }
  return {
    url: absoluteUrl(raw.url),
    alt: raw.alt ?? fallbackAlt,
    width: raw.width ?? 1200,
    height: raw.height ?? 630,
  };
}

/**
 * Generic metadata factory. Use it directly for content pages, or via the
 * higher-level helpers (`productMetadata`, `articleMetadata`).
 */
export function buildMetadata(opts: BuildMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    image,
    openGraphType = "website",
    index = true,
    publishedTime,
    modifiedTime,
    authors,
    alternateLocales,
  } = opts;

  const url = absoluteUrl(path);
  const ogImage = normalizeImage(image, title);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: alternateLocales
        ? Object.fromEntries(
            Object.entries(alternateLocales).map(([locale, p]) => [
              locale,
              absoluteUrl(p),
            ]),
          )
        : undefined,
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : { index: false, follow: false },
    openGraph: {
      type: openGraphType === "product" ? "website" : openGraphType,
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title,
      description,
      images: [ogImage],
      publishedTime,
      modifiedTime,
      authors,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
      creator: SITE.twitterHandle || undefined,
    },
  };
}

/**
 * Product-specific metadata. Pulls everything from the product registry so
 * each per-product layout becomes a one-liner.
 */
export function productMetadata(slug: string, override: Partial<Metadata> = {}): Metadata {
  const product = getProductBySlug(slug);
  return {
    ...buildMetadataForProduct(product),
    ...override,
  };
}

function buildMetadataForProduct(product: ProductDef): Metadata {
  return buildMetadata({
    title: product.seoTitle,
    description: product.description,
    path: product.path,
    keywords: product.keywords,
    image: { url: product.image, alt: product.imageAlt },
    openGraphType: "product",
  });
}

/**
 * Article metadata (blog posts, news, etc).
 */
export function articleMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}): Metadata {
  return buildMetadata({
    title: opts.title,
    description: opts.description,
    path: opts.path,
    image: opts.image
      ? { url: opts.image, alt: opts.imageAlt ?? opts.title }
      : undefined,
    openGraphType: "article",
    keywords: opts.tags,
    publishedTime: opts.publishedTime,
    modifiedTime: opts.modifiedTime,
    authors: opts.author ? [opts.author] : undefined,
  });
}
