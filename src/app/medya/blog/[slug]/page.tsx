"use client";
import React, { use, useState, useEffect } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Share2, Clock, Calendar, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    // Next.js 15 params unwrap
    const resolvedParams = use(params);
    const { slug } = resolvedParams;

    // States
    const [post, setPost] = useState<any>(null);
    const [otherPosts, setOtherPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Newsletter States
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    // Veri Çekme
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/blog`);
                const allPosts = await res.json();
                const currentPost = allPosts.find((p: any) => p.slug === slug);

                if (!currentPost) return;

                setPost(currentPost);
                setOtherPosts(allPosts.filter((p: any) => p.slug !== slug).slice(0, 5));
            } catch (error) {
                console.error("Hata:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    // Bülten Kayıt Fonksiyonu
    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setStatus("error");
            setMessage("Geçerli bir e-posta giriniz.");
            return;
        }

        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Bir hata oluştu.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Sunucu hatası oluştu.");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center italic font-black uppercase tracking-tighter text-slate-300 text-3xl animate-pulse">Yükleniyor...</div>;
    if (!post) return notFound();

    return (
        <div className="bg-white min-h-screen font-sans overflow-x-hidden">
            <PageHeader title={post.category} subtitle={post.title} />

            <main className="py-20 container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 relative">

                    {/* 1. SOL SÜTUN: SOSYAL MEDYA */}
                    <aside className="hidden lg:flex flex-col gap-6 sticky top-32 h-fit">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4 [writing-mode:vertical-lr] rotate-180">BİZİ TAKİP EDİN</span>
                        <a href="https://www.facebook.com/temrenmakina" target="_blank" className="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"><Facebook size={16} /></a>
                        <a href="https://www.linkedin.com/company/temrenmakina/" target="_blank" className="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm"><Linkedin size={16} /></a>
                        <a href="https://www.instagram.com/temrenmakina/" target="_blank" className="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#E4405F] hover:text-white transition-all shadow-sm"><Instagram size={16} /></a>
                        <a href="https://www.youtube.com/channel/UCxAZfJE_4m6iMZ1QfzwgjjQ" target="_blank" className="w-11 h-11 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#FF0000] hover:text-white transition-all shadow-sm">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                        </a>
                    </aside>

                    {/* 2. ORTA: İÇERİK */}
                    <div className="flex-grow max-w-4xl">
                        <div className="relative h-[450px] md:h-[550px] w-full rounded-[40px] md:rounded-[80px] overflow-hidden mb-12 shadow-2xl group border border-slate-50">
                            <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" priority />
                            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-6 py-2 rounded-full font-black text-xs uppercase italic tracking-widest text-slate-900 shadow-xl">{post.category}</div>
                        </div>

                        <div className="flex flex-wrap items-center gap-8 mb-10 text-[11px] font-black uppercase italic tracking-widest text-slate-400 border-b pb-8 border-slate-50">
                            <div className="flex items-center gap-2"><Calendar size={14} className="text-[#FF4D00]" /> {post.date}</div>
                            <div className="flex items-center gap-2"><Clock size={14} className="text-[#FF4D00]" /> 3 Dakika Okuma</div>
                            <div className="flex items-center gap-2"><Share2 size={14} className="text-[#FF4D00]" /> Temren Makina Haber</div>
                        </div>

                        <div className="prose prose-xl max-w-none text-slate-700 font-medium leading-[1.8] italic mb-20 prose-h4:text-3xl prose-h4:font-black prose-h4:uppercase prose-h4:tracking-tighter prose-h4:text-slate-900 prose-h4:not-italic prose-img:rounded-[40px]" dangerouslySetInnerHTML={{ __html: post.content }} />

                        {/* Galeri Bölümü */}
                        {post.gallery && post.gallery.length > 0 && (
                            <div className="mt-24 pt-16 border-t border-slate-100">
                                <h3 className="text-2xl font-black tracking-tighter uppercase italic text-slate-900 leading-none mb-10">ETKİNLİK <span className="text-[#FF4D00]">GALERİSİ.</span></h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {post.gallery.map((img: string, idx: number) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group shadow-sm hover:shadow-md transition-all cursor-pointer">
                                            <Image src={img} alt="Galeri" fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="200px" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. SAĞ SÜTUN: SIDEBAR */}
                    <aside className="lg:w-80 flex flex-col gap-12">
                        <div className="sticky top-32">
                            <h4 className="text-sm font-black uppercase italic tracking-[0.2em] text-slate-900 mb-8 flex items-center gap-3">
                                <div className="w-8 h-1 bg-[#FF4D00]"></div> SON PAYLAŞIMLAR
                            </h4>
                            <div className="flex flex-col gap-10 mb-16">
                                {otherPosts.map((other) => (
                                    <Link href={`/medya/blog/${other.slug}`} key={other._id} className="group">
                                        <div className="relative h-44 rounded-[35px] overflow-hidden mb-4 border border-slate-50 shadow-sm transition-all group-hover:shadow-lg">
                                            <Image src={other.image} alt={other.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                                        </div>
                                        <div className="px-2">
                                            <span className="text-[9px] font-black text-[#FF4D00] uppercase italic tracking-widest">{other.category}</span>
                                            <h5 className="text-[13px] font-black uppercase italic tracking-tighter text-slate-800 leading-tight group-hover:text-[#FF4D00] transition-colors line-clamp-2 mt-2">{other.title}</h5>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* ÇALIŞAN BÜLTEN KAYIT KARTI */}
                            <div className="bg-slate-900 rounded-[50px] p-10 text-white relative overflow-hidden group shadow-2xl">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FF4D00] rounded-full blur-3xl opacity-20 transition-opacity"></div>
                                <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4">TAKİPTE <span className="text-[#FF4D00]">KALIN.</span></h4>
                                <p className="text-[10px] font-medium text-slate-400 italic mb-8 leading-relaxed uppercase tracking-widest">En yeni gelişmelerden ilk siz haberdar olun.</p>

                                {status === "success" ? (
                                    <div className="bg-emerald-500/20 border border-emerald-500/50 p-6 rounded-[25px] text-center">
                                        <CheckCircle2 className="text-emerald-500 mx-auto mb-3" size={32} />
                                        <p className="text-[10px] font-black uppercase italic text-emerald-500">Kayıt Başarılı!</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubscribe}>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="E-POSTA ADRESİNİZ"
                                            className="w-full bg-slate-800 border-none rounded-2xl p-4 text-[10px] font-bold text-white mb-4 outline-none focus:ring-1 ring-[#FF4D00] transition-all"
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="w-full bg-[#FF4D00] text-white font-black text-[10px] py-4 rounded-2xl uppercase tracking-[0.2em] italic hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                                        >
                                            {status === "loading" ? <Loader2 className="animate-spin" size={14} /> : "KAYIT OL"} <ArrowRight size={14} />
                                        </button>
                                        {status === "error" && <p className="text-red-400 text-[9px] mt-3 font-bold uppercase italic text-center">{message}</p>}
                                    </form>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
}