import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/", "/login", "/register"];
const AUTH_ROUTES = ["/login", "/register"];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

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

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

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