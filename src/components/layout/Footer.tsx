"use client";

import React from "react";
import Link from "next/link";
import {
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  kurumsal: [
    { name: "Hakkımızda", href: "/kurumsal/hakkimizda" },
    { name: "Belgelerimiz", href: "/kurumsal/belgelerimiz" },
    { name: "Politikalarımız", href: "/kurumsal/politikalarimiz" },
    { name: "Referanslarımız", href: "/kurumsal/referanslarimiz" },
    { name: "İnsan Kaynakları", href: "/kurumsal/insan-kaynaklari" },
    { name: "İletişim", href: "/iletisim" },
  ],

  urunler: [
    { name: "Traktör Palet Sistemleri", href: "/urunler" },
    { name: "PLT-18", href: "/urunler/palet-sistemleri/plt-18" },
    { name: "PLT-17", href: "/urunler/palet-sistemleri/plt-17" },
    { name: "PLT-16", href: "/urunler/palet-sistemleri/plt-16" },
    { name: "CNC Vakum Tablası", href: "/urunler/uretim/vakum-tablasi" },
    { name: "Takım Sıkma Mekanizması", href: "/urunler/uretim/takim-sikma" },
    { name: "Mini Takım Boy Ölçer", href: "/urunler/uretim/mini-takim-boy-olcer" },
    { name: "Vortex Tüpü", href: "/urunler/uretim/vortex-tupu" },
    { name: "TİKA", href: "/urunler/tika" },
    { name: "Mini TİKA", href: "/urunler/mini-tika" },
  ],

  medya: [
    { name: "Foto Galeri", href: "/medya/foto-galeri" },
    { name: "Video Galeri", href: "/medya/video-galeri" },
    { name: "Blog", href: "/blog" },
    { name: "Haberler", href: "/haberler" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#101010] pt-20 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,77,0,0.18),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(80,120,255,0.12),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#101010]">
                <span className="text-xl font-black">T</span>
              </div>

              <div>
                <div className="text-2xl font-black uppercase tracking-[-0.04em]">
                  Temren
                </div>
                <div className="-mt-1 text-xs font-black uppercase tracking-[0.35em] text-[#FF4D00]">
                  Makina
                </div>
              </div>
            </div>

            <p className="max-w-sm text-sm font-medium leading-7 text-white/55">
              Ankara merkezli mühendislik ve üretim gücümüzle; savunma, tarım
              ve endüstriyel otomasyon alanlarında yüksek hassasiyetli çözümler
              geliştiriyoruz.
            </p>

            <div className="mt-8 flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white hover:text-[#101010]"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <FooterColumn title="Kurumsal" links={footerLinks.kurumsal} />

          <FooterColumn title="Ürünler" links={footerLinks.urunler} />

          <div>
            <FooterTitle title="Bize Ulaşın" />

            <div className="space-y-5">
              <ContactItem
                icon={<MapPin size={18} />}
                title="Fabrika"
                text={
                  <>
                    Saray Mah. 100.Yıl Blv. No: 75 <br />
                    Kahramankazan / Ankara
                  </>
                }
              />

              <ContactItem
                icon={<Phone size={18} />}
                title="Telefon"
                text="+90 (312) 815 15 15"
              />

              <ContactItem
                icon={<Mail size={18} />}
                title="E-Posta"
                text="satis@temrenmakina.com"
              />
            </div>

            <Link
              href="/iletisim"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FF4D00] px-5 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-white hover:text-[#101010]"
            >
              Teklif Al
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 py-7">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 md:text-left">
              © {currentYear} Temren Makina Mühendislik. Tüm hakları saklıdır.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6">
             

            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none opacity-[0.035]">
        <span className="whitespace-nowrap text-[120px] font-black uppercase tracking-[-0.08em] text-white md:text-[190px]">
          Temren Makina
        </span>
      </div>
    </footer>
  );
}

function FooterTitle({ title }: { title: string }) {
  return (
    <h4 className="relative mb-8 text-lg font-semibold capitalize text-white">
      {title}
      <span className="absolute -bottom-3 left-0 h-[2px] w-[50px] rounded-full bg-[#FF4D00]" />
    </h4>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <FooterTitle title={title} />

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="block text-sm font-light capitalize text-white/65 transition-all duration-300 hover:translate-x-2 hover:text-white"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#FF4D00]">
        {icon}
      </div>

      <div>
        <div className="mb-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
          {title}
        </div>

        <p className="text-sm font-medium leading-6 text-white/70">{text}</p>
      </div>
    </div>
  );
}