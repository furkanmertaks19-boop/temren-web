import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      
      {/* Arkaplan efekt */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a] opacity-90" />

      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Görsel */}
        <div className="w-[300px] md:w-[420px] relative">
          <Image
            src="/notfoundd.gif"
            alt="Sayfa bulunamadı"
            width={420}
            height={420}
            priority
            className="object-contain"
          />
        </div>

        {/* Başlık */}
        <h1 className="text-5xl md:text-6xl font-black tracking-tight">
          Sayfa Bulunamadı
        </h1>

        {/* Açıklama */}
        <p className="text-white/70 max-w-xl font-semibold">
          Aradığınız sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.
          Temren Makina ana sayfasına dönerek ürünlerimizi inceleyebilirsiniz.
        </p>

        {/* Buton */}
        <Link
          href="/"
          className="mt-4 px-8 py-4 rounded-full bg-white text-black font-black tracking-wide hover:bg-[#FF4D00] hover:text-white transition-all duration-300 shadow-lg"
        >
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}