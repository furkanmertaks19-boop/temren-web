import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE, absoluteUrl } from "@/lib/site";

const PATH = "/medya/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog & Haberler | Temren Makina",
  description:
    "Temren Makina'nın en güncel haberleri, fuar katılımları, sektörel gelişmeler ve teknik içerikler. Endüstriyel üretim ve savunma sanayindeki gelişmeleri takip edin.",
  path: PATH,
  keywords: [
    "Temren Makina blog",
    "Temren Makina haberler",
    "endüstriyel haberler",
    "savunma sanayi haberleri",
    "palet sistemleri blog",
  ],
});

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": absoluteUrl(`${PATH}#blog`),
  name: `${SITE.name} | Blog`,
  url: absoluteUrl(PATH),
  inLanguage: SITE.language,
  publisher: { "@id": absoluteUrl("/#organization") },
};

const breadcrumb = breadcrumbSchema([
  { name: "Anasayfa", path: "/" },
  { name: "Medya", path: "/medya/blog" },
  { name: "Blog", path: PATH },
]);

export default function BlogListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={[blogSchema, breadcrumb]} id="blog-list-schema" />
      {children}
    </>
  );
}
