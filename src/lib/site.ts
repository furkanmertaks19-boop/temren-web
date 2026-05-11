/**
 * Site-wide constants used by SEO helpers, schema builders, sitemap and
 * shared UI. Edit values here once — everything else picks them up.
 */

export const SITE = {
  name: "Temren Makina",
  legalName: "Temren Makina Mühendislik",
  shortDescription:
    "Traktör palet sistemleri, CNC vakum tablası, savunma sanayi ve endüstriyel üretim çözümleri.",
  longDescription:
    "Temren Makina; traktör palet sistemleri, araç palet sistemleri, CNC vakum tablası, takım sıkma mekanizması, mini takım boy ölçer, vortex tüpü, emülsiyon sistemleri, TİKA ve uzaktan kumandalı platform sistemleri ile savunma sanayi ve endüstriyel üretim için yüksek hassasiyetli çözümler sunar.",
  url: "https://temrenmakina.com",
  locale: "tr_TR",
  language: "tr-TR",
  /**
   * Default 1200x630 OpenGraph image. Make sure the file exists in /public/og/.
   */
  defaultOgImage: "/og/temren-home.jpg",
  defaultOgAlt:
    "Temren Makina | Traktör Palet Sistemleri ve Endüstriyel Çözümler",
  logo: "/logo.png",
  favicon: "/favicon.ico",
  themeColor: "#000000",
  brandColor: "#FF4D00",
  founded: "2010",
  twitterHandle: "@temrenmakina",
} as const;

export const CONTACT = {
  phone: "+90 312 815 15 15",
  phoneE164: "+903128151515",
  email: "satis@temrenmakina.com",
  address: {
    street: "Saray Mah. 100. Yıl Blv. No: 75",
    locality: "Kahramankazan",
    region: "Ankara",
    postalCode: "06980",
    country: "TR",
  },
  geo: {
    latitude: 40.230,
    longitude: 32.715,
  },
  openingHours: ["Mo-Fr 08:30-18:00", "Sa 08:30-13:00"],
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/temrenmakina/",
  linkedin: "https://www.linkedin.com/company/temrenmakina/",
  facebook: "https://www.facebook.com/temrenmakina",
  youtube: "",
  twitter: "",
} as const;

/** Verification codes — fill these in production. */
export const VERIFICATION = {
  google: "google-site-verification-kodunuz",
  yandex: undefined as string | undefined,
  bing: undefined as string | undefined,
} as const;

/** Returns an absolute URL for the given path. */
export function absoluteUrl(path: string = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const trimmedBase = SITE.url.replace(/\/$/, "");
  const trimmedPath = path.startsWith("/") ? path : `/${path}`;
  return `${trimmedBase}${trimmedPath}`;
}
