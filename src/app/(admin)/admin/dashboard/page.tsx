"use client";
import React, { useState, useEffect } from 'react';
import {
  Package,
  MessageSquare,
  Image as ImageIcon,
  Users,
  ArrowUpRight,
  ChevronRight,
  Plus,
  Search,
  Settings,
  Bell,
  Inbox
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestOffers, setLatestOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Veritabanından verileri çeken fonksiyon
  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/admin/notifications', { cache: 'no-store' });
      const data = await res.json();
      
      setUnreadCount(data.unreadCount || 0);
      setLatestOffers(data.latestOffers || []); 
      setLoading(false);
    } catch (error) {
      console.error("Veri çekilemedi:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 15000); 
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Toplam Ürün", value: "24", icon: Package, trend: "+2 bu ay", color: "bg-blue-50 text-blue-600" },
    { 
      label: "Yeni Teklifler", 
      value: unreadCount.toString(), 
      icon: MessageSquare, 
      trend: unreadCount > 0 ? `${unreadCount} okunmamış` : "Hepsi okundu", 
      color: unreadCount > 0 ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600",
      hasBadge: unreadCount > 0 
    },
    { label: "Galeri Dosyaları", value: "48", icon: ImageIcon, trend: "Yüksek Kalite", color: "bg-purple-50 text-purple-600" },
    { label: "Aylık Ziyaret", value: "1.2k", icon: Users, trend: "+12% artış", color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 p-4 md:p-10 font-sans selection:bg-amber-100">

      {/* Üst Menü */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            YÖNETİM <span className="text-amber-500">PANELİ</span>
          </h1>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${unreadCount > 0 ? 'bg-red-500 animate-ping' : 'bg-amber-500 animate-pulse'}`} />
            Temren Makina Industrial OS v2.0
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block text-slate-400">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={16} />
            <input
              type="text"
              placeholder="Sistemde ara..."
              className="bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-6 text-xs font-medium outline-none focus:border-amber-500 transition-all w-64 shadow-sm"
            />
          </div>
          <button className="relative bg-slate-900 text-white p-3 rounded-2xl hover:bg-amber-500 transition-all shadow-lg shadow-slate-200 group">
            <Plus size={20} />
            {unreadCount > 0 && (
               <span className="absolute -top-1 -right-1 flex h-4 w-4">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] items-center justify-center font-bold">{unreadCount}</span>
               </span>
            )}
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
            className={`bg-white border ${stat.hasBadge ? 'border-red-100 ring-2 ring-red-500/5' : 'border-slate-100'} p-7 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-default relative overflow-hidden`}
          >
            {stat.hasBadge && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black px-4 py-1 rounded-bl-2xl uppercase tracking-tighter animate-pulse">
                YENİ
              </div>
            )}
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon size={22} />
              </div>
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-amber-500 transition-colors italic">SİSTEM</div>
            </div>
            <div>
              <div className={`text-4xl font-black tracking-tighter mb-1 ${stat.hasBadge ? 'text-red-600' : 'text-slate-900'}`}>{stat.value}</div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</div>
                <div className={`text-[9px] font-bold italic ${stat.hasBadge ? 'text-red-400' : 'text-slate-400'}`}>{stat.trend}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SOL: Dinamik Teklif Listesi */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-800 border-l-4 border-amber-500 pl-4">Son Gelen Teklifler</h3>
            <button className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl text-slate-400 hover:bg-amber-500 hover:text-white transition-all">Tümünü İncele</button>
          </div>

          <div className="space-y-4">
            {latestOffers.length > 0 ? (
              latestOffers.map((offer: any, i: number) => {
                // Okunma durumu kontrolü: 'isRead' veya 'okundu' alanlarından biri true ise okunmuş sayılır.
                const isOfferRead = offer.isRead === true || offer.okundu === true;
                
                return (
                  <div 
                    key={offer._id || i} 
                    className={`flex items-center justify-between p-6 rounded-3xl transition-all cursor-pointer group ${!isOfferRead ? 'bg-amber-50/30 border border-amber-100' : 'bg-slate-50/50 border border-transparent hover:border-slate-200 hover:bg-white'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${!isOfferRead ? 'bg-white border border-amber-200 text-amber-600 shadow-sm' : 'bg-white border border-slate-200 text-slate-300 group-hover:text-amber-500 group-hover:border-amber-200'}`}>
                        {!isOfferRead ? <Bell size={16} className="animate-swing" /> : <Inbox size={16} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-black text-slate-800 uppercase tracking-tight">
                            {/* Veritabanındaki farklı isim alanlarını kontrol eden akıllı eşleştirme */}
                            {offer.fullName || offer.name || offer.adSoyad || offer.FURKANMERT || "İsimsiz Teklif"}
                          </div>
                          {!isOfferRead && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                          {offer.subject || offer.teklif_tipi || offer.productName || "Konu Belirtilmemiş"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-[10px] font-bold uppercase italic hidden md:block ${!isOfferRead ? 'text-amber-600' : 'text-slate-300'}`}>
                         {offer.createdAt ? new Date(offer.createdAt).toLocaleDateString('tr-TR') : 'Bugün'}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 italic text-slate-300 text-sm">Hiç kayıt bulunamadı.</div>
            )}
          </div>
        </div>

        {/* SAĞ: Hızlı İşlemler */}
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
              <div className="pt-4 border-t border-slate-50 text-slate-400">
                <p className="text-[9px] font-medium leading-relaxed uppercase tracking-tighter">
                  Son Senkronizasyon: <br />
                  <span className="text-slate-800 font-bold">{new Date().toLocaleTimeString('tr-TR')}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}