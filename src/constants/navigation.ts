export const NAV_LINKS = [
  { label: "ANASAYFA", href: "/" },

  {
    label: "KURUMSAL",
    isMega: true,
    columns: [
      {
        items: [
          { name: "Hakkımızda", href: "/kurumsal/hakkimizda" },
          { name: "Belgelerimiz", href: "/kurumsal/belgelerimiz" },
          { name: "Politikalarımız", href: "/kurumsal/politikalarimiz" },
          { name: "Referanslarımız", href: "/kurumsal/referanslarimiz" },
          { name: "İhracatlarımız", href: "/kurumsal/ihracatlarimiz" },
        ],
      },
      {
        items: [
          { name: "e-Katalog", href: "/kurumsal/e-katalog" },
          { name: "İnsan Kaynakları", href: "/kurumsal/insankaynaklari" },
          { name: "S.S.S", href: "/kurumsal/sss" },
          { name: "Müşteri Görüşleri", href: "/kurumsal/musterigorusleri" },
          { name: "Banka Bilgileri", href: "/kurumsal/bankabilgileri" },
        ],
      },
    ],
  },

  {
    label: "FAALİYET ALANLARI",
    isMega: true,
    columns: [
      {
        items: [
          { name: "Üretim Ekipmanları", href: "/faaliyet/uretim" },
          { name: "Yapı - İnşaat", href: "/faaliyet/insaat" },
        ],
      },
    ],
  },

  {
    label: "ÜRÜNLER",
    isMega: true,
    isProductMega: true,
    categories: [
      {
        title: "PALET SİSTEMLERİ",
        sub: [
          {
            name: "Traktör Palet",
            items: [
              { name: "PLT-18", href: "/urunler/palet-sistemleri/plt-18" },
              { name: "PLT-17", href: "/urunler/palet-sistemleri/plt-17" },
              { name: "PLT-16", href: "/urunler/palet-sistemleri/plt-16" },
              { name: "PLT-15", href: "/urunler/palet-sistemleri/plt-15" },
              { name: "PLT-10", href: "/urunler/palet-sistemleri/plt-10" },
            ],
          },
          {
            name: "Araç Palet",
            items: [
              { name: "PLT-12", href: "/urunler/palet-sistemleri/plt-12" },
              { name: "PLT-8", href: "/urunler/palet-sistemleri/plt-08" },
              { name: "PLT-7", href: "/urunler/palet-sistemleri/plt-07" },
            ],
          },
        ],
      },

      {
        title: "ÜRETİM ÇÖZÜMLERİ",
        sub: [
          {
            name: "Hassas Sabitleme & Ölçüm",
            items: [
              { name: "Vakumlu Tabla", href: "/urunler/uretim/vakumlu-tabla" },
              { name: "Takım Sıkma Mekanizması", href: "/urunler/uretim/takim-sikma" },
              { name: "Mini Takım Boy Ölçer", href: "/urunler/uretim/mini-takim-boy-olcer" },
              { name: "Konik Temizleme", href: "/urunler/uretim/konik-temizleme" },
            ],
          },
          {
            name: "Soğutma & Emülsiyon",
            items: [
              { name: "Vortex Tüpü", href: "/urunler/uretim/vortex-tupu" },
              { name: "BYK-1000 Emülsiyon", href: "/urunler/uretim/byk1000" },
              { name: "BYK-500 Emülsiyon", href: "/urunler/uretim/byk500" },
            ],
          },
        ],
      },

      {
        title: "DİĞER SİSTEMLER",
        sub: [
          {
            name: "Özel Çözümler",
            items: [
              { name: "Kauçuk Sistemleri", href: "/urunler/kaucuk-sistemleri" },
              { name: "TİKA", href: "/urunler/tika" },
              { name: "MİNİ TİKA", href: "/urunler/mini-tika" },
            ],
          },
        ],
      },
    ],
  },

  {
    label: "MEDYA",
    isMega: true,
    columns: [
      {
        items: [
          { name: "Foto Galeri", href: "/medya/foto" },
          { name: "Video Galeri", href: "/medya/video" },
          { name: "Blog", href: "/medya/blog" },
        ],
      },
    ],
  },

  { label: "İLETİŞİM", href: "/iletisim" },
];
