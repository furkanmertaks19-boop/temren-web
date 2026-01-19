"use client";
import React from 'react';
import {
  Package,
  MessageSquare,
  Image as ImageIcon,
  Users,
  ArrowUpRight,
  ChevronRight,
  Plus,
  Search,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const stats = [
    { label: "Toplam Ürün", value: "24", icon: Package, trend: "+2 bu ay", color: "bg-blue-50 text-blue-600" },
    { label: "Yeni Teklifler", value: "12", icon: MessageSquare, trend: "4 okunmamış", color: "bg-amber-50 text-amber-600" },
    { label: "Galeri Dosyaları", value: "48", icon: ImageIcon, trend: "Yüksek Kalite", color: "bg-purple-50 text-purple-600" },
    { label: "Aylık Ziyaret", value: "1.2k", icon: Users, trend: "+12% artış", color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 p-4 md:p-10 font-sans selection:bg-amber-100">

      {/* Üst Menü / Navigation Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            YÖNETİM <span className="text-amber-500">PANELİ</span>
          </h1>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Temren Makina Industrial OS v2.0
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Sistemde ara..."
              className="bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-6 text-xs font-medium outline-none focus:border-amber-500 transition-all w-64 shadow-sm"
            />
          </div>
          <button className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-amber-500 transition-all shadow-lg shadow-slate-200">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-slate-100 p-7 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-default"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon size={22} />
              </div>
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-amber-500 transition-colors">Veri</div>
            </div>
            <div>
              <div className="text-4xl font-black tracking-tighter text-slate-900 mb-1">{stat.value}</div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</div>
                <div className="text-[9px] font-bold text-slate-400 italic">{stat.trend}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ana Grid Sistemi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Sol Taraf: Son Gelen Teklifler */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-800 border-l-4 border-amber-500 pl-4">Son Gelen Teklifler</h3>
            <button className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl text-slate-400 hover:bg-amber-500 hover:text-white transition-all">Tümünü İncele</button>
          </div>

          <div className="space-y-4">
            {[
              { name: "Hasan Can Aksoy", subject: "PLT-18 Teklif Talebi", time: "12 Dakika Önce" },
              { name: "Birsen Özüm", subject: "Yedek Parça Sorgusu", time: "2 Saat Önce" },
              { name: "Temren Savunma", subject: "İhale Dökümanları", time: "Dün" }
            ].map((offer, i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50/50 border border-transparent hover:border-slate-200 hover:bg-white transition-all cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-300 group-hover:text-amber-500 group-hover:border-amber-200 transition-all">
                    0{i + 1}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-800 uppercase tracking-tight">{offer.name}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{offer.subject}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-bold text-slate-300 uppercase italic hidden md:block">{offer.time}</span>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ Taraf: Hızlı İşlemler */}
        <div className="lg:col-span-4 space-y-8">

          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-300 relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-amber-500/10 blur-3xl rounded-full transition-all group-hover:bg-amber-500/20" />
            <Settings size={28} className="text-amber-500 mb-6" />
            <h3 className="text-2xl font-black italic uppercase leading-none mb-4">Hızlı <br /> Aksiyonlar</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-8 leading-relaxed">
              Sistem envanterini ve içeriklerini tek tıkla yönetin.
            </p>

            <div className="space-y-3 relative z-10">
              {["Ürün Ekle", "Blog Yazısı", "Galeri Güncelle"].map((action) => (
                <button key={action} className="w-full py-4 px-6 bg-white/5 hover:bg-amber-500 hover:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-left transition-all flex items-center justify-between group/btn">
                  {action}
                  <ArrowUpRight size={16} className="opacity-0 group-hover/btn:opacity-100 transition-all translate-y-1 group-hover/btn:translate-y-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sunucu Sağlığı</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                  <span>Veritabanı</span>
                  <span className="text-amber-500">Optimal</span>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900 w-[85%]" />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-[9px] font-medium text-slate-400 leading-relaxed uppercase tracking-tighter">
                  Son Senkronizasyon: <br />
                  <span className="text-slate-800 font-bold">12 Ocak 2026 - 15:40</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}