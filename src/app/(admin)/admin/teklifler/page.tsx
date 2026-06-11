"use client";
import React, { useState } from 'react';
import {
    Mail, Phone, X, Calendar, CheckCircle2,
    RefreshCcw, MessageSquare, Inbox, Filter, Globe, FileText
} from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import TeklifStatusBadge from '@/components/admin/TeklifStatusBadge';
import TeklifStatusSelect from '@/components/admin/TeklifStatusSelect';
import {
    useMarkTeklifViewed,
    useTeklifler,
    useUpdateTeklifStatus,
} from '@/hooks/admin/useAdminData';
import type { NormalizedTeklif } from '@/lib/teklifNormalizer';
import type { TeklifStatus } from '@/lib/teklifStatus';
import { isTeklifUnread } from '@/lib/teklifStatus';

export default function TekliflerPage() {
    const { data: teklifler = [], isLoading, isFetching, refetch } = useTeklifler();
    const updateStatus = useUpdateTeklifStatus();
    const markViewed = useMarkTeklifViewed();

    const [selectedTeklif, setSelectedTeklif] = useState<NormalizedTeklif | null>(null);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

    const unreadCount = teklifler.filter((t) =>
        isTeklifUnread(t.status, t.isRead, t.okundu)
    ).length;

    const filtered = teklifler.filter((t) => {
        const unread = isTeklifUnread(t.status, t.isRead, t.okundu);
        if (filter === 'unread') return unread;
        if (filter === 'read') return !unread;
        return true;
    });

    const handleOpenTeklif = (teklif: NormalizedTeklif) => {
        setSelectedTeklif(teklif);
        if (isTeklifUnread(teklif.status, teklif.isRead, teklif.okundu)) {
            markViewed.mutate(teklif, {
                onSuccess: () => {
                    setSelectedTeklif((prev) =>
                        prev && prev._id === teklif._id
                            ? { ...prev, status: 'Görüşüldü', displayStatus: true, isRead: true, okundu: true }
                            : prev
                    );
                },
            });
        }
    };

    const handleStatusChange = (id: string, status: TeklifStatus) => {
        updateStatus.mutate(
            { id, status },
            {
                onSuccess: () => {
                    setSelectedTeklif((prev) =>
                        prev && prev._id === id
                            ? {
                                ...prev,
                                status,
                                displayStatus: status !== 'Yeni',
                                isRead: status !== 'Yeni',
                                okundu: status !== 'Yeni',
                            }
                            : prev
                    );
                },
            }
        );
    };

    return (
        <div>
            <AdminPageHeader
                title="Teklif Talepleri"
                description={`${unreadCount} okunmamış · ${teklifler.length} toplam talep`}
                badge={unreadCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                        {unreadCount} yeni
                    </span>
                ) : undefined}
                actions={
                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
                    >
                        <RefreshCcw size={14} className={isFetching ? 'animate-spin' : ''} />
                        Yenile
                    </button>
                }
            />

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

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-[#FF6B00] rounded-full animate-spin" />
                    <p className="text-sm text-slate-400">Yükleniyor...</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                    <Inbox size={40} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500">Bu filtrede talep bulunamadı.</p>
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                    {filtered.map((teklif) => {
                        const unread = isTeklifUnread(teklif.status, teklif.isRead, teklif.okundu);
                        return (
                            <div
                                key={teklif._id}
                                className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${
                                    unread ? 'bg-blue-50/30' : ''
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleOpenTeklif(teklif)}
                                    className="flex items-center gap-4 flex-1 min-w-0 text-left"
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                        unread ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                        {unread ? <MessageSquare size={18} /> : <CheckCircle2 size={18} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-sm font-medium text-slate-900">{teklif.adSoyad}</span>
                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                                {teklif.sourceLabel}
                                            </span>
                                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                                                teklif.formType === 'quote'
                                                    ? 'bg-violet-50 text-violet-700'
                                                    : 'bg-blue-50 text-blue-700'
                                            }`}>
                                                {teklif.formType === 'quote' ? 'Teklif Formu' : 'İletişim Formu'}
                                            </span>
                                            <TeklifStatusBadge status={teklif.status} className="hidden sm:inline-flex" />
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 flex-wrap">
                                            <span className="flex items-center gap-1"><Mail size={11} /> {teklif.email}</span>
                                            <span className="flex items-center gap-1"><Phone size={11} /> {teklif.telefon}</span>
                                            <span className="flex items-center gap-1 text-slate-400">
                                                <Globe size={11} /> {teklif.sourcePage}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                                <div className="flex items-center gap-3 shrink-0">
                                    <TeklifStatusSelect
                                        value={teklif.status}
                                        onChange={(status) => handleStatusChange(teklif._id, status)}
                                        disabled={updateStatus.isPending}
                                    />
                                    <span className="text-xs text-slate-400 hidden sm:block w-20 text-right">
                                        {new Date(teklif.createdAt).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

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
                            <div className="flex items-center gap-3 flex-wrap">
                                <h2 className="text-base font-semibold text-slate-900">Talep Detayı</h2>
                                <TeklifStatusBadge status={selectedTeklif.status} />
                            </div>
                            <button
                                onClick={() => setSelectedTeklif(null)}
                                className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                                <div className="flex-1">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
                                        Durum
                                    </p>
                                    <TeklifStatusSelect
                                        value={selectedTeklif.status}
                                        onChange={(status) => handleStatusChange(selectedTeklif._id, status)}
                                        disabled={updateStatus.isPending}
                                        size="default"
                                        className="w-full sm:w-[220px]"
                                    />
                                </div>
                            </div>
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
                                <div className="space-y-3">
                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Kaynak Sayfa</p>
                                        <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                                            <Globe size={14} className="text-[#FF6B00]" />
                                            {selectedTeklif.sourcePage}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">{selectedTeklif.sourceLabel}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Form Tipi</p>
                                        <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                                            <FileText size={14} className="text-slate-400" />
                                            {selectedTeklif.formType === 'quote' ? 'Ürün Teklif Formu' : 'İletişim Formu'}
                                        </p>
                                        {selectedTeklif.selectedSize && (
                                            <span className="inline-block mt-2 text-xs font-medium px-2 py-1 rounded bg-[#FF6B00] text-white">
                                                {selectedTeklif.selectedSize}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-900 rounded-lg p-5 text-white">
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Mesaj</p>
                                <p className="text-sm leading-relaxed text-slate-200">
                                    {selectedTeklif.mesaj || 'Mesaj içeriği bulunmuyor.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
