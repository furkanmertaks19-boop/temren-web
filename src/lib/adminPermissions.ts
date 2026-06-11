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

export function hasPermission(role: AdminRole, permission: string): boolean {
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
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

export function getAdminSession(): AdminSession | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem('adminUser');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function setAdminSession(user: AdminSession) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('adminUser', JSON.stringify(user));
}

export function clearAdminSession() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
}
