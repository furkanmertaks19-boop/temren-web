"use client";
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
    Plus, Trash2, Save, Loader2, Image as ImageIcon,
    Upload, Edit3, X, Calendar, ChevronDown, CheckCircle, Mail, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import 'react-quill/dist/quill.snow.css';

// SSR Hatasını önlemek için dinamik import
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <div className="h-[400px] bg-slate-50 animate-pulse rounded-[2.5rem]" />
});

const BLOG_CATEGORIES = ["Blog", "Fuar", "Ödül", "Müşteri", "Duyuru", "Teknik"];

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'clean']
    ],
};

const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link'
];

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'posts' | 'newsletter'>('posts');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const [currentPost, setCurrentPost] = useState<any>({
        title: "", slug: "", category: "Blog", date: new Date().toLocaleDateString('tr-TR'),
        image: "", gallery: [], shortDescription: "", content: "", isActive: true
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchPosts();
        fetchSubscribers();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/blog');
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (error) { console.error("Haberler çekilemedi:", error); }
        finally { setLoading(false); }
    };

    const fetchSubscribers = async () => {
        try {
            const res = await fetch('/api/newsletter');
            const data = await res.json();
            setSubscribers(Array.isArray(data) ? data : []);
        } catch (error) { console.error("Aboneler çekilemedi:", error); }
    };

    const createSlug = (text: string) => {
        const trMap: any = {
            'ğ': 'g', 'Ğ': 'g', 'ü': 'u', 'Ü': 'u', 'ş': 's', 'Ş': 's',
            'ı': 'i', 'İ': 'i', 'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c'
        };
        let slug = text.replace(/[ğĞüÜşŞıİöÖçÇ]/g, (match) => trMap[match]);
        return slug.toLowerCase().trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    // --- CLOUDINARY UYUMLU TEKLİ DOSYA YÜKLEME ---
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", { // Sorgu parametrelerini sildik
                method: "POST",
                body: formData
            });

            const data = await res.json();
            if (data.url) {
                setCurrentPost((prev: any) => ({ ...prev, image: data.url }));
            } else {
                alert("Yükleme hatası: " + (data.error || "Bilinmeyen hata"));
            }
        } catch (error) {
            alert("Sunucuya bağlanılamadı.");
        } finally {
            setSaving(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // --- CLOUDINARY UYUMLU GALERİ YÜKLEME ---
    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setSaving(true);
        try {
            const uploadedUrls: string[] = [];
            for (const file of Array.from(files)) {
                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData
                });

                const data = await res.json();
                if (data.url) uploadedUrls.push(data.url);
            }

            setCurrentPost((prev: any) => ({
                ...prev,
                gallery: [...(prev.gallery || []), ...uploadedUrls]
            }));
        } catch (error) {
            alert("Galeri yüklenirken bir hata oluştu.");
        } finally {
            setSaving(false);
            if (galleryInputRef.current) galleryInputRef.current.value = "";
        }
    };

    const handleSave = async () => {
        if (!currentPost.title || !currentPost.image) return alert("Başlık ve Kapak Görseli zorunludur!");
        
        setSaving(true);
        try {
            const isEdit = !!currentPost._id;
            const res = await fetch('/api/blog', {
                method: isEdit ? 'PUT' : 'POST', // Düzenleme için PUT, yeni için POST
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentPost)
            });

            if (res.ok) {
                setIsEditorOpen(false);
                fetchPosts();
                alert(isEdit ? "Güncellendi!" : "Kaydedildi!");
            } else {
                const err = await res.json();
                alert("Hata: " + err.error);
            }
        } catch (error) {
            alert("İşlem sırasında bir hata oluştu.");
        } finally { setSaving(false); }
    };

    if (loading) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-amber-500" size={40} /></div>;

    return (
        <div className="p-8 bg-[#F8F9FA] min-h-screen text-slate-900">
            {/* ÜST BAR */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800">
                        HABER <span className="text-amber-500 font-light">MERKEZİ</span>
                    </h1>
                    <div className="flex gap-4 mt-6">
                        <button onClick={() => setActiveTab('posts')} className={`text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all ${activeTab === 'posts' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'bg-white text-slate-400 hover:bg-slate-100'}`}>
                            Haberler ({posts.length})
                        </button>
                        <button onClick={() => setActiveTab('newsletter')} className={`text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all ${activeTab === 'newsletter' ? 'bg-slate-900 text-white shadow-xl scale-105' : 'bg-white text-slate-400 hover:bg-slate-100'}`}>
                            Aboneler ({subscribers.length})
                        </button>
                    </div>
                </div>

                {activeTab === 'posts' && (
                    <button 
                        onClick={() => { 
                            setCurrentPost({ title: "", slug: "", category: "Blog", date: new Date().toLocaleDateString('tr-TR'), image: "", gallery: [], shortDescription: "", content: "", isActive: true }); 
                            setIsEditorOpen(true); 
                        }} 
                        className="bg-amber-500 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 shadow-xl hover:bg-black transition-all"
                    >
                        <Plus size={18} /> YENİ HABER OLUŞTUR
                    </button>
                )}
            </div>

            {/* HABER LİSTESİ */}
            {activeTab === 'posts' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post._id} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
                            <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6 bg-slate-50">
                                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-widest">{post.category}</div>
                            </div>
                            <h3 className="font-black uppercase italic text-lg leading-tight mb-4 line-clamp-2">{post.title}</h3>
                            <div className="flex justify-between items-center border-t pt-4 border-slate-50">
                                <span className="text-[10px] font-bold text-slate-400 italic uppercase">{post.date}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => { setCurrentPost(post); setIsEditorOpen(true); }} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-colors"><Edit3 size={16} /></button>
                                    <button onClick={async () => { if (confirm("Bu haberi silmek istediğinize emin misiniz?")) { await fetch('/api/blog', { method: 'DELETE', body: JSON.stringify({ id: post._id }) }); fetchPosts(); } }} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* ABONE LİSTESİ */
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b">
                            <tr>
                                <th className="p-6 text-[10px] font-black uppercase text-slate-400">E-Posta Adresi</th>
                                <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right italic">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((sub: any) => (
                                <tr key={sub._id} className="border-b hover:bg-slate-50/50 transition-all">
                                    <td className="p-6 font-bold text-sm text-slate-700">{sub.email}</td>
                                    <td className="p-6 text-right">
                                        <button onClick={() => deleteSubscriber(sub._id)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* EDİTÖR MODAL */}
            <AnimatePresence>
                {isEditorOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
                            
                            <div className="p-8 border-b flex justify-between items-center bg-slate-50">
                                <h2 className="font-black italic uppercase text-xl">HABER <span className="text-amber-500 font-light">EDİTÖRÜ</span></h2>
                                <button onClick={() => setIsEditorOpen(false)} className="text-slate-400 hover:text-red-500 p-2"><X size={24} /></button>
                            </div>

                            <div className="p-8 overflow-y-auto space-y-8 flex-grow no-scrollbar">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* KAPAK FOTOĞRAFI */}
                                    <div className="lg:col-span-1 space-y-4">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2 italic leading-none">Kapak Fotoğrafı</label>
                                        <div 
                                            onClick={() => !saving && fileInputRef.current?.click()} 
                                            className="relative aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-all overflow-hidden group shadow-inner"
                                        >
                                            {currentPost.image ? (
                                                <img src={currentPost.image} className="w-full h-full object-cover group-hover:opacity-40 transition-all" alt="Kapak" />
                                            ) : (
                                                <div className="text-center text-slate-300">
                                                    <Upload size={48} />
                                                    <span className="text-[10px] font-black mt-3 block tracking-widest uppercase italic leading-none">Dosya Seç</span>
                                                </div>
                                            )}
                                            {saving && <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10"><Loader2 className="animate-spin text-amber-500" /></div>}
                                        </div>
                                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    </div>

                                    {/* BAŞLIK VE AYARLAR */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 italic leading-none">Kategori</label>
                                                <select 
                                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 font-black text-[10px] uppercase outline-none focus:ring-2 ring-amber-500 cursor-pointer appearance-none shadow-sm" 
                                                    value={currentPost.category} 
                                                    onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}
                                                >
                                                    {BLOG_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 italic leading-none text-slate-400">Tarih</label>
                                                <input className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-[10px] outline-none shadow-sm" value={currentPost.date} onChange={e => setCurrentPost({ ...currentPost, date: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 italic leading-none text-slate-400">Haber Başlığı</label>
                                            <input 
                                                className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-sm uppercase italic tracking-tighter text-slate-800 focus:ring-2 ring-amber-500 outline-none shadow-sm" 
                                                placeholder="BAŞLIĞI YAZIN..." 
                                                value={currentPost.title} 
                                                onChange={e => setCurrentPost({ ...currentPost, title: e.target.value, slug: createSlug(e.target.value) })} 
                                            />
                                            {currentPost.slug && <span className="text-[9px] text-slate-400 ml-2 italic flex items-center gap-1 uppercase font-black"><CheckCircle size={10} className="text-emerald-500" /> URL: /blog/{currentPost.slug}</span>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 italic leading-none text-slate-400">Önizleme Metni</label>
                                            <textarea className="w-full bg-slate-50 border-none rounded-2xl p-4 font-medium text-xs resize-none italic leading-relaxed text-slate-600 outline-none focus:ring-2 ring-amber-500 shadow-sm" rows={3} placeholder="Haber kartında görünecek kısa açıklama..." value={currentPost.shortDescription} onChange={e => setCurrentPost({ ...currentPost, shortDescription: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                {/* GALERİ */}
                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-between items-center ml-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 italic">Detay Galeri Görselleri</label>
                                        <button type="button" onClick={() => !saving && galleryInputRef.current?.click()} className="bg-slate-900 text-white px-5 py-2 rounded-full font-black text-[9px] uppercase italic flex items-center gap-2 hover:bg-amber-50 shadow-xl disabled:opacity-50">
                                            <Plus size={12} /> GÖRSEL EKLE
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 bg-slate-50/50 p-6 rounded-[2.5rem] border-2 border-dashed border-slate-100 min-h-[140px]">
                                        {(currentPost.gallery || []).map((url: string, index: number) => (
                                            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group shadow-md border-2 border-white">
                                                <img src={url} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" alt="Galeri" />
                                                <button 
                                                    type="button" 
                                                    onClick={() => setCurrentPost((p: any) => ({ ...p, gallery: p.gallery.filter((_: any, i: number) => i !== index) }))} 
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <input type="file" ref={galleryInputRef} multiple className="hidden" accept="image/*" onChange={handleGalleryUpload} />
                                </div>

                                {/* ZENGİN METİN EDİTÖRÜ */}
                                <div className="space-y-2 pb-10">
                                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2 italic leading-none">Haber Detayı (Formatlanabilir)</label>
                                    <div className="quill-editor-container">
                                        <ReactQuill 
                                            theme="snow"
                                            value={currentPost.content}
                                            onChange={(val) => setCurrentPost({ ...currentPost, content: val })}
                                            modules={quillModules}
                                            formats={quillFormats}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-slate-50 border-t flex justify-end gap-4">
                                <button 
                                    onClick={handleSave} 
                                    disabled={saving} 
                                    className="bg-slate-900 text-white px-14 py-5 rounded-[1.5rem] font-black text-xs uppercase flex items-center gap-2 hover:bg-black shadow-2xl disabled:opacity-50 transition-all group"
                                >
                                    {saving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> VERİLERİ KAYDET VE YAYINLA</>}
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .quill-editor-container .ql-toolbar {
                    border-top-left-radius: 1.5rem;
                    border-top-right-radius: 1.5rem;
                    border: 1px solid #e2e8f0;
                    background: #f8fafc;
                    padding: 12px;
                }
                .quill-editor-container .ql-container {
                    border-bottom-left-radius: 1.5rem;
                    border-bottom-right-radius: 1.5rem;
                    border: 1px solid #e2e8f0;
                    min-height: 400px;
                    font-family: inherit;
                    font-size: 15px;
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}