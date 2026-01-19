"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Calendar, ArrowRight, Sparkles, RefreshCcw, Loader2 } from "lucide-react";
import Image from "next/image";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [randomPost, setRandomPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Veritabanından Haberleri Çek
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog', { cache: 'no-store' });
        const data = await res.json();

        if (data.length > 0) {
          setPosts(data);
          // Rastgele öne çıkan haberi belirle
          setRandomPost(data[Math.floor(Math.random() * data.length)]);
        }
      } catch (error) {
        console.error("Blog verileri yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const changeRandomPost = () => {
    if (posts.length > 1) {
      let newRandom;
      do {
        newRandom = posts[Math.floor(Math.random() * posts.length)];
      } while (newRandom._id === randomPost?._id);
      setRandomPost(newRandom);
    }
  };

  // Yükleme Ekranı
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-[#FF4D00]" size={48} />
      </div>
    );
  }

  // Veri Yoksa Gösterilecek Alan
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <PageHeader title="HABERLER & BLOG" subtitle="GÜNCEL GELİŞMELER" />
        <div className="py-40 text-center font-black uppercase italic text-slate-300 tracking-tighter text-4xl">
          Henüz bir içerik paylaşılmadı.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <PageHeader title="HABERLER & BLOG" subtitle="GÜNCEL GELİŞMELER" />

      <main className="py-24">
        <div className="container mx-auto px-8">

          {/* ⭐ Öne Çıkanlar: Asimetrik Modern Grid */}
          <section className="mb-40">
            <div className="flex items-center gap-4 mb-16">
              <div className="w-16 h-[2px] bg-[#FF4D00]" />
              <h2 className="text-slate-900 text-4xl font-black tracking-tighter uppercase italic">
                VİZYON <span className="text-slate-300">AKIŞI.</span> <Sparkles size={24} className="inline text-[#FF4D00] ml-2" />
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* SOL: Rastgele Değişen Ana Haber */}
              {randomPost && (
                <motion.div
                  key={randomPost._id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-7 group relative h-[650px] rounded-[60px] overflow-hidden bg-slate-100 shadow-2xl"
                >
                  <Image src={randomPost.image} alt={randomPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

                  <button
                    onClick={changeRandomPost}
                    className="absolute top-10 right-10 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#FF4D00] transition-all z-20 group/btn"
                  >
                    <RefreshCcw size={20} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                  </button>

                  <div className="absolute bottom-0 p-16 w-full">
                    <span className="bg-[#FF4D00] text-white px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 inline-block italic shadow-lg">ÖNE ÇIKAN HABER</span>
                    <h3 className="text-white text-5xl font-black tracking-tighter uppercase leading-none mb-6">
                      {randomPost.title}
                    </h3>
                    <p className="text-white/70 text-lg font-medium italic mb-8 max-w-xl leading-relaxed line-clamp-2">
                      {randomPost.shortDescription}
                    </p>
                    <Link href={`/medya/blog/${randomPost.slug}`} className="flex items-center justify-between border-t border-white/10 pt-8 group/link">
                      <div className="flex items-center gap-3 text-white/50 font-bold uppercase tracking-widest text-xs italic">
                        <Calendar size={16} /> {randomPost.date}
                      </div>
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-950 group-hover:bg-[#FF4D00] group-hover:text-white transition-all shadow-xl">
                        <ArrowRight size={24} />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* SAĞ: Son Eklenen 4 Haber */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {posts.slice(0, 4).map((post, index) => (
                  <Link href={`/medya/blog/${post.slug}`} key={post._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex gap-6 items-center bg-slate-50 p-6 rounded-[40px] hover:bg-slate-900 transition-all duration-500 border border-transparent hover:border-slate-800 shadow-sm hover:shadow-2xl"
                    >
                      <div className="relative w-32 h-32 rounded-[30px] overflow-hidden shrink-0 shadow-md">
                        <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="flex flex-col pr-4">
                        <span className="text-[#FF4D00] font-black text-[9px] tracking-widest uppercase mb-2 italic">{post.category}</span>
                        <h4 className="text-slate-900 text-lg font-black tracking-tighter uppercase leading-tight group-hover:text-white transition-colors line-clamp-2">{post.title}</h4>
                        <p className="text-slate-400 text-[10px] font-bold mt-2 uppercase italic">{post.date}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 📰 Haber Havuzu: Grid Yapısı */}
          <section>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-12 h-[2px] bg-[#FF4D00]" />
              <h2 className="text-slate-900 text-4xl font-black tracking-tighter uppercase italic">HABER <span className="text-slate-300">HAVUZU.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {posts.map((news, index) => (
                <Link href={`/medya/blog/${news.slug}`} key={news._id}>
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-slate-50 border border-slate-100 rounded-[40px] overflow-hidden hover:bg-white hover:shadow-2xl h-full transition-all group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-8">
                      <span className="text-[9px] font-black tracking-[0.2em] text-[#FF4D00] uppercase mb-3 block italic">{news.category}</span>
                      <h4 className="text-base font-black text-slate-900 uppercase tracking-tighter leading-tight line-clamp-2">{news.title}</h4>
                      <div className="mt-8 flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 group-hover:text-[#FF4D00] transition-colors uppercase italic">
                        DETAYI GÖR <ArrowRight size={14} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}