"use client";
import React, { useState, useEffect } from 'react';
import {
    Plus, Trash2, Save, Loader2, ChevronRight,
    MoreVertical, Link as LinkIcon, Eye, EyeOff, Layers
} from 'lucide-react';

export default function AdminNavPage() {
    const [navItems, setNavItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/nav').then(res => res.json()).then(data => {
            setNavItems(data);
            setLoading(false);
        });
    }, []);

    // Ana Menü Ekle
    const addMainMenu = () => {
        const newId = Math.random().toString(36).substr(2, 9); // Geçici ID
        setNavItems([...navItems, { _id: newId, title: "YENİ ANA MENÜ", path: "/", parentId: null, isActive: true }]);
    };

    // Alt Menü Ekle
    const addSubMenu = (parentId: string) => {
        setNavItems([...navItems, { title: "YENİ ALT MENÜ", path: "/", parentId: parentId, isActive: true }]);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/nav', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(navItems)
            });
            alert("Navbar Başarıyla Güncellendi!");
        } finally { setSaving(false); }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600" /></div>;

    // Menüleri hiyerarşik render etmek için filtreleme
    const mainMenus = navItems.filter(item => !item.parentId);

    return (
        <div className="p-8 bg-[#F8F9FA] min-h-screen font-sans text-slate-900">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">NAVBAR <span className="text-blue-600 font-light">MİMARİSİ</span></h1>
                    <p className="text-slate-400 text-xs font-bold uppercase mt-1 italic">Sitenin tüm navigasyon hiyerarşisini buradan yönetin</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={addMainMenu} className="bg-white border-2 border-slate-200 px-6 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:bg-slate-50">
                        <Plus size={18} /> ANA MENÜ EKLE
                    </button>
                    <button onClick={handleSave} className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 shadow-xl shadow-slate-200">
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} YAYINLA
                    </button>
                </div>
            </div>

            <div className="max-w-5xl space-y-6">
                {mainMenus.map((mainItem) => (
                    <div key={mainItem._id} className="space-y-3">
                        {/* ANA MENÜ SATIRI */}
                        <div className="bg-white p-5 rounded-[2rem] border-2 border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="bg-blue-600 p-2 rounded-xl text-white"><Layers size={20} /></div>
                            <input
                                className="bg-slate-50 border-none rounded-xl px-4 py-3 font-black text-sm uppercase w-64 outline-none focus:ring-2 ring-blue-500"
                                value={mainItem.title}
                                onChange={e => { const n = [...navItems]; const i = n.findIndex(x => x._id === mainItem._id); n[i].title = e.target.value; setNavItems(n); }}
                            />
                            <div className="relative flex-grow">
                                <LinkIcon className="absolute left-3 top-3.5 text-slate-300" size={14} />
                                <input className="bg-slate-50 border-none rounded-xl px-4 py-3 pl-9 font-mono text-[10px] w-full outline-none" value={mainItem.path} onChange={e => { const n = [...navItems]; const i = n.findIndex(x => x._id === mainItem._id); n[i].path = e.target.value; setNavItems(n); }} />
                            </div>
                            <button onClick={() => addSubMenu(mainItem._id)} className="bg-slate-100 p-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all" title="Alt Menü Ekle">
                                <Plus size={18} />
                            </button>
                            <button onClick={() => setNavItems(navItems.filter(x => x._id !== mainItem._id && x.parentId !== mainItem._id))} className="p-3 text-red-500 hover:bg-red-50 rounded-xl">
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* ALT MENÜLER (Eğer Varsa) */}
                        <div className="ml-16 space-y-2 border-l-2 border-slate-100 pl-6">
                            {navItems.filter(sub => sub.parentId === mainItem._id).map((subItem, subIdx) => (
                                <div key={subIdx} className="bg-slate-50 p-3 rounded-2xl flex items-center gap-4 border border-slate-100 group">
                                    <ChevronRight size={16} className="text-slate-400" />
                                    <input
                                        className="bg-white border-none rounded-lg px-3 py-2 font-bold text-xs uppercase w-48 outline-none"
                                        value={subItem.title}
                                        onChange={e => { const n = [...navItems]; const i = n.findIndex(x => x === subItem); n[i].title = e.target.value; setNavItems(n); }}
                                    />
                                    <input
                                        className="bg-white border-none rounded-lg px-3 py-2 font-mono text-[9px] flex-grow outline-none"
                                        value={subItem.path}
                                        onChange={e => { const n = [...navItems]; const i = n.findIndex(x => x === subItem); n[i].path = e.target.value; setNavItems(n); }}
                                    />
                                    <button onClick={() => setNavItems(navItems.filter(x => x !== subItem))} className="p-2 text-slate-400 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}