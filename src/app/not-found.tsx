import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <div className="text-6xl font-black tracking-tighter">404</div>
      <div className="text-white/70 font-bold">Bu sayfa bulunamadı.</div>
      <Link
        href="/"
        className="mt-2 px-6 py-3 rounded-full bg-white text-black font-black hover:bg-[#FF4D00] hover:text-white transition"
      >
        Anasayfaya dön
      </Link>
    </div>
  );
}
