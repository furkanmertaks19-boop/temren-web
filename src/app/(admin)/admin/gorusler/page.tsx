"use client";
import React, { useEffect, useState } from 'react';
import { Check, Trash2, Clock, Youtube, FileText, Save, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function AdminComments() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  const fetchAll = async () => {
    const res = await fetch('/api/admin/comments');
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => { fetchAll(); }, []);

  // 🚀 HEM ONAYLAMA HEM DÜZENLEME YAPAN TEK FONKSİYON
  const handleUpdate = async (id: string, updateData: any) => {
    setLoading(id);
    try {
      const res = await fetch(`/api/admin/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      if (res.ok) fetchAll();
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu görüşü tamamen silmek istediğine emin misin?")) {
      await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' });
      fetchAll();
    }
  };

  const pendingCount = comments.filter(c => !c.isActive).length;

  return (
    <div>
      <AdminPageHeader
        title="Müşteri Görüşleri"
        description={`${comments.length} toplam · ${pendingCount} onay bekliyor`}
        badge={pendingCount > 0 ? (
          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
            {pendingCount} bekliyor
          </span>
        ) : undefined}
      />

      <div className="grid gap-6">
        <AnimatePresence>
          {comments.map((c) => (
            <motion.div
              layout
              key={c._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group relative p-6 bg-white rounded-xl border transition-all ${
                c.isActive ? 'border-slate-200' : 'border-amber-200 bg-amber-50/30'
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* SOL: Müşteri Bilgisi ve Metin */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 uppercase">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm tracking-tight">{c.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        <Clock size={12} /> {new Date(c.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                    {!c.isActive && (
                      <span className="ml-2 text-[9px] bg-amber-500 text-white px-3 py-1 rounded-full font-black uppercase tracking-tighter animate-pulse">
                        Onay Bekliyor
                      </span>
                    )}
                  </div>
                  
                  <blockquote className="text-slate-600 text-base italic leading-relaxed border-l-4 border-slate-100 pl-4">
                    "{c.quote}"
                  </blockquote>
                </div>

                {/* ORTA: Video Ayarları */}
                <div className="w-full lg:w-72 bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Görünüm Tipi</span>
                    {c.type === 'video' ? <Youtube className="text-[#FF4D00]" size={16} /> : <FileText className="text-slate-400" size={16} />}
                  </div>
                  
                  <select 
                    className="w-full bg-white p-3 rounded-xl text-xs font-bold outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#FF4D00] transition-all"
                    value={c.type}
                    onChange={(e) => handleUpdate(c._id, { type: e.target.value })}
                  >
                    <option value="text">Sadece Metin</option>
                    <option value="video">🎥 Video Yorum</option>
                  </select>

                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="YouTube ID (Örn: qPWWU...)"
                      className="w-full bg-white p-3 pr-10 rounded-xl text-xs font-mono outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                      defaultValue={c.youtubeId}
                      onBlur={(e) => handleUpdate(c._id, { youtubeId: e.target.value })}
                    />
                    {c.youtubeId && (
                      <a href={`https://youtube.com/watch?v=${c.youtubeId}`} target="_blank" className="absolute right-3 top-3 text-slate-300 hover:text-blue-500 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* SAĞ: Aksiyonlar */}
                <div className="flex lg:flex-col gap-3 shrink-0">
                  {!c.isActive ? (
                    <button 
                      onClick={() => handleUpdate(c._id, { isActive: true })}
                      disabled={loading === c._id}
                      className="flex-1 lg:flex-none p-4 bg-green-500 text-white rounded-2xl hover:bg-black transition-all shadow-lg shadow-green-500/20"
                      title="Onayla ve Yayınla"
                    >
                      <Check size={24} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleUpdate(c._id, { isActive: false })}
                      className="flex-1 lg:flex-none p-4 bg-slate-900 text-white rounded-2xl hover:bg-amber-500 transition-all shadow-lg"
                      title="Yayından Kaldır"
                    >
                      <Save size={24} />
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleDelete(c._id)}
                    className="flex-1 lg:flex-none p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                    title="Yorumu Sil"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}