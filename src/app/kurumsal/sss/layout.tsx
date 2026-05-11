import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const PATH = "/kurumsal/sss";

export const metadata: Metadata = buildMetadata({
  title: "Sıkça Sorulan Sorular | Temren Makina",
  description:
    "Temren Makina ürünleri, palet sistemleri, vakum tablası ve diğer çözümlerimiz hakkında sıkça sorulan soruların yanıtları. Aradığınız bilgiyi hızlıca bulun.",
  path: PATH,
  keywords: [
    "Temren Makina SSS",
    "sıkça sorulan sorular",
    "palet sistemi soruları",
    "vakum tablası soruları",
  ],
});

const generalFaqs = [
  {
    question: "Temren Makina nerede üretim yapıyor?",
    answer:
      "Üretim tesisimiz Ankara Kahramankazan'da, Saray Mahallesi 100. Yıl Bulvarı üzerinde bulunmaktadır.",
  },
  {
    question: "Hangi sektörlere üretim yapıyorsunuz?",
    answer:
      "Savunma sanayi, tarım, endüstriyel CNC üretimi ve özel proje bazlı imalat alanlarında hizmet veriyoruz.",
  },
  {
    question: "Ürünler için teklif nasıl alınır?",
    answer:
      "İletişim sayfamızdan formu doldurabilir, satis@temrenmakina.com adresine e-posta gönderebilir veya +90 312 815 15 15 numarasından bizi arayabilirsiniz.",
  },
  {
    question: "İhracat yapıyor musunuz?",
    answer:
      "Evet, Avrupa, Orta Doğu ve Türki Cumhuriyetler dahil olmak üzere birçok ülkeye ürünlerimizi ihraç ediyoruz.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(generalFaqs),
          breadcrumbSchema([
            { name: "Anasayfa", path: "/" },
            { name: "Kurumsal", path: "/kurumsal/hakkimizda" },
            { name: "Sıkça Sorulan Sorular", path: PATH },
          ]),
        ]}
        id="sss-schema"
      />
      {children}
    </>
  );
}
