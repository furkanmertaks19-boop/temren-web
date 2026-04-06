export type SlideItem = {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  isActive?: boolean;
  order?: number;
};

export const sliderData: SlideItem[] = [
  {
    title: "TEMREN MAKİNA",
    subtitle: "YERLİ MÜHENDİSLİK ÇÖZÜMLERİ",
    description: "Endüstriyel ve tarımsal çözümlerimizle geleceği üretiyoruz.",
    image: "/roketsan.jpg",
    buttonText: "İNCELE",
    buttonLink: "/urunler",
    isActive: true,
    order: 0,
  },
  {
    title: "ÜRÜNLERİMİZ",
    subtitle: "GÜÇLÜ VE MODERN SİSTEMLER",
    description: "Temren Makina ürün ailesini keşfedin.",
    image: "/urunler.png",
    buttonText: "ÜRÜNLER",
    buttonLink: "/urunler",
    isActive: true,
    order: 1,
  },
  {
    title: "FAALİYET ALANLARI",
    subtitle: "SEKTÖREL ÇÖZÜMLER",
    description: "Savunma, tarım ve sanayi alanlarında yenilikçi yaklaşım.",
    image: "/tarimaraci.png",
    buttonText: "DETAY",
    buttonLink: "/faaliyet",
    isActive: true,
    order: 2,
  },
];