import { z } from "zod";

export function adminPagination(params: URLSearchParams, defaultLimit = 10) {
  const integer = z.string().regex(/^\d+$/, "Must be a positive integer")
    .transform(Number).pipe(z.number().int().min(1).max(1_000_000));
  return z.object({ page: integer, limit: integer.pipe(z.number().max(100)) }).parse({
    page: params.get("page") ?? "1",
    limit: params.get("limit") ?? String(defaultLimit),
  });
}

export function literalSearch(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
