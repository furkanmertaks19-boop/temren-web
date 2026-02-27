"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function BlogSummary() {
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // API'den tüm haberleri çekiyoruz
                const res = await fetch('/api/blog');
                const data = await res.json();
                
                // Tarihe göre sıralayıp en güncel 3 tanesini alıyoruz
                const sortedBlogs = data.sort((a: any, b: any) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setBlogs(sortedBlogs.slice(0, 3));
            } catch (error) {
                console.error("Haberler yüklenirken hata oluştu:", error);
            }
        };
        fetchBlogs();
    }, []);

    if (blogs.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden border-t border-gray-50">
            <div className="container mx-auto px-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[2px] bg-orange-500"></span>
                            <span className="text-orange-500 font-bold text-xs tracking-[0.4em] uppercase">
                                Dinamik Haber Akışı
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none text-[#121212]">
                            MEDYA <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                                MERKEZİ
                            </span>
                        </h2>
                    </div>
                    <Link href="/medya/blog" className="group flex items-center gap-4 bg-[#121212] text-white px-10 py-5 font-bold text-[11px] tracking-widest uppercase transition-all duration-500 hover:bg-orange-500">
                        TÜMÜNÜ GÖR 
                        <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500" />
                    </Link>
                </div>

                {/* Dinamik Kartlar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {blogs.map((blog, index) => (
                        <motion.div
                            
                            key={blog.id || blog._id || `blog-${index}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.7 }}
                        >
                            <Link 
                                href={`/medya/blog/${blog.slug || blog.id}`} 
                                className="group flex flex-col h-full cursor-pointer"
                            >
                                {/* Görsel Alanı */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-8 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] rounded-2xl">
                                    <img
                                        src={blog.image || '/images/placeholder.jpg'}
                                        alt={blog.title}
                                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                    <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-2 text-[10px] font-black uppercase italic tracking-tighter">
                                        YENİ
                                    </div>
                                </div>

                                {/* İçerik Alanı */}
                                <div className="flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                                        <Calendar size={14} className="text-orange-500" />
                                        {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                                    </div>
                                    
                                    <h3 className="text-2xl font-black uppercase leading-tight text-[#121212] mb-5 group-hover:text-orange-500 transition-colors duration-300">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 italic border-l-2 border-gray-100 group-hover:border-orange-500 pl-4 transition-all">
                                        {blog.summary || blog.description?.substring(0, 100) + "..." || "Haber detayları için tıklayın."}
                                    </p>

                                    <div className="mt-auto flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#121212] group-hover:text-orange-500 transition-all duration-300">
                                        DEVAMINI OKU <span className="w-0 group-hover:w-8 h-[1px] bg-orange-500 transition-all duration-500"></span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}