"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
    Mail, Phone, X, Calendar, CheckCircle2,
    RefreshCcw, MessageSquare, Inbox, Filter
} from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

type Teklif = {
    _id: string;
    source: 'contact' | 'quote';
    adSoyad: string;
    telefon: string;
    email: string;
    mesaj: string;
    displayProduct: string;
    displayStatus: boolean;
    createdAt: string;
    selectedSize?: string;
};

export default function TekliflerPage() {
    const [teklifler, setTeklifler] = useState<Teklif[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTeklif, setSelectedTeklif] = useState<Teklif | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

    const verileriGetir = useCallback(async (isAuto = false) => {
        if (!isAuto) setIsRefreshing(true);
        try {
            const [resContact, resQuote] = await Promise.all([
                fetch("/api/teklifler").then(r => r.json()),
                fetch("/api/quote-request").then(r => r.json())
            ]);

            const contactData = (resContact.success ? resContact.data : []).map((item: Record<string, unknown>) => ({
                ...item,
                source: 'contact' as const,
                adSoyad: item.adSoyad as string,
                telefon: item.telefon as string,
                email: item.email as string,
                mesaj: item.mesaj as string,
                displayProduct: (item.secim || item.konu || "Genel İletişim") as string,
                displayStatus: item.okundu === true || item.isRead === true
            }));

            const quoteData = (Array.isArray(resQuote) ? resQuote : []).map((item: Record<string, unknown>) => ({
                ...item,
                source: 'quote' as const,
                adSoyad: (item.fullName || item.adSoyad) as string,
                telefon: (item.phone || item.telefon) as string,
                email: item.email as string,
                mesaj: (item.message || item.mesaj) as string,
                displayProduct: (item.productName || "Ürün Teklifi") as string,
                displayStatus: item.status === "Okundu" || item.isRead === true || item.okundu === true
            }));

            const combined = [...contactData, ...quoteData] as Teklif[];

            const uniqueData = combined.reduce<Teklif[]>((acc, current) => {
                const isDuplicate = acc.find(item =>
                    item.email === current.email &&
                    (item.mesaj === current.mesaj || item.displayProduct === current.displayProduct)
                );
                if (!isDuplicate) return [...acc, current];
                return acc;
            }, []);

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

    const teklifOku = async (teklif: Teklif) => {
        setSelectedTeklif(teklif);
        if (teklif.displayStatus) return;

        try {
            const response = teklif.source === 'contact'
                ? await fetch("/api/teklifler/oku", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: teklif._id }),
                })
                : await fetch(`/api/quote-request/${teklif._id}`, { method: "PATCH" });

            if (response.ok) {
                setTeklifler(prev => prev.map(t =>
                    t._id === teklif._id ? { ...t, displayStatus: true } : t
                ));
                setSelectedTeklif(prev => prev ? { ...prev, displayStatus: true } : null);
            }
        } catch (err) {
            console.error("Okundu işaretleme hatası:", err);
        }
    };

    const unreadCount = teklifler.filter(t => !t.displayStatus).length;
    const filtered = teklifler.filter(t => {
        if (filter === 'unread') return !t.displayStatus;
        if (filter === 'read') return t.displayStatus;
        return true;
    });

    return (
        <div>
            <AdminPageHeader
                title="Teklif Talepleri"
                description={`${unreadCount} okunmamış · ${teklifler.length} toplam talep`}
                badge={unreadCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                        {unreadCount} yeni
                    </span>
                ) : undefined}
                actions={
                    <button
                        onClick={() => verileriGetir()}
                        disabled={isRefreshing}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                    >
                        <RefreshCcw size={14} className={isRefreshing ? "animate-spin" : ""} />
                        Yenile
                    </button>
                }
            />

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6">
                <Filter size={14} className="text-slate-400" />
                {(['all', 'unread', 'read'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            filter === f
                                ? 'bg-slate-900 text-white'
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {f === 'all' ? 'Tümü' : f === 'unread' ? 'Okunmamış' : 'Okunmuş'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-[#FF4D00] rounded-full animate-spin" />
                    <p className="text-sm text-slate-400">Yükleniyor...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                    <Inbox size={40} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500">Bu filtrede talep bulunamadı.</p>
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                    {filtered.map((teklif) => (
                        <button
                            key={teklif._id}
                            onClick={() => teklifOku(teklif)}
                            className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors ${
                                !teklif.displayStatus ? 'bg-orange-50/30' : ''
                            }`}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                teklif.displayStatus ? 'bg-slate-100 text-slate-400' : 'bg-[#FF4D00] text-white'
                            }`}>
                                {teklif.displayStatus ? <CheckCircle2 size={18} /> : <MessageSquare size={18} />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-slate-900">{teklif.adSoyad}</span>
                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                        {teklif.displayProduct}
                                    </span>
                                    {!teklif.displayStatus && (
                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-orange-100 text-[#FF4D00]">Yeni</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                                    <span className="flex items-center gap-1"><Mail size={11} /> {teklif.email}</span>
                                    <span className="flex items-center gap-1"><Phone size={11} /> {teklif.telefon}</span>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400 shrink-0 hidden sm:block">
                                {new Date(teklif.createdAt).toLocaleDateString('tr-TR')}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Detail modal */}
            {selectedTeklif && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    onClick={() => setSelectedTeklif(null)}
                >
                    <div
                        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h2 className="text-base font-semibold text-slate-900">Talep Detayı</h2>
                            <button
                                onClick={() => setSelectedTeklif(null)}
                                className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Müşteri</p>
                                    <p className="text-lg font-semibold text-slate-900">{selectedTeklif.adSoyad}</p>
                                    <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                                        <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400" /> {selectedTeklif.email}</div>
                                        <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400" /> {selectedTeklif.telefon}</div>
                                        <div className="flex items-center gap-2"><Calendar size={14} className="text-slate-400" /> {new Date(selectedTeklif.createdAt).toLocaleString('tr-TR')}</div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Ürün / Konu</p>
                                    <p className="text-base font-medium text-slate-900">{selectedTeklif.displayProduct}</p>
                                    {selectedTeklif.selectedSize && (
                                        <span className="inline-block mt-2 text-xs font-medium px-2 py-1 rounded bg-[#FF4D00] text-white">
                                            {selectedTeklif.selectedSize}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-lg p-5 text-white">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Mesaj</p>
                                <p className="text-sm leading-relaxed text-slate-200">
                                    {selectedTeklif.mesaj || "Mesaj içeriği bulunmuyor."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
