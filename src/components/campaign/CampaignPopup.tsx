"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Loader2, Send, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CampaignMediaType } from "@/models/Campaign";

type ActiveCampaign = {
    id: string;
    title: string;
    shortDescription: string;
    discountLabel: string;
    description: string;
    advantages: string;
    priceInfo: string;
    mediaUrl: string;
    mediaType: CampaignMediaType;
    buttonText: string;
    repeatAfterDays: number;
};

const DISMISS_PREFIX = "temren_campaign_dismissed_";
const ACCENT = "#FF6B00";

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

function parseAdvantages(raw: string): string[] {
    return raw
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
}

function CampaignMedia({ campaign, className }: { campaign: ActiveCampaign; className?: string }) {
    if (!campaign.mediaUrl) return null;

    const mediaClass = `max-w-full max-h-[80vh] w-auto h-auto object-contain ${className ?? ""}`;

    if (campaign.mediaType === "video") {
        return (
            <video
                src={campaign.mediaUrl}
                className={mediaClass}
                autoPlay
                muted
                loop
                playsInline
            />
        );
    }

    return <img src={campaign.mediaUrl} alt={campaign.title} className={mediaClass} />;
}

function CloseButton({ onClick, className }: { onClick: () => void; className?: string }) {
    return (
        <button
            onClick={onClick}
            className={`group flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] text-slate-500 hover:text-slate-900 hover:scale-105 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-200 ${className ?? ""}`}
            aria-label="Kapat"
        >
            <X size={18} strokeWidth={2} className="transition-transform group-hover:rotate-90 duration-200" />
        </button>
    );
}

function CampaignContent({ campaign }: { campaign: ActiveCampaign }) {
    const advantages = parseAdvantages(campaign.advantages);

    return (
        <div className="space-y-5">
            {campaign.discountLabel && (
                <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase"
                    style={{ backgroundColor: `${ACCENT}18`, color: ACCENT }}
                >
                    {campaign.discountLabel}
                </span>
            )}

            <div>
                <h2 className="text-2xl sm:text-[1.75rem] font-bold text-slate-900 tracking-tight leading-tight">
                    {campaign.title}
                </h2>
                {campaign.shortDescription && (
                    <p className="mt-2 text-[15px] text-slate-500 leading-relaxed">{campaign.shortDescription}</p>
                )}
            </div>

            {campaign.description && (
                <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Kampanya Detayları</h3>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{campaign.description}</p>
                </div>
            )}

            {advantages.length > 0 && (
                <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Avantajlar</h3>
                    <ul className="space-y-2.5">
                        {advantages.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                                <span
                                    className="mt-0.5 flex shrink-0 items-center justify-center w-5 h-5 rounded-full"
                                    style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                                >
                                    <Check size={12} strokeWidth={3} />
                                </span>
                                <span className="leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {campaign.priceInfo && (
                <div className="p-4 rounded-2xl bg-slate-50 ring-1 ring-slate-100">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Fiyat</h3>
                    <p className="text-lg font-bold text-slate-900 tracking-tight">{campaign.priceInfo}</p>
                </div>
            )}
        </div>
    );
}

type LeadFormModalProps = {
    campaign: ActiveCampaign;
    open: boolean;
    onClose: () => void;
};

function LeadFormModal({ campaign, open, onClose }: LeadFormModalProps) {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" });

    useEffect(() => {
        if (!open) {
            setSubmitted(false);
            setForm({ name: "", company: "", phone: "", email: "", message: "" });
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/api/campaigns/${campaign.id}/lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (json.success) setSubmitted(true);
        } catch {
            /* ignore */
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ type: "spring", damping: 26, stiffness: 340 }}
                        className="relative w-full max-w-md bg-white rounded-[24px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.45)] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 pt-6 pb-2">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Teklif Al</h3>
                                <p className="text-sm text-slate-500 mt-0.5">{campaign.title}</p>
                            </div>
                            <CloseButton onClick={onClose} />
                        </div>

                        <div className="px-6 pb-6 pt-2">
                            {submitted ? (
                                <div className="py-8 text-center">
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                                        style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                                    >
                                        <Check size={28} strokeWidth={2.5} />
                                    </div>
                                    <p className="text-base font-semibold text-slate-900">Talebiniz alındı</p>
                                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                        En kısa sürede sizinle iletişime geçeceğiz.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="mt-6 w-full px-5 py-3 text-sm font-semibold text-white rounded-2xl transition-opacity hover:opacity-90"
                                        style={{ backgroundColor: ACCENT }}
                                    >
                                        Tamam
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ad Soyad *"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/25 focus:bg-white transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Firma adı"
                                        value={form.company}
                                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/25 focus:bg-white transition-colors"
                                    />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Telefon *"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/25 focus:bg-white transition-colors"
                                    />
                                    <input
                                        type="email"
                                        required
                                        placeholder="E-posta *"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/25 focus:bg-white transition-colors"
                                    />
                                    <textarea
                                        rows={3}
                                        placeholder="Mesajınız (isteğe bağlı)"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/25 focus:bg-white transition-colors resize-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white rounded-2xl disabled:opacity-50 transition-all hover:opacity-90 active:scale-[0.98]"
                                        style={{ backgroundColor: ACCENT }}
                                    >
                                        {submitting ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Gönder
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function CampaignPopup() {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith("/admin");

    const [campaign, setCampaign] = useState<ActiveCampaign | null>(null);
    const [visible, setVisible] = useState(false);
    const [formOpen, setFormOpen] = useState(false);

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
        setFormOpen(false);
    };

    if (isAdminPage || !campaign) return null;

    return (
        <>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/55 backdrop-blur-xl"
                        onClick={handleClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 12 }}
                            transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.8 }}
                            className="relative w-full max-w-4xl bg-white text-slate-900 rounded-[24px] shadow-[0_32px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh] flex flex-col lg:flex-row lg:max-h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CloseButton onClick={handleClose} className="absolute top-4 right-4 z-20" />

                            {/* Medya — mobil: üstte tam genişlik, masaüstü: sol %45 */}
                            {campaign.mediaUrl && (
                                <div className="relative w-full lg:w-[45%] shrink-0 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#0a0a0a] p-4 sm:p-6 min-h-[220px] max-h-[50vh] lg:max-h-[80vh]">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.08)_0%,transparent_70%)] pointer-events-none" />
                                    <CampaignMedia campaign={campaign} />
                                </div>
                            )}

                            {/* İçerik — mobil: altta, masaüstü: sağ %55 */}
                            <div
                                className={`flex flex-col flex-1 min-h-0 ${campaign.mediaUrl ? "lg:w-[55%]" : "w-full"}`}
                            >
                                <div className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 pt-8 pb-4 sm:pt-10">
                                    <CampaignContent campaign={campaign} />
                                </div>

                                <div className="shrink-0 px-6 sm:px-8 py-5 border-t border-slate-100 bg-white/80 backdrop-blur-sm">
                                    <div className="flex flex-col sm:flex-row gap-2.5">
                                        <button
                                            onClick={() => setFormOpen(true)}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white rounded-2xl transition-all hover:opacity-90 active:scale-[0.98] shadow-[0_4px_20px_rgba(255,107,0,0.35)]"
                                            style={{ backgroundColor: ACCENT }}
                                        >
                                            {campaign.buttonText || "Teklif Al"}
                                            <ArrowRight size={16} strokeWidth={2.5} />
                                        </button>
                                        <button
                                            onClick={handleClose}
                                            className="px-6 py-3.5 text-sm font-semibold text-slate-500 rounded-2xl hover:bg-slate-100 hover:text-slate-700 transition-colors"
                                        >
                                            Şimdi Değil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <LeadFormModal campaign={campaign} open={formOpen} onClose={() => setFormOpen(false)} />
        </>
    );
}
