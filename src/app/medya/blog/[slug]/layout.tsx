import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { articleMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import {
  getBlogPostBySlug,
  isoFromTrDate,
  htmlExcerpt,
} from "@/lib/blog-data";
import JsonLd from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Yazı Bulunamadı",
      description: "Aradığınız blog yazısı bulunamadı.",
      robots: { index: false, follow: false },
    };
  }

  const description =
    post.shortDescription ||
    htmlExcerpt(post.content ?? "") ||
    SITE.shortDescription;

  return articleMetadata({
    title: post.title,
    description,
    path: `/medya/blog/${post.slug}`,
    image: post.image,
    imageAlt: post.title,
    publishedTime: isoFromTrDate(post.date) ?? post.createdAt,
    modifiedTime: post.updatedAt,
    author: SITE.name,
    tags: post.category ? [post.category] : undefined,
  });
}

export default async function BlogDetailLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    // Surface a real 404 here so noindex metadata + status code match.
    notFound();
  }

  const description =
    post.shortDescription ||
    htmlExcerpt(post.content ?? "") ||
    SITE.shortDescription;

  const articleJson = articleSchema({
    headline: post.title,
    description,
    url: `/medya/blog/${post.slug}`,
    image: [post.image, ...(post.gallery ?? [])],
    author: SITE.name,
    datePublished:
      isoFromTrDate(post.date) ?? post.createdAt ?? new Date().toISOString(),
    dateModified: post.updatedAt ?? isoFromTrDate(post.date),
    section: post.category,
    keywords: post.category ? [post.category, "Temren Makina", "Blog"] : undefined,
  });

  const breadcrumbJson = breadcrumbSchema([
    { name: "Anasayfa", path: "/" },
    { name: "Medya", path: "/medya/blog" },
    { name: "Blog", path: "/medya/blog" },
    { name: post.title, path: `/medya/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd
        data={[articleJson, breadcrumbJson]}
        id={`blog-post-${post.slug}`}
      />
      {children}
    </>
  );
}
