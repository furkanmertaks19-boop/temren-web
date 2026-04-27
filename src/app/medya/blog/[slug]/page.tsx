"use client";

import React, { use, useEffect, useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Instagram,
  Share2,
  Clock,
  Calendar,
  ArrowRight,
  Loader2,
  CheckCircle2,
  X,
  Plus,
  Mail,
} from "lucide-react";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [post, setPost] = useState<any>(null);
  const [otherPosts, setOtherPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/blog`, { cache: "no-store" });
        const allPosts = await res.json();

        const currentPost = allPosts.find((p: any) => p.slug === slug);

        if (!currentPost) {
          setPost(null);
          return;
        }

        setPost(currentPost);
        setOtherPosts(allPosts.filter((p: any) => p.slug !== slug).slice(0, 5));
      } catch (error) {
        console.error("Blog detay hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

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
        body: JSON.stringify({ email }),
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

  const readingTime = post?.content
    ? Math.max(
        1,
        Math.ceil(
          post.content.replace(/<[^>]+>/g, "").trim().split(/\s+/).length / 180
        )
      )
    : 3;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#FF4D00]" size={42} />
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
            Haber yükleniyor
          </p>
        </div>
      </div>
    );
  }

  if (!post) return notFound();

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans overflow-x-hidden text-slate-900">
      <PageHeader title={post.category} subtitle={post.title} />

      <main className="relative">
        <section className="container mx-auto px-5 lg:px-10 pt-16 pb-10">
          <div className="grid grid-cols-1 xl:grid-cols-[70px_minmax(0,820px)_300px] gap-8 xl:gap-10 items-start justify-center">
            
            {/* SOL PAYLAŞIM ÇUBUĞU */}
            <aside className="hidden xl:flex flex-col items-center gap-5 sticky top-28">
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-300 [writing-mode:vertical-lr] rotate-180 mb-3">
                Paylaş
              </span>

              <a href="https://www.facebook.com/temrenmakina" target="_blank" className="social-btn hover:bg-[#1877F2] hover:text-white">
                <Facebook size={16} />
              </a>

              <a href="https://www.linkedin.com/company/temrenmakina/" target="_blank" className="social-btn hover:bg-[#0A66C2] hover:text-white">
                <Linkedin size={16} />
              </a>

              <a href="https://www.instagram.com/temrenmakina/" target="_blank" className="social-btn hover:bg-[#E4405F] hover:text-white">
                <Instagram size={16} />
              </a>
            </aside>

            <article className="min-w-0 w-full">
              {/* ANA GÖRSEL KARTI */}
              <div className="bg-white rounded-[34px] md:rounded-[50px] p-4 md:p-6 shadow-[0_30px_100px_rgba(15,23,42,0.08)] border border-slate-100">
                <div className="relative h-[320px] md:h-[520px] w-full rounded-[28px] md:rounded-[42px] overflow-hidden bg-slate-100 group">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                  <div className="absolute left-5 md:left-8 bottom-5 md:bottom-8 right-5 md:right-8">
                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.18em] text-slate-900 mb-5 shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
                      {post.category}
                    </div>

                    <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.05em] leading-[1.05] max-w-5xl drop-shadow-xl break-words">
                      {post.title}
                    </h1>
                  </div>
                </div>
              </div>

              {/* META BİLGİ KARTI */}
              <div className="mt-8 bg-white rounded-[28px] border border-slate-100 shadow-sm p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-4 md:gap-7 text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-[#FF4D00]" />
                    {post.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-[#FF4D00]" />
                    {readingTime} Dakika Okuma
                  </div>

                  <div className="flex items-center gap-2">
                    <Share2 size={15} className="text-[#FF4D00]" />
                    Temren Makina Haber
                  </div>
                </div>

                {post.shortDescription && (
                  <p className="mt-6 text-lg md:text-2xl leading-relaxed font-bold text-slate-700 tracking-[-0.02em] border-l-4 border-[#FF4D00] pl-6">
                    {post.shortDescription}
                  </p>
                )}
              </div>

              {/* İÇERİK KARTI */}
              <div className="mt-10 bg-white rounded-[30px] md:rounded-[42px] border border-slate-100 shadow-[0_30px_90px_rgba(15,23,42,0.06)] px-5 py-8 md:px-12 md:py-14 overflow-hidden">
                <div
                  className="news-content mx-auto"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* GALERİ BÖLÜMÜ */}
              {post.gallery && post.gallery.length > 0 && (
                <section className="mt-16 bg-white rounded-[34px] md:rounded-[50px] border border-slate-100 shadow-sm p-5 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF4D00]">
                        Fotoğraf Arşivi
                      </span>
                      <h2 className="text-3xl md:text-5xl font-black tracking-[-0.05em] uppercase mt-2">
                        Etkinlik Galerisi
                      </h2>
                    </div>

                    <p className="text-sm text-slate-400 font-bold max-w-sm">
                      Fuardan öne çıkan kareleri görüntülemek için fotoğraflara tıklayın.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {post.gallery.map((img: string, idx: number) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -6, scale: 0.98 }}
                        onClick={() => setSelectedImg(img)}
                        className={`relative overflow-hidden rounded-[28px] bg-slate-100 cursor-pointer group shadow-sm border border-slate-100 ${
                          idx === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                        }`}
                      >
                        <Image
                          src={img}
                          alt="Etkinlik Galerisi"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl">
                            <Plus size={22} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* SAĞ SIDEBAR */}
            <aside className="xl:w-[320px]">
              <div className="sticky top-28 space-y-8">
                <div className="bg-white rounded-[34px] border border-slate-100 shadow-sm p-7">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-slate-900 flex items-center gap-3 mb-7">
                    <span className="w-9 h-1.5 rounded-full bg-[#FF4D00]" />
                    Son Haberler
                  </h3>

                  <div className="space-y-6">
                    {otherPosts.map((other) => (
                      <Link href={`/medya/blog/${other.slug}`} key={other._id} className="group grid grid-cols-[92px_1fr] gap-4 items-center">
                        <div className="relative h-24 rounded-[24px] overflow-hidden bg-slate-100">
                          <Image
                            src={other.image}
                            alt={other.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                          />
                        </div>

                        <div className="min-w-0">
                          <span className="text-[9px] font-black text-[#FF4D00] uppercase tracking-[0.18em]">
                            {other.category}
                          </span>

                          <h4 className="mt-2 text-sm font-black leading-tight tracking-[-0.03em] text-slate-800 group-hover:text-[#FF4D00] transition-colors line-clamp-3">
                            {other.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#FF4D00] rounded-full blur-3xl opacity-25" />

                  <div className="relative">
                    <div className="w-13 h-13 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                      <Mail className="text-[#FF4D00]" size={22} />
                    </div>

                    <h3 className="text-2xl font-black tracking-[-0.05em] uppercase leading-none mb-4">
                      Takipte Kalın
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed mb-7">
                      Temren Makina’daki yeni gelişmelerden ve etkinliklerden haberdar olun.
                    </p>

                    {status === "success" ? (
                      <div className="bg-emerald-500/15 border border-emerald-500/40 p-6 rounded-[26px] text-center">
                        <CheckCircle2 className="text-emerald-400 mx-auto mb-3" size={34} />
                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-400">
                          Kayıt Başarılı
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubscribe}>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="E-posta adresiniz"
                          className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-sm font-bold text-white mb-4 outline-none focus:ring-2 ring-[#FF4D00] transition-all placeholder:text-slate-500"
                        />

                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="w-full bg-[#FF4D00] text-white font-black text-[11px] py-4 rounded-2xl uppercase tracking-[0.18em] hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                          {status === "loading" ? (
                            <Loader2 className="animate-spin" size={15} />
                          ) : (
                            "Kayıt Ol"
                          )}
                          <ArrowRight size={15} />
                        </button>

                        {status === "error" && (
                          <p className="text-red-400 text-[10px] mt-3 font-bold uppercase text-center">
                            {message}
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* GÖRSEL MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 bg-slate-950/95 z-[999] flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-[#FF4D00] transition-colors z-10"
              onClick={() => setSelectedImg(null)}
            >
              <X size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              className="relative w-full h-full max-w-6xl max-h-[82vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg}
                alt="Büyük Görsel"
                fill
                className="object-contain rounded-3xl"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STYLES */}
      <style jsx global>{`
        .social-btn {
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          background: #ffffff;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
          transition: all 0.25s ease;
        }

        /* 🔥 ANA İÇERİK DÜZENLEMESİ */
        .news-content {
          width: 100%;
          max-width: 760px;
          color: #334155;
          font-size: 18px;
          line-height: 1.85;
          font-weight: 500;
          /* Taşmayı engellemek için kritik ayarlar */
          word-wrap: break-word;
          overflow-wrap: break-word;
          word-break: normal;
        }

        /* Tüm alt elemanların dışarı taşmasını engelle */
        .news-content * {
          max-width: 100% !important;
          box-sizing: border-box;
          overflow-wrap: break-word !important;
        }

        .news-content h1,
        .news-content h2,
        .news-content h3,
        .news-content h4 {
          color: #0f172a;
          word-break: normal;
          overflow-wrap: break-word;
        }

        .news-content h1 {
          font-size: clamp(26px, 4vw, 36px);
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -0.03em;
          margin: 30px 0 16px;
        }

        .news-content h2 {
          font-size: clamp(22px, 3.5vw, 32px);
          line-height: 1.2;
          font-weight: 900;
          margin: 40px 0 16px;
          position: relative;
        }

        .news-content h2::before {
          content: "";
          display: block;
          width: 50px;
          height: 5px;
          border-radius: 999px;
          background: #ff4d00;
          margin-bottom: 14px;
        }

        .news-content h3 {
          font-size: 24px;
          font-weight: 800;
          color: #ff4d00;
          margin: 30px 0 10px;
        }

        .news-content p {
          margin: 0 0 20px;
        }

        .news-content strong {
          color: #0f172a;
          font-weight: 800;
        }

        .news-content img {
          display: block;
          width: 100%;
          height: auto !important;
          max-height: 600px;
          object-fit: cover;
          border-radius: 20px;
          margin: 36px auto;
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
        }

        .news-content blockquote {
          margin: 36px 0;
          padding: 24px 28px;
          border-left: 6px solid #ff4d00;
          background: #fff7ed;
          border-radius: 0 24px 24px 0;
          color: #0f172a;
          font-size: 20px;
          font-weight: 700;
        }

        .news-content iframe {
          width: 100% !important;
          aspect-ratio: 16 / 9;
          border-radius: 20px;
          margin: 36px 0;
          height: auto;
        }

        @media (max-width: 768px) {
          .news-content {
            font-size: 16px;
            line-height: 1.7;
          }
          .news-content h1 { font-size: 26px; }
          .news-content h2 { font-size: 22px; }
          .news-content blockquote {
            font-size: 18px;
            padding: 20px;
          }
        }
      `}</style>
      <Footer />
    </div>
  );
}