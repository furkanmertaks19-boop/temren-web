"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    Plus, Trash2, Save, Loader2, Video,
    Image as ImageIcon, Link as LinkIcon, Eye, EyeOff, Info, Upload, ChevronDown, GripVertical
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const STATIC_PAGES = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Kurumsal / Hakkımızda", path: "/kurumsal/hakkimizda" },
    { name: "Kurumsal / Müşteri Görüşleri", path: "/kurumsal/musteri-gorusleri" },
    { name: "Medya / Blog", path: "/medya/blog" },
    { name: "Medya / Foto Galeri", path: "/medya/foto" },
    { name: "Medya / Video Galeri", path: "/medya/video" },
    { name: "İletişim", path: "/iletisim" },
    { name: "Ürün: PLT-7", path: "/urunler/palet-sistemleri/plt-7" },
    { name: "Ürün: PLT-8", path: "/urunler/palet-sistemleri/plt-8" },
    { name: "Ürün: PLT-10", path: "/urunler/palet-sistemleri/plt-10" },
    { name: "Ürün: PLT-12", path: "/urunler/palet-sistemleri/plt-12" },
    { name: "Ürün: PLT-15", path: "/urunler/palet-sistemleri/plt-15" },
    { name: "Ürün: PLT-16", path: "/urunler/palet-sistemleri/plt-16" },
    { name: "Ürün: PLT-17", path: "/urunler/palet-sistemleri/plt-17" },
    { name: "Ürün: PLT-18", path: "/urunler/palet-sistemleri/plt-18" },
    { name: "Ürün: Tika", path: "/urunler/tika" },
    { name: "Ürün: Mini Tika", path: "/urunler/mini-tika" },
];

export default function AdminSliderPage() {
    const [slides, setSlides] = useState<any[]>([]);
    const [availablePages, setAvailablePages] = useState(STATIC_PAGES);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sliderRes = await fetch('/api/slider');
                const sliderData = await sliderRes.json();
                const formattedSlides = (Array.isArray(sliderData) ? sliderData : []).map((item: any, idx: number) => ({
                    ...item,
                    dragId: item._id?.toString() || item.id?.toString() || `slide-${idx}`
                }));
                setSlides(formattedSlides);

                const blogRes = await fetch('/api/blog');
                const blogs = await blogRes.json();
                const blogPages = (Array.isArray(blogs) ? blogs : []).map((blog: any) => ({
                    name: `Haber: ${blog.title}`,
                    path: `/medya/blog/${blog.slug}`
                }));
                setAvailablePages([...STATIC_PAGES, ...blogPages]);
            } catch (error) {
                console.error("Veri yükleme hatası:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const isVideo = (url: string) => {
        if (!url) return false;
        return ['.mp4', '.webm', '.ogg', '.mov'].some(ext => url.toLowerCase().includes(ext));
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (activeUploadIndex === null || !e.target.files?.[0]) return;
        const file = e.target.files[0];
        if (file.size > 30 * 1024 * 1024) {
            setSaveMessage({ type: 'error', text: 'Dosya boyutu 30MB\'dan büyük olamaz.' });
            return;
        }
        setUploadingIndex(activeUploadIndex);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.url) {
                const newSlides = [...slides];
                newSlides[activeUploadIndex].image = data.url;
                setSlides(newSlides);
            } else {
                setSaveMessage({ type: 'error', text: 'Yükleme başarısız oldu.' });
            }
        } catch {
            setSaveMessage({ type: 'error', text: 'Yükleme sırasında hata oluştu.' });
        } finally {
            setUploadingIndex(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const addNewSlide = () => {
        setSlides([...slides, {
            dragId: `new-${Date.now()}`,
            title: "Yeni Başlık",
            subtitle: "Alt Başlık",
            description: "",
            image: "",
            buttonLink: "/",
            isActive: true,
            order: slides.length
        }]);
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newSlides = Array.from(slides);
        const [reorderedItem] = newSlides.splice(result.source.index, 1);
        newSlides.splice(result.destination.index, 0, reorderedItem);
        setSlides(newSlides.map((slide, idx) => ({ ...slide, order: idx })));
    };

    const handleSave = async () => {
        const invalid = slides.filter(s => !s.image?.trim() || !s.title?.trim());
        if (invalid.length > 0) {
            setSaveMessage({ type: 'error', text: 'Tüm slaytların görsel ve başlık alanları dolu olmalıdır.' });
            return;
        }

        setSaving(true);
        setSaveMessage(null);
        try {
            const res = await fetch('/api/slider', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(slides)
            });
            const data = await res.json();
            if (res.ok) {
                const updated = (Array.isArray(data) ? data : []).map((item: any, idx: number) => ({
                    ...item,
                    dragId: item._id?.toString() || `slide-${idx}`
                }));
                setSlides(updated);
                setSaveMessage({ type: 'success', text: 'Slider başarıyla yayınlandı.' });
            } else {
                setSaveMessage({ type: 'error', text: data.error || 'Kaydetme başarısız oldu.' });
            }
        } catch {
            setSaveMessage({ type: 'error', text: 'Kaydedilirken bir hata oluştu.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 className="animate-spin text-slate-400" size={32} />
            </div>
        );
    }

    return (
        <div>
            <AdminPageHeader
                title="Slider Ayarları"
                description={`${slides.length} slayt · ${slides.filter(s => s.isActive).length} aktif`}
                actions={
                    <div className="flex items-center gap-2">
                        <button
                            onClick={addNewSlide}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <Plus size={16} /> Yeni Slayt
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            Yayınla
                        </button>
                    </div>
                }
            />

            {saveMessage && (
                <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
                    saveMessage.type === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {saveMessage.text}
                </div>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="slides">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4 mb-8">
                            {slides.length === 0 ? (
                                <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
                                    <p className="text-sm text-slate-500 mb-4">Henüz slayt eklenmemiş.</p>
                                    <button
                                        onClick={addNewSlide}
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF4D00] rounded-lg"
                                    >
                                        <Plus size={16} /> İlk Slaytı Ekle
                                    </button>
                                </div>
                            ) : slides.map((slide, index) => (
                                <Draggable key={slide.dragId} draggableId={slide.dragId} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={`bg-white border rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-start transition-shadow ${
                                                snapshot.isDragging ? 'shadow-lg border-[#FF4D00]/30' : 'border-slate-200'
                                            }`}
                                        >
                                            <div {...provided.dragHandleProps} className="text-slate-300 hover:text-slate-600 cursor-grab active:cursor-grabbing p-1">
                                                <GripVertical size={20} />
                                            </div>

                                            <div
                                                onClick={() => { setActiveUploadIndex(index); fileInputRef.current?.click(); }}
                                                className="w-full lg:w-40 aspect-video bg-slate-100 rounded-lg overflow-hidden relative border-2 border-dashed border-slate-200 hover:border-[#FF4D00] transition-colors cursor-pointer group shrink-0"
                                            >
                                                {uploadingIndex === index ? (
                                                    <div className="flex items-center justify-center h-full">
                                                        <Loader2 className="animate-spin text-[#FF4D00]" size={24} />
                                                    </div>
                                                ) : slide.image ? (
                                                    isVideo(slide.image) ? (
                                                        <video src={slide.image} className="w-full h-full object-cover" muted />
                                                    ) : (
                                                        <img src={slide.image} className="w-full h-full object-cover" alt="" />
                                                    )
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                                        <Upload size={20} />
                                                        <span className="text-[10px] mt-1">Medya Yükle</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                                                <div className="space-y-2">
                                                    <input
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20"
                                                        placeholder="Alt başlık"
                                                        value={slide.subtitle || ""}
                                                        onChange={e => { const n = [...slides]; n[index].subtitle = e.target.value; setSlides(n); }}
                                                    />
                                                    <input
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20"
                                                        placeholder="Başlık *"
                                                        value={slide.title}
                                                        onChange={e => { const n = [...slides]; n[index].title = e.target.value; setSlides(n); }}
                                                    />
                                                    <textarea
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 resize-none"
                                                        placeholder="Açıklama"
                                                        rows={2}
                                                        value={slide.description || ""}
                                                        onChange={e => { const n = [...slides]; n[index].description = e.target.value; setSlides(n); }}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="relative">
                                                        <LinkIcon className="absolute left-3 top-2.5 text-slate-400" size={14} />
                                                        <select
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-xs outline-none focus:border-[#FF4D00] appearance-none cursor-pointer"
                                                            value={slide.buttonLink || "/"}
                                                            onChange={e => { const n = [...slides]; n[index].buttonLink = e.target.value; setSlides(n); }}
                                                        >
                                                            <option value="">Sayfa seçin</option>
                                                            {availablePages.map((page) => (
                                                                <option key={page.path} value={page.path}>{page.name}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown size={14} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                                                    </div>
                                                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                                                        {isVideo(slide.image) ? <Video size={14} className="text-slate-400 shrink-0" /> : <ImageIcon size={14} className="text-slate-400 shrink-0" />}
                                                        <span className="text-[10px] text-slate-400 truncate">{slide.image || "Görsel yüklenmedi"}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex lg:flex-col gap-1 shrink-0">
                                                <button
                                                    onClick={() => { const n = [...slides]; n[index].isActive = !n[index].isActive; setSlides(n); }}
                                                    title={slide.isActive ? "Aktif" : "Pasif"}
                                                    className={`p-2 rounded-lg transition-colors ${slide.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}
                                                >
                                                    {slide.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => { if (confirm("Bu slaytı silmek istediğinize emin misiniz?")) setSlides(slides.filter((_, i) => i !== index)); }}
                                                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
                <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">İçerik Önerileri</p>
                    <p className="text-amber-700/80 text-xs leading-relaxed">
                        İdeal boyut 1920×1080 px · Formatlar: WebP, MP4, MOV · Maksimum 30 MB · Videolar sessiz ve döngülü olmalıdır.
                    </p>
                </div>
            </div>
        </div>
    );
}
