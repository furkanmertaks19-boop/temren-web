"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
    Mail, Phone, User, ChevronRight, X, FileText,
    Calendar, CheckCircle2, Zap, Download, ExternalLink,
    RefreshCcw, Package, Box, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TekliflerPage() {
    const [teklifler, setTeklifler] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTeklif, setSelectedTeklif] = useState<any>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // --- TÜM VERİLERİ KALICI BİLGİLERLE BİRLEŞTİREREK GETİREN FONKSİYON ---
    const verileriGetir = useCallback(async (isAuto = false) => {
        if (!isAuto) setIsRefreshing(true);
        try {
            // Her iki kaynaktan verileri çekiyoruz
            const [resContact, resQuote] = await Promise.all([
                fetch("/api/teklifler").then(r => r.json()),
                fetch("/api/quote-request").then(r => r.json())
            ]);

            // 1. İletişim Formu Standardizasyonu
            const contactData = (resContact.success ? resContact.data : []).map((item: any) => ({
                ...item,
                source: 'contact',
                adSoyad: item.adSoyad,
                displayProduct: item.secim || item.konu || "Genel İletişim",
                // Veritabanındaki gerçek 'okundu' (boolean) alanına bak
                displayStatus: item.okundu === true
            }));

            // 2. Ürün Teklifleri (Vakum, PLT-16, Vortex) Standardizasyonu
            const quoteData = (Array.isArray(resQuote) ? resQuote : []).map((item: any) => ({
                ...item,
                source: 'quote',
                adSoyad: item.fullName || item.adSoyad,
                telefon: item.phone || item.telefon,
                mesaj: item.message || item.mesaj,
                displayProduct: item.productName || "Ürün Teklifi",
                // Veritabanındaki 'status' (string) veya 'okundu' (boolean) alanına bak
                displayStatus: item.status === "Okundu" || item.okundu === true
            }));

            // 3. Birleştir ve Tarihe göre sırala
            const combined = [...contactData, ...quoteData].sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            setTeklifler(combined);
        } catch (error) {
            console.error("Veri senkronizasyon hatası:", error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => {
        verileriGetir();
        const interval = setInterval(() => verileriGetir(true), 45000);
        return () => clearInterval(interval);
    }, [verileriGetir]);

    // --- KALICI OKUNDU İŞARETLEME (DB GÜNCELLEME) ---
    const teklifOku = async (teklif: any) => {
        setSelectedTeklif(teklif);

        // Eğer veritabanında zaten "Okundu" ise API'yi yorma
        if (teklif.displayStatus) return;

        try {
            // Kaynağa göre doğru rotayı seçiyoruz
            const apiPath = teklif.source === 'contact' ? "/api/teklifler/oku" : `/api/quote-request/${teklif._id}`;
            const method = teklif.source === 'contact' ? "POST" : "PATCH";
            const body = teklif.source === 'contact' ? { id: teklif._id } : { status: "Okundu" };

            const response = await fetch(apiPath, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                // Veritabanı onaylayınca anlık olarak listeyi güncelle
                setTeklifler(prev => prev.map(t =>
                    t._id === teklif._id ? { ...t, displayStatus: true, okundu: true, status: "Okundu" } : t
                ));
            }
        } catch (err) {
            console.error("Veritabanı güncelleme hatası:", err);
        }
    };

    return (
        <div className="p-6 md:p-10 bg-[#F8F9FA] min-h-screen font-sans text-slate-900">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        MÜŞTERİ <span className="text-amber-500 font-black">TALEPLERİ</span>
                    </h1>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-4 flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isRefreshing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                        {teklifler.filter(t => !t.displayStatus).length} Yeni Mesaj • Sistem Canlı Takipte
                    </p>
                </div>
                <button onClick={() => verileriGetir()} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                    <RefreshCcw size={14} className={isRefreshing ? "animate-spin" : ""} /> Manuel Yenile
                </button>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-4">
                    <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Veritabanı Senkronize Ediliyor...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {teklifler.map((teklif) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            key={teklif._id}
                            onClick={() => teklifOku(teklif)}
                            className={`group bg-white border ${teklif.displayStatus ? 'border-slate-100 opacity-60 bg-slate-50/50' : 'border-amber-200 shadow-xl shadow-amber-500/5'} p-6 rounded-[2.5rem] hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center justify-between cursor-pointer`}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all ${teklif.displayStatus ? 'bg-slate-200 text-slate-400' : 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'}`}>
                                    {teklif.displayStatus ? <CheckCircle2 size={28} /> : <Zap size={28} />}
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        <h3 className={`text-base font-black uppercase tracking-tight ${teklif.displayStatus ? 'text-slate-500' : 'text-slate-900'}`}>{teklif.adSoyad}</h3>
                                        <span className="bg-slate-900 text-amber-500 text-[9px] font-black px-2 py-0.5 rounded-md uppercase italic tracking-widest">
                                            {teklif.displayProduct}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                                        <span className="flex items-center gap-1.5"><Mail size={12} className="text-amber-500" /> {teklif.email}</span>
                                        <span className="flex items-center gap-1.5"><Phone size={12} className="text-amber-500" /> {teklif.telefon}</span>
                                        {teklif.selectedSize && <span className="flex items-center gap-1.5 text-slate-900 font-black"><Package size={12} /> {teklif.selectedSize}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center gap-6">
                                <div className="text-right hidden sm:block">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1 italic">Gönderim</p>
                                    <p className="text-[11px] font-bold text-slate-600">{new Date(teklif.createdAt).toLocaleDateString('tr-TR')}</p>
                                </div>
                                <ChevronRight size={20} className="text-slate-200 group-hover:text-amber-500 group-hover:translate-x-2 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* DETAY MODAL */}
            <AnimatePresence>
                {selectedTeklif && (
                    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl border border-white overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="p-8 md:p-14 overflow-y-auto no-scrollbar text-slate-900">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="p-5 bg-slate-900 text-amber-500 rounded-4xl shadow-2xl shadow-black/20"><Box size={32} /></div>
                                    <button onClick={() => setSelectedTeklif(null)} className="p-4 bg-slate-50 hover:bg-red-500 hover:text-white rounded-3xl transition-all shadow-sm"><X size={24} /></button>
                                </div>
                                <div className="space-y-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            <p className="text-amber-600 font-black italic uppercase tracking-[0.4em] text-[10px]">Talep Detay Dosyası</p>
                                            <h2 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{selectedTeklif.adSoyad}</h2>
                                            <div className="space-y-3 pt-4 font-black italic text-xs uppercase text-slate-400">
                                                <div className="flex items-center gap-3"><Mail size={16} className="text-amber-500" /> {selectedTeklif.email}</div>
                                                <div className="flex items-center gap-3"><Phone size={16} className="text-amber-500" /> {selectedTeklif.telefon}</div>
                                                <div className="flex items-center gap-3"><Calendar size={16} className="text-amber-500" /> {new Date(selectedTeklif.createdAt).toLocaleString('tr-TR')}</div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 flex flex-col justify-center gap-4 shadow-inner">
                                            <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase italic leading-none">Ürün / Konu Bilgisi</span>
                                            <span className="text-2xl font-black italic text-slate-900 uppercase leading-none tracking-tighter">{selectedTeklif.displayProduct}</span>
                                            {selectedTeklif.selectedSize && <span className="bg-amber-500 text-black px-4 py-1.5 rounded-xl font-black text-sm italic w-fit">{selectedTeklif.selectedSize}</span>}
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative shadow-2xl">
                                        <MessageSquare size={100} className="absolute bottom-8 right-12 text-white/5" />
                                        <p className="text-amber-500/50 font-black italic uppercase tracking-[0.4em] text-[9px] mb-8 leading-none">İletilen Mesaj</p>
                                        <p className="text-2xl font-medium italic text-slate-200 leading-relaxed ">"{selectedTeklif.mesaj || "Açıklama bırakılmadı."}"</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}