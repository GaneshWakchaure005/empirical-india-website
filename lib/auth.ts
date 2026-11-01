import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { authSecretKey, verifyAdminToken } from "@/lib/auth-token";
export { verifyAdminToken } from "@/lib/auth-token";
import { JWTPayload } from "@/types/admin";

export const AUTH_COOKIE_NAME = "admin_token";

export const COOKIE_OPTIONS = {
  name: AUTH_COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

/**
 * Hash plain text password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain text password with hashed password
 */
export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

/**
 * Generates signed JWT token using jose
 */
export async function signAdminToken(payload: Omit<JWTPayload, "iat" | "exp">): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(authSecretKey());
}

/**
 * Verifies JWT token and extracts payload
 */

/**
 * Extracts and verifies admin from NextRequest (via cookie or Bearer token)
 */
export async function getAuthenticatedAdmin(
  request: NextRequest
): Promise<JWTPayload | null> {
  // 1. Check HTTP-only cookie
  let token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  // 2. Fallback to Authorization Bearer header
  if (!token) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    }
  }

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

/**
 * Ensures user is authenticated with "admin" or "editor" role
 */
export async function requireEditorOrAdmin(
  request: NextRequest
): Promise<JWTPayload> {
  const admin = await getAuthenticatedAdmin(request);
  if (!admin) {
    const error = new Error("Unauthorized: Please log in to access this resource.");
    (error as any).status = 401;
    throw error;
  }

  if (admin.role !== "admin" && admin.role !== "editor") {
    const error = new Error("Forbidden: Insufficient privileges.");
    (error as any).status = 403;
    throw error;
  }

  // Re-check the account so disabling a user or changing their role takes effect immediately.
  const { default: connectDB } = await import("@/lib/mongodb");
  const { default: Admin } = await import("@/models/Admin");
  await connectDB();
  const account = await Admin.findById(admin.id).lean();
  if (!account || !account.isActive) {
    throw Object.assign(new Error("Unauthorized: Account is unavailable."), { status: 401 });
  }
  if (account.role !== "admin" && account.role !== "editor") {
    throw Object.assign(new Error("Forbidden: Insufficient privileges."), { status: 403 });
  }
  return { ...admin, role: account.role, email: account.email, name: account.name };
}

/**
 * Ensures user is authenticated with "admin" role
 */
export async function requireAdmin(request: NextRequest): Promise<JWTPayload> {
  const admin = await requireEditorOrAdmin(request);
  if (admin.role !== "admin") {
    const error = new Error("Forbidden: Admin privileges required.");
    (error as any).status = 403;
    throw error;
  }
  return admin;
}
