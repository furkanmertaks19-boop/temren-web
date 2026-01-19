"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
    const pathname = usePathname();
    // Admin yollarında Header'ı gizler
    const isAdminPage = pathname?.startsWith("/admin");

    if (isAdminPage) return null;

    return <Header />;
}