"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
    Plus, Pencil, Trash2, Shield, UserCheck, UserX, Key, X, Loader2, Save, Eye, EyeOff
} from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import {
    ROLE_LABELS, type AdminRole, getAdminSession, setAdminSession, canManageUsers
} from '@/lib/adminPermissions';

type AdminUser = {
    _id: string;
    username: string;
    displayName: string;
    email: string;
    role: AdminRole;
    isActive: boolean;
    lastLogin?: string;
    createdAt?: string;
};

const ROLES: AdminRole[] = ['superadmin', 'admin', 'editor', 'viewer'];

const emptyForm = {
    username: '',
    password: '',
    displayName: '',
    email: '',
    role: 'admin' as AdminRole,
    isActive: true,
};

export default function KullanicilarPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [modal, setModal] = useState<'create' | 'edit' | 'password' | null>(null);
    const [selected, setSelected] = useState<AdminUser | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentSession, setCurrentSession] = useState(getAdminSession());

    const fetchUsers = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (data.success) setUsers(data.data);
        } catch {
            setMessage({ type: 'error', text: 'Kullanıcılar yüklenemedi.' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const openCreate = () => {
        setForm(emptyForm);
        setSelected(null);
        setModal('create');
        setMessage(null);
    };

    const openEdit = (user: AdminUser) => {
        setSelected(user);
        setForm({
            username: user.username,
            password: '',
            displayName: user.displayName,
            email: user.email,
            role: user.role,
            isActive: user.isActive,
        });
        setModal('edit');
        setMessage(null);
    };

    const openPassword = (user: AdminUser) => {
        setSelected(user);
        setNewPassword('');
        setModal('password');
        setMessage(null);
    };

    const closeModal = () => {
        setModal(null);
        setSelected(null);
        setNewPassword('');
        setShowPassword(false);
    };

    const handleCreate = async () => {
        if (!form.username || !form.password || !form.displayName) {
            setMessage({ type: 'error', text: 'Kullanıcı adı, şifre ve görünen ad zorunludur.' });
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage({ type: 'success', text: 'Kullanıcı oluşturuldu.' });
                closeModal();
                fetchUsers();
            } else {
                setMessage({ type: 'error', text: data.error || 'Oluşturulamadı.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Bağlantı hatası.' });
        } finally {
            setSaving(false);
        }
    };

    const handleUpdate = async () => {
        if (!selected) return;
        setSaving(true);
        try {
            const payload: Record<string, unknown> = {
                displayName: form.displayName,
                email: form.email,
                role: form.role,
                isActive: form.isActive,
                username: form.username,
            };
            const res = await fetch(`/api/admin/users/${selected._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                if (currentSession?.id === selected._id) {
                    setAdminSession({
                        ...currentSession,
                        username: data.data.username,
                        displayName: data.data.displayName,
                        email: data.data.email,
                        role: data.data.role,
                    });
                    setCurrentSession(getAdminSession());
                }
                setMessage({ type: 'success', text: 'Kullanıcı güncellendi.' });
                closeModal();
                fetchUsers();
            } else {
                setMessage({ type: 'error', text: data.error || 'Güncellenemedi.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Bağlantı hatası.' });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async () => {
        if (!selected || newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Şifre en az 6 karakter olmalıdır.' });
            return;
        }
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/users/${selected._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage({ type: 'success', text: 'Şifre başarıyla güncellendi.' });
                closeModal();
            } else {
                setMessage({ type: 'error', text: data.error || 'Şifre güncellenemedi.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'Bağlantı hatası.' });
        } finally {
            setSaving(false);
        }
    };

    const handleToggleActive = async (user: AdminUser) => {
        if (currentSession?.id === user._id && user.isActive) {
            setMessage({ type: 'error', text: 'Kendi hesabınızı devre dışı bırakamazsınız.' });
            return;
        }
        try {
            const res = await fetch(`/api/admin/users/${user._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !user.isActive }),
            });
            if (res.ok) {
                fetchUsers();
                setMessage({ type: 'success', text: user.isActive ? 'Hesap devre dışı bırakıldı.' : 'Hesap aktifleştirildi.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'İşlem başarısız.' });
        }
    };

    const handleDelete = async (user: AdminUser) => {
        if (currentSession?.id === user._id) {
            setMessage({ type: 'error', text: 'Kendi hesabınızı silemezsiniz.' });
            return;
        }
        if (!confirm(`"${user.displayName}" kullanıcısını silmek istediğinize emin misiniz?`)) return;
        try {
            const res = await fetch(`/api/admin/users/${user._id}`, { method: 'DELETE' });
            const data = await res.json();
            if (res.ok) {
                fetchUsers();
                setMessage({ type: 'success', text: 'Kullanıcı silindi.' });
            } else {
                setMessage({ type: 'error', text: data.error || 'Silinemedi.' });
            }
        } catch {
            setMessage({ type: 'error', text: 'İşlem başarısız.' });
        }
    };

    const sessionCanManage = currentSession ? canManageUsers(currentSession.role) : true;

    return (
        <div>
            <AdminPageHeader
                title="Kullanıcı Yönetimi"
                description="Hesaplar, yetkiler ve şifre işlemleri"
                actions={
                    sessionCanManage ? (
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <Plus size={16} /> Yeni Kullanıcı
                        </button>
                    ) : undefined
                }
            />

            {message && (
                <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
                    message.type === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Current user card */}
            {currentSession && (
                <div className="bg-slate-900 text-white rounded-xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#FF4D00] flex items-center justify-center text-lg font-semibold">
                            {currentSession.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-semibold">{currentSession.displayName}</p>
                            <p className="text-sm text-slate-400">@{currentSession.username} · {ROLE_LABELS[currentSession.role]}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            const me = users.find(u => u._id === currentSession.id);
                            if (me) openPassword(me);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <Key size={14} /> Şifremi Değiştir
                    </button>
                </div>
            )}

            {/* Role legend */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {ROLES.map((role) => (
                    <div key={role} className="bg-white border border-slate-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Shield size={14} className="text-[#FF4D00]" />
                            <span className="text-xs font-semibold text-slate-900">{ROLE_LABELS[role]}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                            {role === 'superadmin' && 'Tüm yetkiler + kullanıcı yönetimi'}
                            {role === 'admin' && 'İçerik ve teklif yönetimi'}
                            {role === 'editor' && 'Slider, blog ve görüşler'}
                            {role === 'viewer' && 'Sadece görüntüleme'}
                        </p>
                    </div>
                ))}
            </div>

            {/* Users table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="text-left px-5 py-3 font-medium text-slate-600">Kullanıcı</th>
                                <th className="text-left px-5 py-3 font-medium text-slate-600 hidden md:table-cell">E-posta</th>
                                <th className="text-left px-5 py-3 font-medium text-slate-600">Yetki</th>
                                <th className="text-left px-5 py-3 font-medium text-slate-600">Durum</th>
                                <th className="text-left px-5 py-3 font-medium text-slate-600 hidden lg:table-cell">Son Giriş</th>
                                <th className="text-right px-5 py-3 font-medium text-slate-600">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                                        <Loader2 className="animate-spin inline-block mr-2" size={16} />
                                        Yükleniyor...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                                        Henüz kullanıcı yok.
                                    </td>
                                </tr>
                            ) : users.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50/50">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                                                {user.displayName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{user.displayName}</p>
                                                <p className="text-xs text-slate-400">@{user.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-slate-600 hidden md:table-cell">{user.email || '—'}</td>
                                    <td className="px-5 py-4">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                            <Shield size={10} />
                                            {ROLE_LABELS[user.role] || user.role}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                            user.isActive
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : 'bg-red-50 text-red-600'
                                        }`}>
                                            {user.isActive ? <UserCheck size={10} /> : <UserX size={10} />}
                                            {user.isActive ? 'Aktif' : 'Kapalı'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-xs text-slate-400 hidden lg:table-cell">
                                        {user.lastLogin
                                            ? new Date(user.lastLogin).toLocaleString('tr-TR')
                                            : 'Hiç giriş yok'}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => openEdit(user)}
                                                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="Düzenle"
                                            >
                                                <Pencil size={15} />
                                            </button>
                                            <button
                                                onClick={() => openPassword(user)}
                                                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="Şifre Değiştir"
                                            >
                                                <Key size={15} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleActive(user)}
                                                className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                title={user.isActive ? 'Devre Dışı Bırak' : 'Aktifleştir'}
                                            >
                                                {user.isActive ? <UserX size={15} /> : <UserCheck size={15} />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Sil"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={closeModal}>
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h2 className="text-base font-semibold text-slate-900">
                                {modal === 'create' && 'Yeni Kullanıcı'}
                                {modal === 'edit' && 'Kullanıcı Düzenle'}
                                {modal === 'password' && 'Şifre Değiştir'}
                            </h2>
                            <button onClick={closeModal} className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {modal === 'password' ? (
                                <>
                                    <p className="text-sm text-slate-500">
                                        <strong>{selected?.displayName}</strong> için yeni şifre belirleyin.
                                    </p>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="Yeni şifre (min. 6 karakter)"
                                            className="w-full px-3 py-2.5 pr-10 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1 block">Görünen Ad</label>
                                        <input
                                            value={form.displayName}
                                            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#FF4D00]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1 block">Kullanıcı Adı</label>
                                        <input
                                            value={form.username}
                                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#FF4D00]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1 block">E-posta</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#FF4D00]"
                                        />
                                    </div>
                                    {modal === 'create' && (
                                        <div>
                                            <label className="text-xs font-medium text-slate-600 mb-1 block">Şifre</label>
                                            <input
                                                type="password"
                                                value={form.password}
                                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#FF4D00]"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-xs font-medium text-slate-600 mb-1 block">Yetki Rolü</label>
                                        <select
                                            value={form.role}
                                            onChange={(e) => setForm({ ...form, role: e.target.value as AdminRole })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#FF4D00]"
                                        >
                                            {ROLES.map((r) => (
                                                <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {modal === 'edit' && (
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={form.isActive}
                                                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                                className="rounded border-slate-300"
                                            />
                                            <span className="text-sm text-slate-700">Hesap aktif</span>
                                        </label>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-100">
                            <button onClick={closeModal} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">
                                İptal
                            </button>
                            <button
                                onClick={modal === 'create' ? handleCreate : modal === 'edit' ? handleUpdate : handlePasswordChange}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
