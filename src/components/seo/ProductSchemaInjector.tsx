import { productPageSchemas } from "@/lib/schema";
import JsonLd from "./JsonLd";

interface ProductSchemaInjectorProps {
  slug: string;
}

/**
 * Drop-in JSON-LD bundle for product pages.
 * Renders the Breadcrumb + Product (+ optional FAQ) schemas using the
 * central product registry.
 */
export default function ProductSchemaInjector({
  slug,
}: ProductSchemaInjectorProps) {
  return <JsonLd data={productPageSchemas(slug)} id={`product-${slug}`} />;
}
