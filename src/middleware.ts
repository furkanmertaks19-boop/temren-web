import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/adminSession";

const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function isProtectedRoute(pathname: string, method: string): boolean {
  if (pathname.startsWith("/api/admin")) return true;
  if (pathname === "/api/upload" && method === "POST") return true;

  if (pathname === "/api/teklifler" || pathname.startsWith("/api/teklifler/")) {
    return true;
  }

  if (pathname === "/api/quote-request" && method === "GET") return true;
  if (pathname === "/api/newsletter" && method === "GET") return true;

  const managedResources = ["/api/blog", "/api/slider", "/api/nav", "/api/products"];
  if (managedResources.includes(pathname) && MUTATING.has(method)) {
    return true;
  }

  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (!isProtectedRoute(pathname, method)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json(
      { success: false, error: "Yetkisiz erişim. Lütfen tekrar giriş yapın." },
      { status: 401 }
    );
  }

  const response = NextResponse.next();
  response.headers.set("x-admin-user", session.username);
  return response;
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/api/upload",
    "/api/blog",
    "/api/slider",
    "/api/nav",
    "/api/products",
    "/api/teklifler",
    "/api/teklifler/:path*",
    "/api/quote-request",
    "/api/newsletter",
  ],
};
