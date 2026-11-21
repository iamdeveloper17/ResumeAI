// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Public routes — login ki zaroorat nahi
const PUBLIC_ROUTES = ["/", "/login", "/register"];

// Auth routes — logged in user ko yahan nahi aane dena
const AUTH_ROUTES = ["/login", "/register"];

// 🎯 Next.js 16: Function ka naam 'proxy' hona chahiye
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // NextAuth token check
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const isLoggedIn = !!token;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Rule 1: Logged in user ko /login se /dashboard pe bhejo
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Rule 2: Protected route + not logged in → /login
  if (!isPublicRoute && !isAuthRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf)$).*)",
  ],
};