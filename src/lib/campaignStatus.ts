export const CAMPAIGN_LEAD_STATUSES = [
    "Yeni",
    "Görüşüldü",
    "Teklif Verildi",
    "Kapandı",
] as const;

export type CampaignLeadStatus = (typeof CAMPAIGN_LEAD_STATUSES)[number];

export const CAMPAIGN_LEAD_STATUS_THEME: Record<
    CampaignLeadStatus,
    { bg: string; text: string; dot: string }
> = {
    Yeni: { bg: "bg-blue-100", text: "text-blue-900", dot: "bg-blue-500" },
    Görüşüldü: { bg: "bg-violet-100", text: "text-violet-900", dot: "bg-violet-500" },
    "Teklif Verildi": { bg: "bg-orange-100", text: "text-orange-900", dot: "bg-orange-500" },
    Kapandı: { bg: "bg-slate-200", text: "text-slate-800", dot: "bg-slate-500" },
};

export function isCampaignLeadStatus(value: unknown): value is CampaignLeadStatus {
    return typeof value === "string" && (CAMPAIGN_LEAD_STATUSES as readonly string[]).includes(value);
}

export function getUnreadCampaignLeadMongoFilter() {
    return { status: "Yeni" };
}

export function detectMediaType(filename: string, mimeType?: string): "image" | "gif" | "video" {
    const lower = filename.toLowerCase();
    if (lower.endsWith(".gif") || mimeType === "image/gif") return "gif";
    if (
        [".mp4", ".webm", ".mov"].some((ext) => lower.endsWith(ext)) ||
        mimeType?.startsWith("video/")
    ) {
        return "video";
    }
    return "image";
}

export const CAMPAIGN_ALLOWED_MIME_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/webm",
]);

export const CAMPAIGN_MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const CAMPAIGN_MAX_VIDEO_SIZE = 50 * 1024 * 1024;
