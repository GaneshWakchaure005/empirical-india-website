import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/auth-token";
import { publicRouteExists } from "@/lib/public-route-exists";

const AUTH_COOKIE_NAME = "admin_token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    try {
      if (!(await publicRouteExists(pathname))) {
        return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404, headers: { "X-Robots-Tag": "noindex, follow" } });
      }
    } catch {
      return new NextResponse("Content temporarily unavailable. Please try again.", { status: 503, headers: { "Retry-After": "60", "X-Robots-Tag": "noindex" } });
    }
    return NextResponse.next();
  }

  // 0. Redirect legacy /admin/dashboard alias directly to /admin
  if (pathname === "/admin/dashboard") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 1. Check for admin token in cookie or Authorization header
  let token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    }
  }

  // 2. Verify token
  let payload: Awaited<ReturnType<typeof verifyAdminToken>> = null;
  if (token) {
    try {
      payload = await verifyAdminToken(token);
    } catch {
      // Invalid or expired token
      payload = null;
    }
  }

  // 3. If authenticated user attempts to visit /admin/login, redirect to /admin
  if (payload && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 4. Allow public auth endpoints for unauthenticated users
  if (
    pathname === "/api/admin/auth/login" ||
    pathname === "/api/admin/auth/logout" ||
    pathname === "/admin/login"
  ) {
    return NextResponse.next();
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
  matcher: ["/api/admin/:path*", "/admin/:path*", "/blogs/:path*", "/news/:path*", "/products/:path*"],
};
