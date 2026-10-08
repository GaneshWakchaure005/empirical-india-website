import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { JWTPayload } from "@/types/admin";

export const AUTH_COOKIE_NAME = "admin_token";
const DEFAULT_SECRET = "empirical_india_super_secure_jwt_secret_key_2026_change_in_production";
const AUTH_SECRET = process.env.AUTH_SECRET || DEFAULT_SECRET;
const SECRET_KEY = new TextEncoder().encode(AUTH_SECRET);

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
    .sign(SECRET_KEY);
}

/**
 * Verifies JWT token and extracts payload
 */
export async function verifyAdminToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as JWTPayload;
  } catch (error) {
    return null;
  }
}

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

  return admin;
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
