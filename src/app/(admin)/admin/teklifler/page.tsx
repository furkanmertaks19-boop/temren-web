"use client";
import React, { useState } from 'react';
import {
    Mail, Phone, X, Calendar, CheckCircle2,
    RefreshCcw, MessageSquare, Inbox, Globe, FileText
} from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminCard from '@/components/admin/AdminCard';
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
import { cn } from '@/lib/utils';

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
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold">
                        <span className="size-1.5 rounded-full bg-blue-500" />
                        {unreadCount} yeni
                    </span>
                ) : undefined}
                actions={
                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white rounded-xl shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md transition-all disabled:opacity-50"
                    >
                        <RefreshCcw size={14} className={isFetching ? 'animate-spin' : ''} />
                        Yenile
                    </button>
                }
            />

            <div className="flex items-center gap-2 mb-5">
                {(['all', 'unread', 'read'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            'px-4 py-2 text-[13px] font-semibold rounded-xl transition-all',
                            filter === f
                                ? 'bg-slate-900 text-white shadow-sm'
                                : 'bg-white text-slate-600 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:bg-slate-50'
                        )}
                    >
                        {f === 'all' ? 'Tümü' : f === 'unread' ? 'Okunmamış' : 'Okunmuş'}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-[#FF6B00] rounded-full animate-spin" />
                    <p className="text-sm text-slate-500">Yükleniyor...</p>
                </div>
            ) : filtered.length === 0 ? (
                <AdminCard padding="lg" className="text-center">
                    <Inbox size={40} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500">Bu filtrede talep bulunamadı.</p>
                </AdminCard>
            ) : (
                <AdminCard className="overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {filtered.map((teklif) => {
                            const unread = isTeklifUnread(teklif.status, teklif.isRead, teklif.okundu);
                            return (
                                <div
                                    key={teklif._id}
                                    className={cn(
                                        'flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors',
                                        unread && 'bg-blue-50/40'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleOpenTeklif(teklif)}
                                        className="flex items-center gap-4 flex-1 min-w-0 text-left"
                                    >
                                        <div className={cn(
                                            'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm',
                                            unread ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                                        )}>
                                            {unread ? <MessageSquare size={18} /> : <CheckCircle2 size={18} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-[15px] font-semibold text-slate-900">{teklif.adSoyad}</span>
                                                <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                                                    {teklif.sourceLabel}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1.5 text-[13px] text-slate-500 flex-wrap">
                                                <span className="flex items-center gap-1"><Mail size={13} /> {teklif.email}</span>
                                                <span className="flex items-center gap-1"><Phone size={13} /> {teklif.telefon}</span>
                                            </div>
                                        </div>
                                    </button>
                                    <div className="flex items-center gap-3 shrink-0 sm:ml-0 ml-14">
                                        <TeklifStatusBadge status={teklif.status} className="sm:hidden" />
                                        <TeklifStatusSelect
                                            value={teklif.status}
                                            onChange={(status) => handleStatusChange(teklif._id, status)}
                                            disabled={updateStatus.isPending}
                                        />
                                        <span className="text-[12px] text-slate-400 hidden md:block w-20 text-right">
                                            {new Date(teklif.createdAt).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </AdminCard>
            )}

            {selectedTeklif && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
                    onClick={() => setSelectedTeklif(null)}
                >
                    <div
                        className="bg-white w-full max-w-2xl rounded-2xl shadow-[0_24px_64px_rgba(15,23,42,0.2)] overflow-hidden max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between px-6 py-5 bg-slate-50/80">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Talep Detayı</p>
                                <h2 className="text-xl font-bold text-slate-900">{selectedTeklif.adSoyad}</h2>
                                <div className="mt-3">
                                    <TeklifStatusBadge status={selectedTeklif.status} size="md" />
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedTeklif(null)}
                                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-xl transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-6">
                            <div>
                                <p className="text-[13px] font-semibold text-slate-700 mb-2">Durumu Güncelle</p>
                                <TeklifStatusSelect
                                    value={selectedTeklif.status}
                                    onChange={(status) => handleStatusChange(selectedTeklif._id, status)}
                                    disabled={updateStatus.isPending}
                                    size="default"
                                    className="w-full sm:w-[240px]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">İletişim</p>
                                    <div className="space-y-2 text-[14px] text-slate-700">
                                        <div className="flex items-center gap-2"><Mail size={15} className="text-slate-400" /> {selectedTeklif.email}</div>
                                        <div className="flex items-center gap-2"><Phone size={15} className="text-slate-400" /> {selectedTeklif.telefon}</div>
                                        <div className="flex items-center gap-2"><Calendar size={15} className="text-slate-400" /> {new Date(selectedTeklif.createdAt).toLocaleString('tr-TR')}</div>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-4 space-y-3">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Kaynak</p>
                                        <p className="text-[14px] font-medium text-slate-900 flex items-center gap-2">
                                            <Globe size={15} className="text-[#FF6B00]" />
                                            {selectedTeklif.sourcePage}
                                        </p>
                                        <p className="text-[13px] text-slate-500 mt-1">{selectedTeklif.sourceLabel}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Form</p>
                                        <p className="text-[14px] font-medium text-slate-800 flex items-center gap-2">
                                            <FileText size={15} className="text-slate-400" />
                                            {selectedTeklif.formType === 'quote' ? 'Ürün Teklif Formu' : 'İletişim Formu'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl bg-[#0B1736] p-5">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Mesaj</p>
                                <p className="text-[15px] leading-relaxed text-slate-100">
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
