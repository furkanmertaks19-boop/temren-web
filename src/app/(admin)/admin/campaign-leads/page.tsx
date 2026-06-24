"use client";

import React, { useState } from "react";
import {
    Mail,
    Phone,
    X,
    Calendar,
    RefreshCcw,
    Inbox,
    Building2,
    MessageSquare,
} from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminCard from "@/components/admin/AdminCard";
import CampaignLeadStatusBadge from "@/components/admin/CampaignLeadStatusBadge";
import CampaignLeadStatusSelect from "@/components/admin/CampaignLeadStatusSelect";
import {
    useCampaignLeads,
    useUpdateCampaignLeadStatus,
} from "@/hooks/admin/useAdminData";
import type { CampaignLeadStatus } from "@/lib/campaignStatus";
import { isCampaignLeadStatus } from "@/lib/campaignStatus";
import { cn } from "@/lib/utils";

type CampaignLead = {
    id: string;
    campaignId: string;
    campaignTitle: string;
    name: string;
    company: string;
    phone: string;
    email: string;
    message: string;
    status: CampaignLeadStatus;
    createdAt: string;
};

export default function CampaignLeadsPage() {
    const { data: leads = [], isLoading, isFetching, refetch } = useCampaignLeads();
    const updateStatus = useUpdateCampaignLeadStatus();
    const [selected, setSelected] = useState<CampaignLead | null>(null);
    const [filter, setFilter] = useState<"all" | "new" | "other">("all");

    const unreadCount = leads.filter((l) => l.status === "Yeni").length;

    const filtered = leads.filter((l) => {
        if (filter === "new") return l.status === "Yeni";
        if (filter === "other") return l.status !== "Yeni";
        return true;
    });

    const handleStatusChange = (id: string, status: CampaignLeadStatus) => {
        updateStatus.mutate(
            { id, status },
            {
                onSuccess: () => {
                    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
                },
            }
        );
    };

    return (
        <div>
            <AdminPageHeader
                title="Kampanya Teklifleri"
                description={`${unreadCount} yeni · ${leads.length} toplam teklif`}
                badge={
                    unreadCount > 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-semibold">
                            <span className="size-1.5 rounded-full bg-orange-500" />
                            {unreadCount} yeni
                        </span>
                    ) : undefined
                }
                actions={
                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white rounded-xl shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md transition-all disabled:opacity-50"
                    >
                        <RefreshCcw size={14} className={isFetching ? "animate-spin" : ""} />
                        Yenile
                    </button>
                }
            />

            <div className="flex items-center gap-2 mb-5">
                {(["all", "new", "other"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "px-4 py-2 text-[13px] font-semibold rounded-xl transition-all",
                            filter === f
                                ? "bg-slate-900 text-white shadow-sm"
                                : "bg-white text-slate-600 shadow-[0_1px_3px_rgba(15,23,42,0.06)] hover:bg-slate-50"
                        )}
                    >
                        {f === "all" ? "Tümü" : f === "new" ? "Yeni" : "Diğer"}
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
                    <p className="text-sm text-slate-500">Bu filtrede teklif bulunamadı.</p>
                </AdminCard>
            ) : (
                <AdminCard className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[960px] text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/80">
                                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Kampanya</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Ad Soyad</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Firma</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Telefon</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">E-posta</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Tarih</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Durum</th>
                                    <th className="text-right px-5 py-3 font-semibold text-slate-600">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map((lead) => (
                                    <tr
                                        key={lead.id}
                                        className={cn(
                                            "hover:bg-slate-50/60 transition-colors",
                                            lead.status === "Yeni" && "bg-orange-50/30"
                                        )}
                                    >
                                        <td className="px-5 py-4 font-medium text-slate-900">{lead.campaignTitle}</td>
                                        <td className="px-4 py-4 text-slate-800">{lead.name}</td>
                                        <td className="px-4 py-4 text-slate-600">{lead.company || "—"}</td>
                                        <td className="px-4 py-4 text-slate-600">{lead.phone}</td>
                                        <td className="px-4 py-4 text-slate-600">{lead.email}</td>
                                        <td className="px-4 py-4 text-slate-500">
                                            {new Date(lead.createdAt).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-4 py-4">
                                            {isCampaignLeadStatus(lead.status) ? (
                                                <CampaignLeadStatusBadge status={lead.status} />
                                            ) : (
                                                <span className="text-slate-500">{lead.status}</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button
                                                onClick={() => setSelected(lead)}
                                                className="text-[13px] font-semibold text-[#FF6B00] hover:underline"
                                            >
                                                Detay
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </AdminCard>
            )}

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">{selected.name}</h2>
                                <p className="text-sm text-slate-500">{selected.campaignTitle}</p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between gap-3">
                                {isCampaignLeadStatus(selected.status) ? (
                                    <CampaignLeadStatusBadge status={selected.status} size="md" />
                                ) : null}
                                <CampaignLeadStatusSelect
                                    value={isCampaignLeadStatus(selected.status) ? selected.status : "Yeni"}
                                    onChange={(status) => handleStatusChange(selected.id, status)}
                                    disabled={updateStatus.isPending}
                                />
                            </div>

                            <div className="space-y-3 text-sm">
                                {selected.company && (
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Building2 size={16} className="text-slate-400 shrink-0" />
                                        {selected.company}
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Phone size={16} className="text-slate-400 shrink-0" />
                                    <a href={`tel:${selected.phone}`} className="hover:text-[#FF6B00]">
                                        {selected.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Mail size={16} className="text-slate-400 shrink-0" />
                                    <a href={`mailto:${selected.email}`} className="hover:text-[#FF6B00]">
                                        {selected.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Calendar size={16} className="text-slate-400 shrink-0" />
                                    {new Date(selected.createdAt).toLocaleString("tr-TR")}
                                </div>
                            </div>

                            {selected.message && (
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm mb-2">
                                        <MessageSquare size={15} />
                                        Mesaj
                                    </div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{selected.message}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
