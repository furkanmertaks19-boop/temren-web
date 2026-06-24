"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    Plus,
    Pencil,
    Trash2,
    Loader2,
    Upload,
    Image as ImageIcon,
    Film,
    ToggleLeft,
    ToggleRight,
    X,
    Megaphone,
    RefreshCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminCard from "@/components/admin/AdminCard";
import { cn } from "@/lib/utils";
import {
    CAMPAIGN_ALLOWED_MIME_TYPES,
    CAMPAIGN_MAX_IMAGE_SIZE,
    CAMPAIGN_MAX_VIDEO_SIZE,
    detectMediaType,
} from "@/lib/campaignStatus";
import type { CampaignMediaType } from "@/models/Campaign";

type Campaign = {
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
    startDate: string;
    endDate: string;
    isActive: boolean;
    showPopup: boolean;
    repeatAfterDays: number;
    leadCount: number;
};

const EMPTY_FORM: Omit<Campaign, "id" | "leadCount"> = {
    title: "",
    shortDescription: "",
    discountLabel: "",
    description: "",
    advantages: "",
    priceInfo: "",
    mediaUrl: "",
    mediaType: "image",
    buttonText: "Teklif Al",
    startDate: "",
    endDate: "",
    isActive: true,
    showPopup: true,
    repeatAfterDays: 1,
};

const REPEAT_OPTIONS = [
    { value: 1, label: "1 gün" },
    { value: 3, label: "3 gün" },
    { value: 7, label: "7 gün" },
];

function toDateInputValue(date: string | Date) {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
}

function mediaTypeLabel(type: CampaignMediaType) {
    if (type === "gif") return "GIF";
    if (type === "video") return "Video";
    return "Resim";
}

export default function CampaignsPage() {
    return (
        <Suspense
            fallback={
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-[#FF6B00] rounded-full animate-spin" />
                    <p className="text-sm text-slate-500">Yükleniyor...</p>
                </div>
            }
        >
            <CampaignsPageContent />
        </Suspense>
    );
}

function CampaignsPageContent() {
    const searchParams = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const fetchCampaigns = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/campaigns");
            const json = await res.json();
            if (json.success) {
                setCampaigns(json.data ?? []);
            }
        } catch {
            toast.error("Kampanyalar yüklenemedi");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    useEffect(() => {
        if (searchParams.get("create") === "true") {
            openCreateModal();
        }
    }, [searchParams]);

    const openCreateModal = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
        setModalOpen(true);
    };

    const openEditModal = (campaign: Campaign) => {
        setEditingId(campaign.id);
        setForm({
            title: campaign.title,
            shortDescription: campaign.shortDescription,
            discountLabel: campaign.discountLabel || "",
            description: campaign.description,
            advantages: campaign.advantages || "",
            priceInfo: campaign.priceInfo || "",
            mediaUrl: campaign.mediaUrl,
            mediaType: campaign.mediaType,
            buttonText: campaign.buttonText,
            startDate: toDateInputValue(campaign.startDate),
            endDate: toDateInputValue(campaign.endDate),
            isActive: campaign.isActive,
            showPopup: campaign.showPopup,
            repeatAfterDays: campaign.repeatAfterDays,
        });
        setModalOpen(true);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!CAMPAIGN_ALLOWED_MIME_TYPES.has(file.type)) {
            toast.error("Sadece JPG, PNG, GIF, MP4 ve WEBM dosyaları yüklenebilir");
            return;
        }

        const isVideo = file.type.startsWith("video/");
        const maxSize = isVideo ? CAMPAIGN_MAX_VIDEO_SIZE : CAMPAIGN_MAX_IMAGE_SIZE;
        if (file.size > maxSize) {
            toast.error(isVideo ? "Video boyutu 50MB'dan büyük olamaz" : "Dosya boyutu 10MB'dan büyük olamaz");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("context", "campaign");

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.url) {
                setForm((prev) => ({
                    ...prev,
                    mediaUrl: data.url,
                    mediaType: detectMediaType(file.name, file.type),
                }));
                toast.success("Medya yüklendi");
            } else {
                toast.error(data.error || "Yükleme başarısız");
            }
        } catch {
            toast.error("Yükleme sırasında hata oluştu");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleSave = async () => {
        if (!form.title.trim()) {
            toast.error("Kampanya başlığı gerekli");
            return;
        }
        if (!form.startDate || !form.endDate) {
            toast.error("Başlangıç ve bitiş tarihi gerekli");
            return;
        }

        setSaving(true);
        try {
            const url = editingId ? `/api/admin/campaigns/${editingId}` : "/api/admin/campaigns";
            const method = editingId ? "PATCH" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (json.success) {
                toast.success(editingId ? "Kampanya güncellendi" : "Kampanya oluşturuldu");
                setModalOpen(false);
                fetchCampaigns();
            } else {
                toast.error(json.error || "Kayıt başarısız");
            }
        } catch {
            toast.error("Kayıt sırasında hata oluştu");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu kampanyayı silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/admin/campaigns/${id}`, { method: "DELETE" });
            const json = await res.json();
            if (json.success) {
                toast.success("Kampanya silindi");
                fetchCampaigns();
            } else {
                toast.error(json.error || "Silme başarısız");
            }
        } catch {
            toast.error("Silme sırasında hata oluştu");
        }
    };

    const handleToggle = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/campaigns/${id}/toggle`, { method: "PATCH" });
            const json = await res.json();
            if (json.success) {
                setCampaigns((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, isActive: json.data.isActive } : c))
                );
                toast.success(json.data.isActive ? "Kampanya aktif edildi" : "Kampanya pasif edildi");
            }
        } catch {
            toast.error("Durum değiştirilemedi");
        }
    };

    return (
        <div>
            <AdminPageHeader
                title="Kampanyalar"
                description={`${campaigns.length} kampanya · Popup ve teklif yönetimi`}
                actions={
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => fetchCampaigns()}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white rounded-xl shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md transition-all"
                        >
                            <RefreshCcw size={14} />
                            Yenile
                        </button>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl shadow-sm transition-all hover:opacity-90"
                            style={{ backgroundColor: "#FF6B00" }}
                        >
                            <Plus size={16} />
                            Kampanya Oluştur
                        </button>
                    </div>
                }
            />

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-[#FF6B00] rounded-full animate-spin" />
                    <p className="text-sm text-slate-500">Yükleniyor...</p>
                </div>
            ) : campaigns.length === 0 ? (
                <AdminCard padding="lg" className="text-center">
                    <Megaphone size={40} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-sm text-slate-500 mb-4">Henüz kampanya oluşturulmamış.</p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl"
                        style={{ backgroundColor: "#FF6B00" }}
                    >
                        <Plus size={16} />
                        İlk Kampanyayı Oluştur
                    </button>
                </AdminCard>
            ) : (
                <AdminCard className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/80">
                                    <th className="text-left px-5 py-3 font-semibold text-slate-600">Başlık</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Durum</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Medya</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Başlangıç</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Bitiş</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Teklif</th>
                                    <th className="text-right px-5 py-3 font-semibold text-slate-600">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {campaigns.map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-5 py-4 font-medium text-slate-900">{campaign.title}</td>
                                        <td className="px-4 py-4">
                                            <span
                                                className={cn(
                                                    "inline-flex px-2.5 py-1 rounded-full text-xs font-semibold",
                                                    campaign.isActive
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : "bg-slate-100 text-slate-600"
                                                )}
                                            >
                                                {campaign.isActive ? "Aktif" : "Pasif"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-slate-600">{mediaTypeLabel(campaign.mediaType)}</td>
                                        <td className="px-4 py-4 text-slate-600">
                                            {new Date(campaign.startDate).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-4 py-4 text-slate-600">
                                            {new Date(campaign.endDate).toLocaleDateString("tr-TR")}
                                        </td>
                                        <td className="px-4 py-4 font-semibold text-slate-800">{campaign.leadCount}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => openEditModal(campaign)}
                                                    className="p-2 rounded-lg text-slate-500 hover:text-[#FF6B00] hover:bg-orange-50 transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleToggle(campaign.id)}
                                                    className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                    title={campaign.isActive ? "Pasif yap" : "Aktif yap"}
                                                >
                                                    {campaign.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(campaign.id)}
                                                    className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </AdminCard>
            )}

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
                            <h2 className="text-lg font-bold text-slate-900">
                                {editingId ? "Kampanya Düzenle" : "Yeni Kampanya"}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kampanya Başlığı</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kısa Açıklama</label>
                                <input
                                    type="text"
                                    value={form.shortDescription}
                                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">İndirim Etiketi</label>
                                <input
                                    type="text"
                                    placeholder="Örn: %20 İndirim"
                                    value={form.discountLabel}
                                    onChange={(e) => setForm({ ...form, discountLabel: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kampanya Detayları</label>
                                <textarea
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30 resize-y"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Avantajlar</label>
                                <textarea
                                    rows={3}
                                    placeholder="Her satıra bir avantaj yazın"
                                    value={form.advantages}
                                    onChange={(e) => setForm({ ...form, advantages: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30 resize-y"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Fiyat Bilgisi</label>
                                <input
                                    type="text"
                                    placeholder="Örn: 125.000 TL'den başlayan fiyatlarla"
                                    value={form.priceInfo}
                                    onChange={(e) => setForm({ ...form, priceInfo: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Medya (JPG, PNG, GIF, MP4, WEBM)</label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.gif,.mp4,.webm,image/jpeg,image/png,image/gif,video/mp4,video/webm"
                                    onChange={handleUpload}
                                    className="hidden"
                                />
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50"
                                    >
                                        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                                        {uploading ? "Yükleniyor..." : "Medya Yükle"}
                                    </button>
                                    {form.mediaUrl && (
                                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                                            {form.mediaType === "video" ? <Film size={14} /> : <ImageIcon size={14} />}
                                            Yüklendi ({mediaTypeLabel(form.mediaType)})
                                        </span>
                                    )}
                                </div>
                                {form.mediaUrl && form.mediaType !== "video" && (
                                    <img src={form.mediaUrl} alt="Önizleme" className="mt-3 max-h-40 rounded-xl object-cover" />
                                )}
                                {form.mediaUrl && form.mediaType === "video" && (
                                    <video src={form.mediaUrl} className="mt-3 max-h-40 rounded-xl" muted controls />
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Buton Yazısı</label>
                                <input
                                    type="text"
                                    value={form.buttonText}
                                    onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Başlangıç Tarihi</label>
                                    <input
                                        type="date"
                                        value={form.startDate}
                                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bitiş Tarihi</label>
                                    <input
                                        type="date"
                                        value={form.endDate}
                                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isActive}
                                        onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                        className="rounded border-slate-300 text-[#FF6B00] focus:ring-[#FF6B00]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Aktif</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.showPopup}
                                        onChange={(e) => setForm({ ...form, showPopup: e.target.checked })}
                                        className="rounded border-slate-300 text-[#FF6B00] focus:ring-[#FF6B00]"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Popup olarak göster</span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Kapatıldıktan sonra tekrar gösterme süresi
                                </label>
                                <select
                                    value={form.repeatAfterDays}
                                    onChange={(e) => setForm({ ...form, repeatAfterDays: Number(e.target.value) })}
                                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30"
                                >
                                    {REPEAT_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-xl disabled:opacity-50"
                                style={{ backgroundColor: "#FF6B00" }}
                            >
                                {saving && <Loader2 size={16} className="animate-spin" />}
                                {editingId ? "Güncelle" : "Oluştur"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
