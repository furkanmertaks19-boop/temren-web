"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
    Mail, Phone, ChevronRight, X, Calendar, CheckCircle2, 
    Zap, RefreshCcw, Box, MessageSquare, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TekliflerPage() {
    const [teklifler, setTeklifler] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTeklif, setSelectedTeklif] = useState<any>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const verileriGetir = useCallback(async (isAuto = false) => {
        if (!isAuto) setIsRefreshing(true);
        try {
            const [resContact, resQuote] = await Promise.all([
                fetch("/api/teklifler").then(r => r.json()),
                fetch("/api/quote-request").then(r => r.json())
            ]);

            const contactData = (resContact.success ? resContact.data : []).map((item: any) => ({
                ...item,
                source: 'contact',
                adSoyad: item.adSoyad,
                telefon: item.telefon,
                email: item.email,
                mesaj: item.mesaj,
                displayProduct: item.secim || item.konu || "Genel İletişim",
                displayStatus: item.okundu === true || item.isRead === true
            }));

            const quoteData = (Array.isArray(resQuote) ? resQuote : []).map((item: any) => ({
                ...item,
                source: 'quote',
                adSoyad: item.fullName || item.adSoyad,
                telefon: item.phone || item.telefon,
                email: item.email,
                mesaj: item.message || item.mesaj,
                displayProduct: item.productName || "Ürün Teklifi",
                displayStatus: item.status === "Okundu" || item.isRead === true || item.okundu === true
            }));

            // --- MÜKERRER KAYITLARI TEMİZLEME (UNIQUE FILTER) ---
            const combined = [...contactData, ...quoteData];
            
            const uniqueData = combined.reduce((acc: any[], current: any) => {
                // Aynı e-posta ve aynı mesaj içeriğine sahip kayıt var mı kontrol et
                const isDuplicate = acc.find(item => 
                    item.email === current.email && 
                    (item.mesaj === current.mesaj || item.displayProduct === current.displayProduct)
                );
                
                if (!isDuplicate) {
                    return acc.concat([current]);
                }
                return acc;
            }, []);

            // Tarihe göre sırala (En yeni en üstte)
            uniqueData.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );

            setTeklifler(uniqueData);
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

    const teklifOku = async (teklif: any) => {
        setSelectedTeklif(teklif);
        if (teklif.displayStatus) return;

        try {
            const apiPath = teklif.source === 'contact' ? "/api/teklifler/oku" : "/api/admin/teklifler/oku";
            
            const response = await fetch(apiPath, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: teklif._id }),
            });

            if (response.ok) {
                setTeklifler(prev => prev.map(t =>
                    t._id === teklif._id ? { ...t, displayStatus: true, isRead: true, okundu: true } : t
                ));
            }
        } catch (err) {
            console.error("Okundu işaretleme hatası:", err);
        }
    };

    return (
        <div className="p-6 md:p-10 bg-[#F8F9FA] min-h-screen font-sans text-slate-900">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        MÜŞTERİ <span className="text-amber-500">TALEPLERİ</span>
                    </h1>
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-4 flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isRefreshing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                        {teklifler.filter(t => !t.displayStatus).length} Yeni Mesaj • Sistem Canlı
                    </p>
                </div>
                <button onClick={() => verileriGetir()} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                    <RefreshCcw size={14} className={isRefreshing ? "animate-spin" : ""} /> Listeyi Tazele
                </button>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-4">
                    <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Veriler Senkronize Ediliyor...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {teklifler.map((teklif) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            key={teklif._id}
                            onClick={() => teklifOku(teklif)}
                            className={`group bg-white border ${teklif.displayStatus ? 'border-slate-100 opacity-60' : 'border-amber-200 shadow-xl shadow-amber-500/5'} p-6 rounded-[2.5rem] hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center justify-between cursor-pointer relative overflow-hidden`}
                        >
                            {!teklif.displayStatus && (
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                            )}
                            <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-all ${teklif.displayStatus ? 'bg-slate-100 text-slate-400' : 'bg-amber-500 text-white'}`}>
                                    {teklif.displayStatus ? <CheckCircle2 size={28} /> : <Zap size={28} />}
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        <h3 className={`text-base font-black uppercase ${teklif.displayStatus ? 'text-slate-500' : 'text-slate-900'}`}>{teklif.adSoyad}</h3>
                                        <span className="bg-slate-900 text-amber-500 text-[9px] font-black px-2 py-0.5 rounded-md uppercase italic tracking-widest">
                                            {teklif.displayProduct}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><Mail size={12} className="text-amber-500" /> {teklif.email}</span>
                                        <span className="flex items-center gap-1.5"><Phone size={12} className="text-amber-500" /> {teklif.telefon}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center gap-6">
                                <div className="text-right hidden sm:block text-[11px] font-bold text-slate-600">
                                    {new Date(teklif.createdAt).toLocaleDateString('tr-TR')}
                                </div>
                                <ChevronRight size={20} className="text-slate-200 group-hover:text-amber-500 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {selectedTeklif && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="p-8 md:p-12 overflow-y-auto no-scrollbar">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-slate-900 text-amber-500 rounded-2xl"><Box size={32} /></div>
                                    <button onClick={() => setSelectedTeklif(null)} className="p-3 bg-slate-50 hover:bg-red-50 rounded-2xl transition-all"><X size={24} /></button>
                                </div>
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-amber-600 font-black uppercase tracking-widest text-[10px] mb-2">Müşteri Dosyası</p>
                                            <h2 className="text-4xl font-black uppercase text-slate-900">{selectedTeklif.adSoyad}</h2>
                                            <div className="mt-4 space-y-2 text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                                                <div className="flex items-center gap-2"><Mail size={14} className="text-amber-500" /> {selectedTeklif.email}</div>
                                                <div className="flex items-center gap-2"><Phone size={14} className="text-amber-500" /> {selectedTeklif.telefon}</div>
                                                <div className="flex items-center gap-2"><Calendar size={14} className="text-amber-500" /> {new Date(selectedTeklif.createdAt).toLocaleString('tr-TR')}</div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2 italic">İlgilenilen Ürün</p>
                                            <p className="text-xl font-black text-slate-900 uppercase italic">{selectedTeklif.displayProduct}</p>
                                            {selectedTeklif.selectedSize && <span className="inline-block mt-3 bg-amber-500 text-black px-3 py-1 rounded-lg font-black text-xs italic uppercase leading-none">{selectedTeklif.selectedSize}</span>}
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative shadow-xl">
                                        <MessageSquare size={80} className="absolute bottom-6 right-8 text-white/5" />
                                        <p className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-4 italic">Müşteri Mesajı</p>
                                        <p className="text-xl md:text-2xl font-medium text-slate-200 leading-relaxed italic italic leading-none lowercase first-letter:uppercase tracking-tight">
                                            "{selectedTeklif.mesaj || "Mesaj içeriği bulunmuyor."}"
                                        </p>
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