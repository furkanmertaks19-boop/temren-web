"use client";
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PaletImage({ slug }: { slug: string }) {
    const { scrollYProgress } = useScroll();
    const [imgSrc, setImgSrc] = useState(`/images/palet/${slug}.png`);

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    // Eğer slug değişirse yolu tekrar güncelle
    useEffect(() => {
        setImgSrc(`/images/palet/${slug}.png`);
    }, [slug]);

    return (
        <div className="fixed inset-0 w-full h-screen z-0 overflow-hidden bg-black">
            <motion.div style={{ scale }} className="relative w-full h-full opacity-60">
                <Image
                    src={imgSrc}
                    alt={slug}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    // Resim bulunamazsa beyaz bir placeholder göster ki sayfa kırılmasın
                    onError={() => {
                        setImgSrc('https://via.placeholder.com/1920x1080?text=Gorsel+Bulunamadi');
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
            </motion.div>
        </div>
    );
}