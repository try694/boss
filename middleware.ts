import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  adminRoutes,
  publicRoutes,
} from "@/routes";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  // Get the token from the session using your secret.
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  // Ensure that your NextAuth config attaches a `role` property to the token.
  const isAdmin = token?.role === "ADMIN";

  
  // Allow static and internal assets.
  if (
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // If the route is admin-only but the user is not an admin, redirect them.
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
