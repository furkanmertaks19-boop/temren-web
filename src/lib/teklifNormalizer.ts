import { isTeklifUnread, normalizeTeklifStatus, type TeklifStatus } from '@/lib/teklifStatus';

export type NormalizedTeklif = {
    _id: string;
    adSoyad: string;
    telefon: string;
    email: string;
    mesaj: string;
    displayProduct: string;
    displayStatus: boolean;
    status: TeklifStatus;
    formType: 'contact' | 'quote';
    sourcePage: string;
    sourceLabel: string;
    selectedSize?: string;
    createdAt: string;
    isRead: boolean;
    okundu: boolean;
};

export function normalizeTeklif(raw: Record<string, unknown>): NormalizedTeklif {
    const isQuote = Boolean(raw.fullName) || raw.formType === 'quote';
    const adSoyad = String(raw.fullName || raw.adSoyad || 'İsimsiz');
    const telefon = String(raw.phone || raw.telefon || '—');
    const email = String(raw.email || '');
    const mesaj = String(raw.message || raw.mesaj || '');
    const displayProduct = String(
        raw.sourceLabel || raw.productName || raw.secim || raw.konu || 'Genel İletişim'
    );
    const sourceLabel = String(
        raw.sourceLabel || raw.productName || raw.secim || raw.konu || 'Genel İletişim'
    );
    const sourcePage = String(raw.sourcePage || (isQuote ? '/urunler' : '/iletisim'));
    const formType: 'contact' | 'quote' = isQuote ? 'quote' : 'contact';
    const isRead = raw.isRead === true;
    const okundu = raw.okundu === true;
    const status = normalizeTeklifStatus(raw.status, isRead, okundu);
    const displayStatus = !isTeklifUnread(status, isRead, okundu);

    return {
        _id: String(raw._id),
        adSoyad,
        telefon,
        email,
        mesaj,
        displayProduct,
        displayStatus,
        status,
        formType,
        sourcePage,
        sourceLabel,
        selectedSize: raw.selectedSize ? String(raw.selectedSize) : undefined,
        createdAt: raw.createdAt
            ? new Date(raw.createdAt as string | Date).toISOString()
            : new Date().toISOString(),
        isRead,
        okundu,
    };
}
