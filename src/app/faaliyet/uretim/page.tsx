"use client"; // 1. HATANIN ÇÖZÜMÜ: Event handlerlar için client component şarttır.

import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';

interface Product {
  id: number;
  title: string;
  tags: string[];
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Vakum Tablası",
    tags: ["CNC", "Hassas Tutma"],
    description: "CNC tezgahlarında yüksek tutuculuk sağlar; seri işlerde hız ve tekrarlanabilirlik kazandırır.",
    image: "/image/vakum_5.jpg"
  },
  {
    id: 2,
    title: "Vorteks Tüpü",
    tags: ["Havalı", "Soğutma"],
    description: "Basınçlı hava ile noktasal soğutma; hareketli parça içermez, bakımı düşüktür.",
    image:"/image/vortex_1.jpeg"
  },
  {
    id: 3,
    title: "Takım Sıkma Mekanizması",
    tags: ["Tork Kontrollü"],
    description: "Tork kontrolü ile güvenli, hassas ve tekrarlanabilir sabitleme.",
    image: "/image/takim_sikma.jpg"
  },
  {
    id: 4,
    title: "Konik Temizleme Makinası",
    tags: ["Bakım", "Atölye"],
    description: "Konik yüzeyleri hızlı ve standartlara uygun şekilde temizler.",
    image: "/image/konik_1.webp"
  },
  {
    id: 5,
    title: "Mini Takım Boy Ölçer",
    tags: ["Metrologi"],
    description: "Hassas ölçüm için kompakt, dayanıklı ve hızlı çözüm.",
    image:"/image/minitakim_1.webp"
  },
  {
    id: 6,
    title: "BYK-1000",
    tags: ["Karıştırıcı"],
    description: "Bor yağı & suyu hassas oranda karıştırır; standart emülsiyon sağlar.",
    image: "/image/byk1000.jpg"
  },
  {
    id: 7,
    title: "BYK-500",
    tags: ["Karıştırıcı"],
    description: "Kompakt yapıda, doğru oranlama ve düşük bakım maliyeti.",
    image: "/image/boryag_1.jpg"
  }
];

export default function UretimEkipmanlariPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 2. HATANIN ÇÖZÜMÜ: PageHeader description değil 'subtitle' bekliyor. */}
      <PageHeader 
        title="Üretim Ekipmanları" 
        subtitle="Endüstriyel üretim süreçlerinizde verimliliği artıran yüksek hassasiyetli çözümlerimiz."
      />

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Ürün Görseli */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x400?text=Gorsel+Yok';
                  }}
                />
              </div>

              {/* Ürün İçeriği */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h2>
                
                <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow">
                  {product.description}
                </p>

                <div className="pt-6 border-t border-gray-100">
                  <button className="flex items-center text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    DETAYLI BİLGİ 
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}