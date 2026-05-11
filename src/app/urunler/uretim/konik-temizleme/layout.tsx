import type { Metadata } from "next";
import { productMetadata } from "@/lib/seo";
import ProductSchemaInjector from "@/components/seo/ProductSchemaInjector";

const SLUG = "konik-temizleme";

export const metadata: Metadata = productMetadata(SLUG);

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProductSchemaInjector slug={SLUG} />
      {children}
    </>
  );
}
