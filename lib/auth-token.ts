import { jwtVerify } from "jose";
import type { JWTPayload } from "@/types/admin";

export function authSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must contain at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyAdminToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, authSecretKey(), { algorithms: ["HS256"] });
    if (typeof payload.id !== "string" || !/^[a-f0-9]{24}$/i.test(payload.id) ||
        typeof payload.email !== "string" || typeof payload.name !== "string" ||
        !["admin", "editor"].includes(String(payload.role)) || typeof payload.exp !== "number") return null;
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
