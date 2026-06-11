export const PERMISSIONS = {
    dashboard: 'dashboard:view',
    teklifler: 'teklifler:manage',
    slider: 'slider:manage',
    blog: 'blog:manage',
    gorusler: 'gorusler:manage',
    nav: 'nav:manage',
    urunler: 'urunler:manage',
    users: 'users:manage',
} as const;

export type AdminRole = 'superadmin' | 'admin' | 'editor' | 'viewer';

export const ROLE_LABELS: Record<AdminRole, string> = {
    superadmin: 'Süper Yönetici',
    admin: 'Yönetici',
    editor: 'İçerik Editörü',
    viewer: 'Görüntüleyici',
};

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
    superadmin: Object.values(PERMISSIONS),
    admin: [
        PERMISSIONS.dashboard,
        PERMISSIONS.teklifler,
        PERMISSIONS.slider,
        PERMISSIONS.blog,
        PERMISSIONS.gorusler,
        PERMISSIONS.nav,
        PERMISSIONS.urunler,
    ],
    editor: [
        PERMISSIONS.dashboard,
        PERMISSIONS.slider,
        PERMISSIONS.blog,
        PERMISSIONS.gorusler,
    ],
    viewer: [
        PERMISSIONS.dashboard,
        PERMISSIONS.teklifler,
    ],
};

export function hasPermission(role: AdminRole | unknown, permission: string): boolean {
    return ROLE_PERMISSIONS[normalizeRole(role)]?.includes(permission) ?? false;
}

export function canManageUsers(role: AdminRole): boolean {
    return hasPermission(role, PERMISSIONS.users);
}

export type AdminSession = {
    id: string;
    username: string;
    displayName: string;
    email?: string;
    role: AdminRole;
};

export function normalizeRole(role: unknown): AdminRole {
    const valid: AdminRole[] = ['superadmin', 'admin', 'editor', 'viewer'];
    return valid.includes(role as AdminRole) ? (role as AdminRole) : 'superadmin';
}

export function getAdminSession(): AdminSession | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem('adminUser');
        if (!raw) {
            if (localStorage.getItem('isLoggedIn') === 'true') {
                return {
                    id: '',
                    username: 'admin',
                    displayName: 'Yönetici',
                    role: 'superadmin',
                };
            }
            return null;
        }
        const parsed = JSON.parse(raw) as Partial<AdminSession>;
        return {
            id: String(parsed.id ?? ''),
            username: parsed.username || 'admin',
            displayName: parsed.displayName || parsed.username || 'Yönetici',
            email: parsed.email,
            role: normalizeRole(parsed.role),
        };
    } catch {
        return null;
    }
}

export function getRoleLabel(role: unknown): string {
    const normalized = normalizeRole(role);
    return ROLE_LABELS[normalized];
}

export function getInitial(name?: string | null): string {
    const value = (name || 'K').trim();
    return value.charAt(0).toUpperCase();
}

export function setAdminSession(user: AdminSession) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('adminUser', JSON.stringify(user));
}

export function clearAdminSession() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
}
