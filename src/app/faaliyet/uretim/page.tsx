"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 1. Link bileşenini ekledik
import PageHeader from '@/components/layout/PageHeader';

interface Product {
  id: number;
  title: string;
  tags: string[];
  description: string;
  image: string;
  href: string; // 2. Her ürün için bir link adresi ekledik
}

const products: Product[] = [
  {
    id: 1,
    title: "Vakum Tablası",
    tags: ["CNC", "Hassas Tutma"],
    description: "CNC tezgahlarında yüksek tutuculuk sağlar; seri işlerde hız ve tekrarlanabilirlik kazandırır.",
    image: "/image/vakum_5.jpg",
    href: "/urunler/uretim/vakum-tablasi" // Resimdeki klasör yapına göre
  },
  {
    id: 2,
    title: "Vorteks Tüpü",
    tags: ["Havalı", "Soğutma"],
    description: "Basınçlı hava ile noktasal soğutma; hareketli parça içermez, bakımı düşüktür.",
    image: "/image/vortex_1.jpeg",
    href: "/urunler/uretim/vortex-tupu"
  },
  {
    id: 3,
    title: "Takım Sıkma Mekanizması",
    tags: ["Tork Kontrollü"],
    description: "Tork kontrolü ile güvenli, hassas ve tekrarlanabilir sabitleme.",
    image: "/image/takim_sikma.jpg",
    href: "/urunler/uretim/takim-sikma"
  },
  {
    id: 4,
    title: "Konik Temizleme Makinası",
    tags: ["Bakım", "Atölye"],
    description: "Konik yüzeyleri hızlı ve standartlara uygun şekilde temizler.",
    image: "/image/konik_1.webp",
    href: "/urunler/uretim/konik-temizleme"
  },
  {
    id: 5,
    title: "Mini Takım Boy Ölçer",
    tags: ["Metrologi"],
    description: "Hassas ölçüm için kompakt, dayanıklı ve hızlı çözüm.",
    image: "/image/minitakim_1.webp",
    href: "/urunler/uretim/mini-takim-boy-olcer"
  },
  {
    id: 6,
    title: "BYK-1000",
    tags: ["Karıştırıcı"],
    description: "Bor yağı & suyu hassas oranda karıştırır; standart emülsiyon sağlar.",
    image: "/image/byk1000.jpg",
    href: "/urunler/uretim/byk1000"
  },
  {
    id: 7,
    title: "BYK-500",
    tags: ["Karıştırıcı"],
    description: "Kompakt yapıda, doğru oranlama ve düşük bakım maliyeti.",
    image: "/image/boryag_1.jpg",
    href: "/urunler/uretim/byk500"
  }
];

export default function UretimEkipmanlariPage() {
  return (
    <main className="min-h-screen bg-white pb-20">
      <PageHeader 
        title="Üretim Ekipmanları" 
        subtitle="Endüstriyel üretim süreçlerinizde verimliliği artıran yüksek hassasiyetli çözümlerimiz."
      />

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group flex flex-col bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Ürün Görseli - Tıklanabilir */}
              <Link href={product.href} className="relative h-72 w-full overflow-hidden bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x400?text=Gorsel+Yok';
                  }}
                />
              </Link>

              {/* Ürün İçeriği */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-3">
                  {product.title}
                </h2>
                
                <p className="text-slate-500 leading-relaxed text-sm mb-8 flex-grow font-medium italic">
                  {product.description}
                </p>

                <div className="pt-6 border-t border-slate-50">
                  {/* Buton Link olarak güncellendi */}
                  <Link 
                    href={product.href}
                    className="inline-flex items-center text-xs font-black uppercase tracking-widest text-blue-600 hover:text-black transition-colors group/btn"
                  >
                    DETAYLI BİLGİ 
                    <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}