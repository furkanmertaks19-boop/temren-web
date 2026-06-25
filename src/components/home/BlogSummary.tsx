"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogSummary() {
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        let cancelled = false;

        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blog?limit=3");
                const data = await res.json();
                if (!cancelled && Array.isArray(data)) {
                    setBlogs(data);
                }
            } catch {
                /* ignore */
            }
        };

        fetchBlogs();
        return () => {
            cancelled = true;
        };
    }, []);

    if (blogs.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden border-t border-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[2px] bg-orange-500" />
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
                    <Link
                        href="/medya/blog"
                        className="group flex items-center gap-4 bg-[#121212] text-white px-10 py-5 font-bold text-[11px] tracking-widest uppercase transition-all duration-500 hover:bg-orange-500"
                    >
                        TÜMÜNÜ GÖR
                        <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog._id || `blog-${index}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                        >
                            <Link href={`/medya/blog/${blog.slug || blog.id}`} className="group flex flex-col h-full cursor-pointer">
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-8 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] rounded-2xl">
                                    <Image
                                        src={blog.image || "/logo.png"}
                                        alt={blog.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-2 text-[10px] font-black uppercase italic tracking-tighter">
                                        YENİ
                                    </div>
                                </div>

                                <div className="flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                                        <Calendar size={14} className="text-orange-500" />
                                        {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
                                    </div>

                                    <h3 className="text-2xl font-black uppercase leading-tight text-[#121212] mb-5 group-hover:text-orange-500 transition-colors duration-300">
                                        {blog.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 italic border-l-2 border-gray-100 group-hover:border-orange-500 pl-4 transition-all">
                                        {blog.shortDescription ||
                                            blog.summary ||
                                            "Haber detayları için tıklayın."}
                                    </p>

                                    <div className="mt-auto flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#121212] group-hover:text-orange-500 transition-all duration-300">
                                        DEVAMINI OKU{" "}
                                        <span className="w-0 group-hover:w-8 h-[1px] bg-orange-500 transition-all duration-500" />
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
