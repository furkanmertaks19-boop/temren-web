export const TEKLIF_STATUSES = [
    'Yeni',
    'Görüşüldü',
    'Teklif Verildi',
    'Onaylandı',
    'Reddedildi',
    'Tamamlandı',
] as const;

export type TeklifStatus = (typeof TEKLIF_STATUSES)[number];

const LEGACY_READ_STATUSES = new Set(['Okundu', 'Görüşüldü', 'Teklif Verildi', 'Onaylandı', 'Reddedildi', 'Tamamlandı']);

export const TEKLIF_STATUS_STYLES: Record<TeklifStatus, string> = {
    'Yeni': 'bg-blue-50 text-blue-700 border-blue-200',
    'Görüşüldü': 'bg-purple-50 text-purple-700 border-purple-200',
    'Teklif Verildi': 'bg-orange-50 text-orange-700 border-orange-200',
    'Onaylandı': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Reddedildi': 'bg-red-50 text-red-700 border-red-200',
    'Tamamlandı': 'bg-slate-100 text-slate-600 border-slate-200',
};

export function isTeklifStatus(value: unknown): value is TeklifStatus {
    return typeof value === 'string' && (TEKLIF_STATUSES as readonly string[]).includes(value);
}

/** Eski kayıtları bozmadan panelde gösterilecek durumu normalize eder. */
export function normalizeTeklifStatus(
    raw: unknown,
    isRead = false,
    okundu = false
): TeklifStatus {
    const status = typeof raw === 'string' ? raw.trim() : '';

    if (isTeklifStatus(status)) {
        return status;
    }

    if (status === 'Okundu' || isRead || okundu) {
        return 'Görüşüldü';
    }

    if (!status || status === 'Beklemede') {
        return 'Yeni';
    }

    return 'Yeni';
}

export function isTeklifUnread(status: TeklifStatus, isRead: boolean, okundu: boolean): boolean {
    if (status !== 'Yeni') return false;
    return !isRead && !okundu;
}

/** MongoDB: okunmamış / yeni teklif sayımı için ortak filtre */
export function getUnreadTeklifMongoFilter() {
    return {
        isRead: { $ne: true },
        okundu: { $ne: true },
        status: { $nin: [...LEGACY_READ_STATUSES] },
    };
}
