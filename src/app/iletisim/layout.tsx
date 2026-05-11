import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT, SITE, absoluteUrl } from "@/lib/site";

const PATH = "/iletisim";

export const metadata: Metadata = buildMetadata({
  title: "İletişim | Temren Makina",
  description:
    "Temren Makina iletişim sayfası — Ankara Kahramankazan fabrika adresimiz, telefon ve e-posta bilgilerimiz. Teklif almak için bizimle iletişime geçin.",
  path: PATH,
  keywords: [
    "Temren Makina iletişim",
    "Temren Makina telefon",
    "Temren Makina adres",
    "Ankara makina firması iletişim",
    "Kahramankazan makina",
  ],
});

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: absoluteUrl(PATH),
  name: `İletişim | ${SITE.name}`,
  inLanguage: SITE.language,
  mainEntity: {
    "@id": absoluteUrl("/#organization"),
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"],
    },
  ],
};

const breadcrumb = breadcrumbSchema([
  { name: "Anasayfa", path: "/" },
  { name: "İletişim", path: PATH },
]);

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={[contactPageSchema, breadcrumb]} id="iletisim-schema" />
      {children}
    </>
  );
}
