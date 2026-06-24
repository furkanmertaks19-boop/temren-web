"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CampaignMediaType } from "@/models/Campaign";

type ActiveCampaign = {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    mediaUrl: string;
    mediaType: CampaignMediaType;
    buttonText: string;
    repeatAfterDays: number;
};

const DISMISS_PREFIX = "temren_campaign_dismissed_";

function isDismissed(campaignId: string, repeatAfterDays: number): boolean {
    if (typeof window === "undefined") return true;
    const raw = localStorage.getItem(`${DISMISS_PREFIX}${campaignId}`);
    if (!raw) return false;
    const dismissedAt = Number(raw);
    if (Number.isNaN(dismissedAt)) return false;
    const ms = repeatAfterDays * 24 * 60 * 60 * 1000;
    return Date.now() - dismissedAt < ms;
}

function dismissCampaign(campaignId: string) {
    localStorage.setItem(`${DISMISS_PREFIX}${campaignId}`, String(Date.now()));
}

function CampaignMedia({ campaign }: { campaign: ActiveCampaign }) {
    if (!campaign.mediaUrl) return null;

    if (campaign.mediaType === "video") {
        return (
            <video
                src={campaign.mediaUrl}
                className="w-full max-h-[40vh] sm:max-h-[320px] object-cover rounded-xl bg-black"
                autoPlay
                muted
                loop
                playsInline
            />
        );
    }

    return (
        <img
            src={campaign.mediaUrl}
            alt={campaign.title}
            className="w-full max-h-[40vh] sm:max-h-[320px] object-cover rounded-xl"
        />
    );
}

export default function CampaignPopup() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    const [campaign, setCampaign] = useState<ActiveCampaign | null>(null);
    const [visible, setVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        if (isAdminPage) return;

        let cancelled = false;

        async function loadCampaign() {
            try {
                const res = await fetch("/api/campaigns/active");
                const json = await res.json();
                if (cancelled || !json.success || !json.data) return;

                const data = json.data as ActiveCampaign;
                if (isDismissed(data.id, data.repeatAfterDays ?? 1)) return;

                setCampaign(data);
                setVisible(true);
            } catch {
                /* ignore */
            }
        }

        loadCampaign();
        return () => {
            cancelled = true;
        };
    }, [isAdminPage, pathname]);

    const handleClose = () => {
        if (campaign) dismissCampaign(campaign.id);
        setVisible(false);
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!campaign) return;

        setSubmitting(true);
        try {
            const res = await fetch(`/api/campaigns/${campaign.id}/lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (json.success) {
                setSubmitted(true);
                setShowForm(false);
            }
        } catch {
            /* ignore */
        } finally {
            setSubmitting(false);
        }
    };

    if (isAdminPage || !campaign) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ type: "spring", damping: 28, stiffness: 320 }}
                        className="relative w-full sm:max-w-lg bg-white text-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                            aria-label="Kapat"
                        >
                            <X size={18} />
                        </button>

                        {campaign.mediaUrl && (
                            <div className="w-full">
                                <CampaignMedia campaign={campaign} />
                            </div>
                        )}

                        <div className="p-5 sm:p-6 space-y-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pr-8">{campaign.title}</h2>
                                {campaign.shortDescription && (
                                    <p className="text-sm text-[#FF6B00] font-semibold mt-1">{campaign.shortDescription}</p>
                                )}
                                {campaign.description && (
                                    <p className="text-sm text-slate-600 mt-2 leading-relaxed whitespace-pre-wrap">
                                        {campaign.description}
                                    </p>
                                )}
                            </div>

                            {submitted ? (
                                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-medium text-center">
                                    Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.
                                </div>
                            ) : showForm ? (
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ad Soyad *"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Firma adı"
                                        value={form.company}
                                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                    />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Telefon *"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                    />
                                    <input
                                        type="email"
                                        required
                                        placeholder="E-posta *"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                    />
                                    <textarea
                                        rows={3}
                                        placeholder="Mesajınız"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30 resize-y"
                                    />
                                    <div className="flex gap-2 pt-1">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                                        >
                                            Geri
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl disabled:opacity-50"
                                            style={{ backgroundColor: "#FF6B00" }}
                                        >
                                            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                            Gönder
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="flex-1 px-5 py-3 text-sm font-bold text-white rounded-xl transition-opacity hover:opacity-90"
                                        style={{ backgroundColor: "#FF6B00" }}
                                    >
                                        {campaign.buttonText || "Teklif İste"}
                                    </button>
                                    <button
                                        onClick={handleClose}
                                        className="px-5 py-3 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                                    >
                                        Kapat
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
