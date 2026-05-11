/**
 * Central product registry. Used by:
 *  - generateMetadata helpers for each product page
 *  - the dynamic sitemap
 *  - schema.org Product builders
 *
 * Keep slugs in sync with file/folder names under /src/app/urunler/**.
 */

export type ProductCategory =
  | "Palet Sistemleri"
  | "Üretim Ekipmanları"
  | "Kauçuk Sistemleri"
  | "Uzaktan Kumandalı Platformlar";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDef {
  /** URL slug, e.g. "plt-18" */
  slug: string;
  /** Full path from site root, e.g. "/urunler/palet-sistemleri/plt-18" */
  path: string;
  /** Marketing name, e.g. "PLT-18 Kauçuk Palet Sistemi" */
  name: string;
  /** Short H1 / nav label */
  shortName: string;
  /** Top-level category */
  category: ProductCategory;
  /** Breadcrumb chain (without trailing entry — that is added automatically) */
  breadcrumb: { name: string; path: string }[];
  /** SEO title — usually <= 60 chars (without brand suffix, which the template adds) */
  seoTitle: string;
  /** Meta description — 140–160 chars ideal */
  description: string;
  /** Image used for OG / product schema. Should be absolute or root-relative. */
  image: string;
  /** Image alt text */
  imageAlt: string;
  /** Optional list of additional product images */
  gallery?: string[];
  /** SKU / internal code */
  sku?: string;
  /** Optional aggregate rating for schema */
  rating?: { value: number; count: number };
  /** Page-specific keywords (in addition to global ones) */
  keywords: string[];
  /** Frequently asked questions for FAQPage schema */
  faqs?: { question: string; answer: string }[];
}

const productList: ProductDef[] = [
  // ─── PALET SİSTEMLERİ ───────────────────────────────────────────────
  {
    slug: "plt-18",
    path: "/urunler/palet-sistemleri/plt-18",
    name: "PLT-18 Kauçuk Palet Sistemi",
    shortName: "PLT-18",
    category: "Palet Sistemleri",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Palet Sistemleri", path: "/urunler/palet-sistemleri" },
    ],
    seoTitle: "PLT-18 Kauçuk Palet Sistemi | Traktör & Endüstriyel Palet",
    description:
      "Temren Makina PLT-18 kauçuk palet sistemi; zorlu arazide yüksek çekiş, düşük zemin basıncı ve uzun ömürlü dayanıklılık sağlar. Detaylı teknik özellikler ve teklif.",
    image: "/og/plt18_1.png",
    imageAlt: "Temren Makina PLT-18 Kauçuk Palet Sistemi",
    sku: "TMR-PLT-18",
    keywords: [
      "PLT-18",
      "PLT 18",
      "traktör palet sistemi",
      "kauçuk palet sistemi",
      "ağır hizmet palet",
      "endüstriyel palet sistemi",
    ],
    faqs: [
      {
        question: "PLT-18 palet sistemi nerelerde kullanılır?",
        answer:
          "PLT-18; zorlu arazi, çamurlu zemin ve yüksek çekiş gerektiren tarımsal, endüstriyel ve savunma uygulamalarında kullanılır.",
      },
      {
        question: "PLT-18'in temel avantajları nelerdir?",
        answer:
          "Geniş temas yüzeyi sayesinde düşük zemin basıncı, ağır hizmet kauçuk yapısı ile uzun ömür ve modüler bakım imkânı sunar.",
      },
      {
        question: "PLT-18 özelleştirilebilir mi?",
        answer:
          "Evet, makine boyutlarına ve kullanım senaryosuna göre bağlantı ve ölçü detayları uyarlanabilir.",
      },
      {
        question: "PLT-18 için nasıl teklif alabilirim?",
        answer:
          "Sayfadaki teklif formunu doldurabilir veya iletişim sayfasından bizimle iletişime geçebilirsiniz.",
      },
    ],
  },
  {
    slug: "plt-17",
    path: "/urunler/palet-sistemleri/plt-17",
    name: "PLT-17 Kauçuk Palet Sistemi",
    shortName: "PLT-17",
    category: "Palet Sistemleri",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Palet Sistemleri", path: "/urunler/palet-sistemleri" },
    ],
    seoTitle: "PLT-17 Kauçuk Palet Sistemi | Orta Segment Traktör Paleti",
    description:
      "PLT-17 traktör palet sistemi; orta segment makineler için yüksek tutuş, düşük yakıt tüketimi ve dayanıklı kauçuk yapısı sunar. Temren Makina kalitesiyle.",
    image: "/og/plt17.jpg",
    imageAlt: "Temren Makina PLT-17 Kauçuk Palet Sistemi",
    sku: "TMR-PLT-17",
    keywords: ["PLT-17", "PLT 17", "orta segment palet", "traktör palet sistemi"],
  },
  {
    slug: "plt-16",
    path: "/urunler/palet-sistemleri/plt-16",
    name: "PLT-16 Kauçuk Palet Sistemi",
    shortName: "PLT-16",
    category: "Palet Sistemleri",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Palet Sistemleri", path: "/urunler/palet-sistemleri" },
    ],
    seoTitle: "PLT-16 Kauçuk Palet Sistemi | Standart Traktör Paleti",
    description:
      "PLT-16 standart traktör palet sistemi; geniş kullanım alanı ve uzun ömürlü kauçuk yapısı ile günlük tarım operasyonlarında verimlilik sağlar.",
    image: "/og/plt16.jpg",
    imageAlt: "Temren Makina PLT-16 Kauçuk Palet Sistemi",
    sku: "TMR-PLT-16",
    keywords: ["PLT-16", "PLT 16", "standart palet sistemi", "traktör paleti"],
  },
  {
    slug: "plt-15",
    path: "/urunler/palet-sistemleri/plt-15",
    name: "PLT-15 Kauçuk Palet Sistemi",
    shortName: "PLT-15",
    category: "Palet Sistemleri",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Palet Sistemleri", path: "/urunler/palet-sistemleri" },
    ],
    seoTitle: "PLT-15 Kauçuk Palet Sistemi | Kompakt Traktör Paleti",
    description:
      "PLT-15 kompakt palet sistemi; küçük ve orta ölçekli makineler için optimize edilmiş kauçuk palet çözümüdür. Düşük titreşim, yüksek konfor.",
    image: "/og/plt15.jpg",
    imageAlt: "Temren Makina PLT-15 Kauçuk Palet Sistemi",
    sku: "TMR-PLT-15",
    keywords: ["PLT-15", "PLT 15", "kompakt palet", "küçük traktör paleti"],
  },
  {
    slug: "plt-12",
    path: "/urunler/palet-sistemleri/plt-12",
    name: "PLT-12 ASPAR Araç Palet Sistemi",
    shortName: "PLT-12",
    category: "Palet Sistemleri",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Palet Sistemleri", path: "/urunler/palet-sistemleri" },
    ],
    seoTitle: "PLT-12 ASPAR Araç Palet Sistemi | Çamur & Engebeli Arazi",
    description:
      "PLT-12 ASPAR; engebeli ve çamurlu arazilerde maksimum çekiş sağlayan 4x4 araç palet sistemidir. Endüstriyel, tarımsal ve savunma operasyonları için.",
    image: "/og/plt12-13.webp",
    imageAlt: "Temren Makina PLT-12 ASPAR Araç Palet Sistemi",
    sku: "TMR-PLT-12",
    keywords: [
      "PLT-12",
      "PLT 12",
      "ASPAR",
      "araç palet sistemi",
      "4x4 palet sistemi",
      "savunma palet",
    ],
    faqs: [
      {
        question: "PLT-12 ASPAR hangi araçlara uyumludur?",
        answer:
          "PLT-12 ASPAR; 4x4 pikap, off-road araçlar ve hafif zırhlı taktik araçlar için adapte edilebilen bir palet dönüşüm sistemidir.",
      },
      {
        question: "Çamur ve karda performansı nasıldır?",
        answer:
          "Yüksek torklu yapısı ve özel kauçuk profili sayesinde çamur, kar ve kum gibi zorlu zeminlerde minimum kayma ile ilerleme sağlar.",
      },
    ],
  },
  {
    slug: "plt-10",
    path: "/urunler/palet-sistemleri/plt-10",
    name: "PLT-10 CAT Kompakt Palet Sistemi",
    shortName: "PLT-10",
    category: "Palet Sistemleri",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Palet Sistemleri", path: "/urunler/palet-sistemleri" },
    ],
    seoTitle: "PLT-10 CAT Kompakt Palet Sistemi | Ekonomik Çözüm",
    description:
      "PLT-10 CAT; kompakt yapısı ve uzun ömürlü kauçuk paleti ile dar alanlarda yüksek çekiş sunar. Pratik sök-tak sistemi ile hızlı kurulum.",
    image: "/og/plt10.webp",
    imageAlt: "Temren Makina PLT-10 CAT Kompakt Palet Sistemi",
    sku: "TMR-PLT-10",
    keywords: ["PLT-10", "PLT 10", "CAT palet", "kompakt palet sistemi"],
  },
  {
    slug: "plt-8",
    path: "/urunler/palet-sistemleri/plt-8",
    name: "PLT-8 Hafif Ticari Palet Sistemi",
    shortName: "PLT-8",
    category: "Palet Sistemleri",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Palet Sistemleri", path: "/urunler/palet-sistemleri" },
    ],
    seoTitle: "PLT-8 Hafif Ticari Araç Palet Sistemi",
    description:
      "PLT-8 hafif ticari araç palet sistemi; hafif gövde, yüksek manevra kabiliyeti ve uzun servis ömrü ile zorlu zeminlerde güvenli sürüş.",
    image: "/og/plt8.jpg",
    imageAlt: "Temren Makina PLT-8 Hafif Ticari Araç Palet Sistemi",
    sku: "TMR-PLT-8",
    keywords: ["PLT-8", "PLT 8", "hafif ticari palet", "araç paleti"],
  },
  {
    slug: "plt-7",
    path: "/urunler/palet-sistemleri/plt-7",
    name: "PLT-7 ATV/UTV Palet Sistemi",
    shortName: "PLT-7",
    category: "Palet Sistemleri",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Palet Sistemleri", path: "/urunler/palet-sistemleri" },
    ],
    seoTitle: "PLT-7 ATV / UTV Palet Sistemi",
    description:
      "PLT-7 ATV ve UTV araçları için tasarlanmış kompakt palet sistemidir. Off-road operasyonlarda yüksek çekiş ve kontrol sağlar.",
    image: "/og/plt7.jpg",
    imageAlt: "Temren Makina PLT-7 ATV / UTV Palet Sistemi",
    sku: "TMR-PLT-7",
    keywords: ["PLT-7", "PLT 7", "ATV palet", "UTV palet sistemi"],
  },

  // ─── ÜRETİM EKİPMANLARI ────────────────────────────────────────────
  {
    slug: "vakum-tablasi",
    path: "/urunler/uretim/vakum-tablasi",
    name: "CNC Vakum Tablası",
    shortName: "Vakum Tablası",
    category: "Üretim Ekipmanları",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Üretim Ekipmanları", path: "/urunler/uretim" },
    ],
    seoTitle: "CNC Vakum Tablası | Hassas İşleme Çözümü",
    description:
      "Temren Makina CNC vakum tablası; alüminyum gövdeli, modüler tasarımı ve özel ölçü seçenekleri ile freze, gravür ve hassas işleme operasyonlarınızı güvence altına alır.",
    image: "/og/vakum-tablasi.jpg",
    imageAlt: "Temren Makina CNC Vakum Tablası",
    sku: "TMR-VKM-01",
    keywords: [
      "vakum tablası",
      "CNC vakum tablası",
      "CNC vakum tabla",
      "alüminyum vakum tablası",
      "freze vakum tablası",
      "özel ölçü vakum tablası",
    ],
  },
  {
    slug: "takim-sikma",
    path: "/urunler/uretim/takim-sikma",
    name: "Takım Sıkma Mekanizması",
    shortName: "Takım Sıkma",
    category: "Üretim Ekipmanları",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Üretim Ekipmanları", path: "/urunler/uretim" },
    ],
    seoTitle: "Takım Sıkma Mekanizması | CNC Takım Bağlama",
    description:
      "CNC takım sıkma mekanizması; yüksek tork ve hassasiyet ile takım bağlama operasyonlarınızı hızlandırır. BT, HSK ve özel ölçü destekleri mevcuttur.",
    image: "/og/takim-sikma.jpg",
    imageAlt: "Temren Makina Takım Sıkma Mekanizması",
    sku: "TMR-TSK-01",
    keywords: [
      "takım sıkma",
      "takım sıkma mekanizması",
      "CNC takım sıkma",
      "takım bağlama sistemi",
    ],
  },
  {
    slug: "mini-takim-boy-olcer",
    path: "/urunler/uretim/mini-takim-boy-olcer",
    name: "Mini Takım Boy Ölçer",
    shortName: "Mini Takım Boy Ölçer",
    category: "Üretim Ekipmanları",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Üretim Ekipmanları", path: "/urunler/uretim" },
    ],
    seoTitle: "Mini Takım Boy Ölçer | CNC Takım Ölçüm Sistemi",
    description:
      "Mini takım boy ölçer; CNC tezgâhlarınızda mikron hassasiyetinde takım boy ölçümü için ergonomik, dayanıklı ve hızlı bir çözümdür.",
    image: "/og/mini-boy-olcer.jpg",
    imageAlt: "Temren Makina Mini Takım Boy Ölçer",
    sku: "TMR-MBO-01",
    keywords: [
      "mini takım boy ölçer",
      "takım boy ölçer",
      "CNC takım ölçüm",
      "takım boy ölçüm aleti",
    ],
  },
  {
    slug: "konik-temizleme",
    path: "/urunler/uretim/konik-temizleme",
    name: "Konik Temizleme Aparatı",
    shortName: "Konik Temizleme",
    category: "Üretim Ekipmanları",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Üretim Ekipmanları", path: "/urunler/uretim" },
    ],
    seoTitle: "Konik Temizleme Aparatı | CNC Spindle Bakım",
    description:
      "Konik temizleme aparatı; CNC spindle koniklerini güvenli ve hızlı şekilde temizleyerek takım hassasiyetini ve uzun ömürlü kullanım sağlar.",
    image: "/og/konik-temizleme.jpg",
    imageAlt: "Temren Makina Konik Temizleme Aparatı",
    sku: "TMR-KTM-01",
    keywords: [
      "konik temizleme",
      "konik temizleme aparatı",
      "spindle konik temizleme",
      "CNC bakım ekipmanı",
    ],
  },
  {
    slug: "vortex-tupu",
    path: "/urunler/uretim/vortex-tupu",
    name: "Vortex Tüpü Soğutma Sistemi",
    shortName: "Vortex Tüpü",
    category: "Üretim Ekipmanları",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Üretim Ekipmanları", path: "/urunler/uretim" },
    ],
    seoTitle: "Vortex Tüpü | CNC Soğutma & Hava Akış Sistemi",
    description:
      "Vortex tüpü; basınçlı havayı soğuk ve sıcak akışlara ayırarak CNC kesme operasyonlarında verimli soğutma sağlar. Yağsız, temiz ve enerji tasarruflu.",
    image: "/og/vortex-tupu.jpg",
    imageAlt: "Temren Makina Vortex Tüpü Soğutma Sistemi",
    sku: "TMR-VRX-01",
    keywords: [
      "vortex tüpü",
      "vorteks tüpü",
      "CNC soğutma",
      "soğutma tüpü",
      "vortex tube",
    ],
  },
  {
    slug: "byk1000",
    path: "/urunler/uretim/byk1000",
    name: "BYK-1000 Emülsiyon Sistemi",
    shortName: "BYK-1000",
    category: "Üretim Ekipmanları",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Üretim Ekipmanları", path: "/urunler/uretim" },
    ],
    seoTitle: "BYK-1000 Emülsiyon Sistemi | CNC Soğutma Sıvısı Yönetimi",
    description:
      "BYK-1000 emülsiyon hazırlama ve karıştırma sistemi; CNC ve talaşlı imalat tezgâhlarınız için hassas oranlı, otomatik soğutma sıvısı çözümüdür.",
    image: "/og/byk1000.jpg",
    imageAlt: "Temren Makina BYK-1000 Emülsiyon Sistemi",
    sku: "TMR-BYK-1000",
    keywords: [
      "BYK-1000",
      "emülsiyon sistemi",
      "soğutma sıvısı sistemi",
      "CNC emülsiyon",
    ],
  },
  {
    slug: "byk500",
    path: "/urunler/uretim/byk500",
    name: "BYK-500 Emülsiyon Sistemi",
    shortName: "BYK-500",
    category: "Üretim Ekipmanları",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
      { name: "Üretim Ekipmanları", path: "/urunler/uretim" },
    ],
    seoTitle: "BYK-500 Emülsiyon Sistemi | Kompakt Soğutma Çözümü",
    description:
      "BYK-500 kompakt emülsiyon sistemi; küçük ve orta ölçekli üretim tezgâhları için pratik, ekonomik ve dayanıklı bir soğutma sıvısı yönetim çözümüdür.",
    image: "/og/byk500.jpg",
    imageAlt: "Temren Makina BYK-500 Emülsiyon Sistemi",
    sku: "TMR-BYK-500",
    keywords: [
      "BYK-500",
      "emülsiyon sistemi",
      "kompakt emülsiyon",
      "CNC soğutma sıvısı",
    ],
  },

  // ─── KAUÇUK SİSTEMLERİ & PLATFORMLAR ───────────────────────────────
  {
    slug: "kaucuk-sistemleri",
    path: "/urunler/kaucuk-sistemleri",
    name: "Endüstriyel Kauçuk Sistemleri",
    shortName: "Kauçuk Sistemleri",
    category: "Kauçuk Sistemleri",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
    ],
    seoTitle: "Endüstriyel Kauçuk Sistemleri | Özel Üretim Kauçuk Parçalar",
    description:
      "Temren Makina endüstriyel kauçuk sistemleri; özel kalıplı, dayanıklı ve sektörel ihtiyaçlara göre üretilen kauçuk komponentler sunar.",
    image: "/og/kaucuk-sistemleri.jpg",
    imageAlt: "Temren Makina Endüstriyel Kauçuk Sistemleri",
    sku: "TMR-KCK-01",
    keywords: [
      "kauçuk sistemleri",
      "endüstriyel kauçuk",
      "özel kauçuk parça",
      "kauçuk imalatı",
    ],
  },
  {
    slug: "tika",
    path: "/urunler/tika",
    name: "TİKA Uzaktan Kumandalı Platform Sistemi",
    shortName: "TİKA",
    category: "Uzaktan Kumandalı Platformlar",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
    ],
    seoTitle: "TİKA Uzaktan Kumandalı Platform | Modüler Paletli Araç",
    description:
      "TİKA uzaktan kumandalı paletli platform; savunma sanayi, tarım ve endüstri için modüler, dayanıklı ve operatör güvenliği odaklı bir çözümdür.",
    image: "/og/tika.jpg",
    imageAlt: "Temren Makina TİKA Uzaktan Kumandalı Platform",
    sku: "TMR-TIKA-01",
    keywords: [
      "TİKA",
      "TIKA",
      "uzaktan kumandalı platform",
      "paletli platform",
      "savunma sanayi platformu",
      "modüler tarım aracı",
    ],
  },
  {
    slug: "mini-tika",
    path: "/urunler/mini-tika",
    name: "Mini TİKA Uzaktan Kumandalı Platform",
    shortName: "Mini TİKA",
    category: "Uzaktan Kumandalı Platformlar",
    breadcrumb: [
      { name: "Anasayfa", path: "/" },
      { name: "Ürünler", path: "/urunler" },
    ],
    seoTitle: "Mini TİKA Uzaktan Kumandalı Platform | Kompakt Paletli Sistem",
    description:
      "Mini TİKA; uzaktan kumandalı, kompakt paletli platform sistemidir. Bahçecilik, savunma ve özel görev senaryolarında pratik kullanım sunar.",
    image: "/og/mini-tika.jpg",
    imageAlt: "Temren Makina Mini TİKA Uzaktan Kumandalı Platform",
    sku: "TMR-MTIKA-01",
    keywords: [
      "Mini TİKA",
      "mini tika",
      "kompakt platform",
      "uzaktan kumandalı paletli araç",
    ],
  },
];

/**
 * Map indexed by slug for O(1) lookups inside generateMetadata.
 */
export const PRODUCTS: Record<string, ProductDef> = Object.fromEntries(
  productList.map((p) => [p.slug, p]),
);

/** Returns all products in declaration order. Useful for sitemaps & listings. */
export function getAllProducts(): ProductDef[] {
  return productList;
}

/** Returns a product by slug or throws if missing (so build errors are loud). */
export function getProductBySlug(slug: string): ProductDef {
  const product = PRODUCTS[slug];
  if (!product) {
    throw new Error(
      `[products] Unknown product slug "${slug}". Add it to src/lib/products.ts.`,
    );
  }
  return product;
}
