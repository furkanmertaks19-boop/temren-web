import { SITE, CONTACT, SOCIAL, absoluteUrl } from "./site";
import { getProductBySlug, type ProductDef } from "./products";

/**
 * Builders for JSON-LD (schema.org) snippets. Every builder returns a plain
 * object that is safe to `JSON.stringify` into a <script type="application/ld+json">
 * tag (use the `<JsonLd>` component to render).
 */

type JsonLdObject = Record<string, unknown>;

// ─── ORGANIZATION ────────────────────────────────────────────────────
export function organizationSchema(): JsonLdObject {
  const sameAs = Object.values(SOCIAL).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.defaultOgImage),
    description: SITE.shortDescription,
    foundingDate: SITE.founded,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: CONTACT.phone,
        email: CONTACT.email,
        areaServed: "TR",
        availableLanguage: ["Turkish", "English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.locality,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.country,
    },
  };
}

// ─── LOCAL BUSINESS ──────────────────────────────────────────────────
export function localBusinessSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#localbusiness"),
    name: SITE.name,
    image: absoluteUrl(SITE.logo),
    url: SITE.url,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.locality,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.geo.latitude,
      longitude: CONTACT.geo.longitude,
    },
    openingHoursSpecification: CONTACT.openingHours.map(specToOpening),
  };
}

function specToOpening(spec: string) {
  // Format: "Mo-Fr 08:30-18:00"
  const [days, hours] = spec.split(" ");
  const [opens, closes] = hours.split("-");
  const dayMap: Record<string, string> = {
    Mo: "Monday",
    Tu: "Tuesday",
    We: "Wednesday",
    Th: "Thursday",
    Fr: "Friday",
    Sa: "Saturday",
    Su: "Sunday",
  };
  const dayParts = days.includes("-")
    ? days.split("-").map((d) => dayMap[d] ?? d)
    : [dayMap[days] ?? days];
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: dayParts,
    opens,
    closes,
  };
}

// ─── WEBSITE (+ SearchAction) ────────────────────────────────────────
export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.language,
    description: SITE.shortDescription,
    publisher: { "@id": absoluteUrl("/#organization") },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/arama?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── BREADCRUMB LIST ─────────────────────────────────────────────────
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// ─── PRODUCT ─────────────────────────────────────────────────────────
export function productSchema(slug: string): JsonLdObject {
  const product = getProductBySlug(slug);
  return buildProductSchema(product);
}

function buildProductSchema(product: ProductDef): JsonLdObject {
  const images = [
    absoluteUrl(product.image),
    ...(product.gallery?.map((i) => absoluteUrl(i)) ?? []),
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`${product.path}#product`),
    name: product.name,
    description: product.description,
    image: images.length === 1 ? images[0] : images,
    sku: product.sku,
    mpn: product.sku,
    category: product.category,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": absoluteUrl("/#organization") },
    url: absoluteUrl(product.path),
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating.value,
          reviewCount: product.rating.count,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(product.path),
      priceCurrency: "TRY",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": absoluteUrl("/#organization") },
    },
  };
}

// ─── FAQ ─────────────────────────────────────────────────────────────
export function faqSchema(
  faqs: { question: string; answer: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// ─── ARTICLE ─────────────────────────────────────────────────────────
export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  image: string | string[];
  author?: string;
  datePublished: string;
  dateModified?: string;
  section?: string;
  keywords?: string[];
}): JsonLdObject {
  const images = (Array.isArray(opts.image) ? opts.image : [opts.image]).map(
    absoluteUrl,
  );

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    image: images.length === 1 ? images[0] : images,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": opts.author ? "Person" : "Organization",
      name: opts.author ?? SITE.name,
    },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(opts.url),
    },
    articleSection: opts.section,
    keywords: opts.keywords?.join(", "),
    inLanguage: SITE.language,
  };
}

// ─── PRODUCT PAGE BUNDLE ─────────────────────────────────────────────
/**
 * Returns the canonical schema set for a product page (Breadcrumb + Product +
 * optional FAQ). Use it together with the global Organization/WebSite which
 * are injected in the root layout.
 */
export function productPageSchemas(slug: string): JsonLdObject[] {
  const product = getProductBySlug(slug);
  const trail = [
    ...product.breadcrumb,
    { name: product.shortName, path: product.path },
  ];

  const schemas: JsonLdObject[] = [
    breadcrumbSchema(trail),
    buildProductSchema(product),
  ];

  if (product.faqs?.length) {
    schemas.push(faqSchema(product.faqs));
  }

  return schemas;
}
