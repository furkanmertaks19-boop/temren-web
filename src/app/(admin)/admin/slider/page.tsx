"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    Plus, Trash2, Save, Loader2,
    Image as ImageIcon, Link as LinkIcon, Eye, EyeOff, Info, Upload, ChevronDown
} from 'lucide-react';

// ✅ 1. ADIM: Sitedeki TÜM sayfaları buraya ekledim
// ✅ Gidilebilecek TÜM Sayfaların Güncel Listesi
const AVAILABLE_PAGES = [
    { name: "ANA SAYFA", path: "/" },
    { name: "KURUMSAL / HAKKIMIZDA", path: "/kurumsal/hakkimizda" },
    { name: "KURUMSAL / MÜŞTERİ GÖRÜŞLERİ", path: "/kurumsal/musteri-gorusleri" },
    { name: "MEDYA / BLOG", path: "/medya/blog" },
    { name: "MEDYA / FOTO GALERİ", path: "/medya/foto" },
    { name: "MEDYA / VİDEO GALERİ", path: "/medya/video" },
    { name: "İLETİŞİM", path: "/iletisim" },
    // Ürünler Grubu
    { name: "ÜRÜN: PLT-7", path: "/urunler/palet-sistemleri/plt-7" },
    { name: "ÜRÜN: PLT-8", path: "/urunler/palet-sistemleri/plt-8" },
    { name: "ÜRÜN: PLT-10", path: "/urunler/palet-sistemleri/plt-10" },
    { name: "ÜRÜN: PLT-12", path: "/urunler/palet-sistemleri/plt-12" },
    { name: "ÜRÜN: PLT-15", path: "/urunler/palet-sistemleri/plt-15" },
    { name: "ÜRÜN: PLT-16", path: "/urunler/palet-sistemleri/plt-16" },
    { name: "ÜRÜN: PLT-17", path: "/urunler/palet-sistemleri/plt-17" },
    { name: "ÜRÜN: PLT-18", path: "/urunler/palet-sistemleri/plt-18" },
    { name: "ÜRÜN: TİKA", path: "/urunler/tika" },
    { name: "ÜRÜN: MİNİ TİKA", path: "/urunler/mini-tika" },
];
export default function AdminSliderPage() {
    const [slides, setSlides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/slider').then(res => res.json()).then(data => {
            setSlides(data);
            setLoading(false);
        });
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (activeUploadIndex === null || !e.target.files?.[0]) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.url) {
                const newSlides = [...slides];
                newSlides[activeUploadIndex].image = data.url;
                setSlides(newSlides);
            }
        } catch (error) {
            alert("Yükleme başarısız!");
        }
    };

    const addNewSlide = () => {
        setSlides([...slides, {
            title: "YENİ BAŞLIK",
            subtitle: "ALT BAŞLIK",
            description: "Açıklama...",
            image: "",
            buttonLink: "/",
            isActive: true,
            order: slides.length
        }]);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/slider', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(slides)
            });
            if (res.ok) alert("Slider Yayına Alındı!");
        } catch (error) {
            alert("Kaydedilirken bir hata oluştu!");
        } finally { setSaving(false); }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA]"><Loader2 className="animate-spin text-slate-400" size={40} /></div>;

    return (
        <div className="p-8 bg-[#F8F9FA] min-h-screen font-sans text-slate-900">
            {/* Üst Başlık */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800">
                        SLIDER <span className="text-amber-500 font-light">YÖNETİMİ</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-bold uppercase mt-1 italic tracking-widest">Görselleri ve Sloganları Düzenle</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={addNewSlide} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 transition-all">
                        <Plus size={18} /> Yeni Slayt
                    </button>
                    <button onClick={handleSave} disabled={saving} className="bg-slate-900 hover:bg-black text-white px-8 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 shadow-xl shadow-slate-200 transition-all">
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Değişiklikleri Yayınla</>}
                    </button>
                </div>
            </div>

            {/* Slayt Kartları */}
            <div className="space-y-6 max-w-6xl mb-12">
                {slides.map((slide, index) => (
                    <div key={index} className="bg-white border border-slate-100 p-6 rounded-[2.5rem] flex flex-col lg:flex-row gap-8 items-center shadow-sm hover:shadow-md transition-all">

                        {/* Görsel Yükleme Alanı */}
                        <div
                            onClick={() => { setActiveUploadIndex(index); fileInputRef.current?.click(); }}
                            className="w-full lg:w-64 aspect-video bg-slate-50 rounded-3xl overflow-hidden relative border-2 border-dashed border-slate-200 hover:border-amber-500 transition-all cursor-pointer group"
                        >
                            {slide.image ? (
                                <img src={slide.image} className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" alt="Preview" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-slate-300">
                                    <Upload size={32} />
                                    <span className="text-[10px] font-black mt-2 uppercase italic">Görsel Seç</span>
                                </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                <div className="bg-white text-slate-900 p-3 rounded-full shadow-xl">
                                    <Upload size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Düzenleme Girişleri */}
                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <input
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 outline-none focus:border-amber-500 font-black uppercase text-sm"
                                    placeholder="Slider Başlığı"
                                    value={slide.title}
                                    onChange={e => { const n = [...slides]; n[index].title = e.target.value; setSlides(n); }}
                                />
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 outline-none focus:border-amber-500 text-xs font-bold resize-none"
                                    placeholder="Slogan Açıklaması"
                                    rows={2}
                                    value={slide.description}
                                    onChange={e => { const n = [...slides]; n[index].description = e.target.value; setSlides(n); }}
                                />
                            </div>
                            <div className="space-y-3">

                                {/* ✅ 2. ADIM: LINK SELECTOR (DROPDOWN) - EKSİKSİZ LİSTE */}
                                <div className="relative group">
                                    <LinkIcon className="absolute left-3 top-3.5 text-slate-300 group-focus-within:text-amber-500 transition-colors" size={16} />
                                    <select
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 pl-10 outline-none focus:border-amber-500 text-[10px] font-black uppercase appearance-none cursor-pointer"
                                        value={slide.buttonLink}
                                        onChange={e => { const n = [...slides]; n[index].buttonLink = e.target.value; setSlides(n); }}
                                    >
                                        <option value="">BUTONUN GİDECEĞİ SAYFAYI SEÇİN</option>
                                        {AVAILABLE_PAGES.map((page) => (
                                            <option key={page.path} value={page.path}>
                                                {page.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                                        <ChevronDown size={16} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                    <ImageIcon className="text-slate-300" size={16} />
                                    <span className="text-[9px] font-mono text-slate-400 truncate tracking-tighter">{slide.image || "Görsel yüklenmedi..."}</span>
                                </div>
                            </div>
                        </div>

                        {/* Kontroller */}
                        <div className="flex lg:flex-col gap-2 border-l border-slate-100 pl-4">
                            <button
                                onClick={() => { const n = [...slides]; n[index].isActive = !n[index].isActive; setSlides(n); }}
                                className={`p-3 rounded-xl transition-all ${slide.isActive ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}
                            >
                                {slide.isActive ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                            <button
                                onClick={() => setSlides(slides.filter((_, i) => i !== index))}
                                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

            {/* BİLGİ NOTU */}
            <div className="bg-amber-50 border border-amber-100 p-8 rounded-[3rem] max-w-6xl flex items-start gap-5 shadow-sm">
                <div className="bg-amber-500 p-4 rounded-2xl text-white shadow-lg shadow-amber-200">
                    <Info size={28} />
                </div>
                <div>
                    <h3 className="font-black italic text-amber-900 uppercase tracking-tighter text-xl mb-2">Slider İçerik Standartları</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-amber-800/80 text-[11px] font-bold uppercase italic leading-relaxed">
                        <p>• İdeal Boyut: <span className="text-amber-600 font-black">1920x1080 PX</span></p>
                        <p>• Format: <span className="text-amber-600 font-black">.WEBP</span> Önerilir</p>
                        <p>• Buton Linki: Listeden <span className="text-amber-600 font-black">Sayfa Seçin</span></p>
                        <p>• Sıralama: Yeni eklenenler <span className="text-amber-600 font-black">en sona</span> eklenir.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}