import type { NormalizedTeklif } from '@/lib/teklifNormalizer';
import type { TeklifStatus } from '@/lib/teklifStatus';

export const adminQueryKeys = {
    all: ['admin'] as const,
    notifications: ['admin', 'notifications'] as const,
    stats: ['admin', 'stats'] as const,
    teklifler: ['admin', 'teklifler'] as const,
};

export type AdminNotificationsData = {
    success: boolean;
    unreadCount: number;
    latestOffers: Record<string, unknown>[];
};

export type AdminStatsData = {
    success: boolean;
    stats: {
        totalProducts: number;
        unreadQuotes: number;
        activeSlides: number;
        pendingComments: number;
        totalComments: number;
        newsletterSubscribers: number;
    };
    recentQuotes?: Record<string, unknown>[];
};

export async function fetchAdminNotifications(): Promise<AdminNotificationsData> {
    const res = await fetch('/api/admin/notifications');
    const data = await res.json();
    return {
        success: Boolean(data.success),
        unreadCount: data.unreadCount ?? 0,
        latestOffers: data.latestOffers ?? [],
    };
}

export async function fetchAdminStats(): Promise<AdminStatsData> {
    const res = await fetch('/api/admin/stats');
    const data = await res.json();
    if (!data.success) {
        throw new Error(data.error || 'İstatistikler alınamadı');
    }
    return data;
}

export async function fetchTeklifler(): Promise<NormalizedTeklif[]> {
    const res = await fetch('/api/teklifler');
    const json = await res.json();
    if (!json.success) {
        throw new Error(json.error || 'Teklifler alınamadı');
    }
    return json.data ?? [];
}

export async function updateTeklifStatus(id: string, status: TeklifStatus): Promise<void> {
    const res = await fetch(`/api/quote-request/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
        throw new Error(json.error || 'Durum güncellenemedi');
    }
}

export async function markTeklifAsViewed(teklif: NormalizedTeklif): Promise<void> {
    if (teklif.status !== 'Yeni') return;

    if (teklif.formType === 'contact') {
        const res = await fetch('/api/teklifler/oku', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: teklif._id }),
        });
        if (!res.ok) {
            const json = await res.json().catch(() => ({}));
            throw new Error(json.error || 'Okundu işaretlenemedi');
        }
        return;
    }

    await updateTeklifStatus(teklif._id, 'Görüşüldü');
}

/** Admin panel sorguları için ortak React Query ayarları */
export const adminQueryDefaults = {
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: 90_000,
} as const;
