import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes, // Ensure your routes file exports adminRoutes as an array.
} from "@/routes";

// Using universal auth – it attaches authentication info to req.auth.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  // req.auth should contain the user if logged in
  const user = req.auth;
  const isLoggedIn = !!user;
  const isAdmin = user?.user.role === "ADMIN";

  // Allow static files and internal Next.js requests
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

  // If on an auth page (like /auth/login) but already logged in, redirect.
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Lock admin-only routes: if the route is an admin route and the user is not an admin, redirect.
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // For non-public routes, if not logged in, redirect to login.
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});

// import { NextResponse } from "next/server";
// import NextAuth from "next-auth";
// import authConfig from "@/auth.config";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes
// } from "@/routes";

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   // Allow static files and internal Next.js requests
//   if (
//     nextUrl.pathname.startsWith("/_next") ||
//     nextUrl.pathname.includes(".") // for file extensions like .css, .js
//   ) {
//     return NextResponse.next();
//   }

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return NextResponse.next();
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return NextResponse.next();
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     return NextResponse.redirect(new URL("/auth/login", nextUrl));
//   }

//   return NextResponse.next();
// });