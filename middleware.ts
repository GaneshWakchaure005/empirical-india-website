import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const AUTH_COOKIE_NAME = "admin_token";
const DEFAULT_SECRET = "empirical_india_super_secure_jwt_secret_key_2026_change_in_production";
const AUTH_SECRET = process.env.AUTH_SECRET || DEFAULT_SECRET;
const SECRET_KEY = new TextEncoder().encode(AUTH_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public auth endpoints
  if (
    pathname === "/api/admin/auth/login" ||
    pathname === "/admin/login"
  ) {
    return NextResponse.next();
  }

  // 2. Check for admin token in cookie or Authorization header
  let token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    }
  }

  // 3. Verify token
  let payload: any = null;
  if (token) {
    try {
      const verified = await jwtVerify(token, SECRET_KEY);
      payload = verified.payload;
    } catch (err) {
      // Invalid or expired token
      payload = null;
    }
  }

  // 4. Handle unauthenticated requests
  if (!payload) {
    // API routes return 401 JSON
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Please provide a valid authentication token.",
        },
        { status: 401 }
      );
    }

    // Admin UI routes redirect to login
    if (pathname.startsWith("/admin")) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 5. User is authenticated -> Forward with claims headers
  const requestHeaders = new Headers(request.headers);
  if (payload) {
    requestHeaders.set("x-admin-id", String(payload.id || ""));
    requestHeaders.set("x-admin-email", String(payload.email || ""));
    requestHeaders.set("x-admin-role", String(payload.role || ""));
    requestHeaders.set("x-admin-name", String(payload.name || ""));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/api/admin/:path*", "/admin/:path*"],
};
