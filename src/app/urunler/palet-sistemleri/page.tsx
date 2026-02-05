"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';
import { Tractor, Car, ArrowRight } from 'lucide-react';

const kategoriler = [
    {
        id: "traktor",
        title: "Traktör Palet Sistemleri",
        icon: <Tractor size={32} className="text-amber-600" />,
        items: [
            { id: "plt-18", name: "PLT-18", desc: "Ağır Hizmet" },
            { id: "plt-17", name: "PLT-17", desc: "Orta Segment" },
            { id: "plt-16", name: "PLT-16", desc: "Standart" },
            { id: "plt-15", name: "PLT-15", desc: "Kompakt" },
            { id: "plt-10", name: "PLT-10", desc: "Ekonomik" },
        ]
    },
    {
        id: "arac",
        title: "Araç Palet Sistemleri",
        icon: <Car size={32} className="text-amber-600" />,
        items: [
            { id: "plt-12", name: "PLT-12", desc: "4x4 Ekstrem" },
            { id: "plt-8", name: "PLT-8", desc: "Hafif Ticari" },
            { id: "plt-7", name: "PLT-7", desc: "ATV / UTV" },
        ]
    }
];

export default function PaletSistemleriAnaPage() {
    return (
        <main className="min-h-screen bg-[#fcfcfc]">
            <PageHeader
                title="Palet Sistemleri"
                subtitle="Zorlu arazi koşullarında maksimum çekiş ve zemin koruma sağlayan profesyonel çözümler."
            />

            <div className="container mx-auto py-20 px-6">
                {kategoriler.map((kat) => (
                    <section key={kat.id} className="mb-24">
                        <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-6">
                            {kat.icon}
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">{kat.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {kat.items.map((item) => (
                                <Link
                                    href={`/urunler/palet-sistemleri/${item.id}`}
                                    key={item.id}
                                    className="group relative bg-white border border-gray-200 p-10 rounded-[40px] shadow-sm hover:shadow-2xl hover:border-amber-500 transition-all duration-700 overflow-hidden min-h-85 flex flex-col justify-between"
                                >
                                    {/* Ön Plan İçerik */}
                                    <div className="relative z-20">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="text-amber-600 font-bold text-xs tracking-widest uppercase mb-2 block">
                                                    {item.desc}
                                                </span>
                                                <h3 className="text-5xl font-black text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                                                    {item.name}
                                                </h3>
                                            </div>

                                            <span className="text-4xl font-black text-gray-100 group-hover:text-amber-100 transition-colors duration-500 select-none">
                                                #{item.id.split('-')[1]}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative z-20">
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                                            DETAYLARI İNCELE <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                                        </div>
                                    </div>

                                    {/* Dinamik Arka Plan İkonu - Tüm Ürünler İçin Otomatik */}
                                    <div className="absolute -right-12 -bottom-10 select-none pointer-events-none transition-all duration-700 ease-in-out">
                                        <div className="relative w-95 h-95 opacity-[0.12] group-hover:opacity-[0.25] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 origin-center">
                                            <Image
                                                src={`/${item.id.replace('-', '')}-icon.png`}
                                                alt={`${item.name} Icon`}
                                                fill
                                                className="object-contain"
                                                onError={(e) => {
                                                    // Eğer ikon yoksa hata vermemesi için gizliyoruz
                                                    (e.target as any).style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/50 to-amber-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}