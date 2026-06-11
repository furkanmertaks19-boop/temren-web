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

export const TEKLIF_STATUS_THEME: Record<
    TeklifStatus,
    { bg: string; text: string; dot: string; ring: string }
> = {
    'Yeni': {
        bg: 'bg-blue-100',
        text: 'text-blue-900',
        dot: 'bg-blue-500',
        ring: 'ring-blue-200',
    },
    'Görüşüldü': {
        bg: 'bg-violet-100',
        text: 'text-violet-900',
        dot: 'bg-violet-500',
        ring: 'ring-violet-200',
    },
    'Teklif Verildi': {
        bg: 'bg-orange-100',
        text: 'text-orange-900',
        dot: 'bg-orange-500',
        ring: 'ring-orange-200',
    },
    'Onaylandı': {
        bg: 'bg-emerald-100',
        text: 'text-emerald-900',
        dot: 'bg-emerald-500',
        ring: 'ring-emerald-200',
    },
    'Reddedildi': {
        bg: 'bg-red-100',
        text: 'text-red-900',
        dot: 'bg-red-500',
        ring: 'ring-red-200',
    },
    'Tamamlandı': {
        bg: 'bg-slate-200',
        text: 'text-slate-800',
        dot: 'bg-slate-500',
        ring: 'ring-slate-300',
    },
};

/** @deprecated Use TEKLIF_STATUS_THEME */
export const TEKLIF_STATUS_STYLES: Record<TeklifStatus, string> = Object.fromEntries(
    Object.entries(TEKLIF_STATUS_THEME).map(([key, theme]) => [
        key,
        `${theme.bg} ${theme.text}`,
    ])
) as Record<TeklifStatus, string>;

export function isTeklifStatus(value: unknown): value is TeklifStatus {
    return typeof value === 'string' && (TEKLIF_STATUSES as readonly string[]).includes(value);
}

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

export function getUnreadTeklifMongoFilter() {
    return {
        isRead: { $ne: true },
        okundu: { $ne: true },
        status: { $nin: [...LEGACY_READ_STATUSES] },
    };
}
