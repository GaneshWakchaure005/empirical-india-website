import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { loadEnvConfig } from "@next/env";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

async function main() {
  loadEnvConfig(process.cwd());
  const { default: connectDB } = await import("../lib/mongodb");
  const { default: Admin } = await import("../models/Admin");
  const { signAdminToken, hashPassword } = await import("../lib/auth");
  const { adminPagination, literalSearch } = await import("../lib/admin-query");
  const { newsEventCreateSchema } = await import("../lib/validation");
  const { verifyAdminToken } = await import("../lib/auth-token");
  const { SignJWT } = await import("jose");
  const { proxy } = await import("../proxy");
  const routes = ["auth/login", "auth/logout", "auth/me", "dashboard", "blogs", "blogs/[id]",
    "categories", "categories/[id]", "news-events", "news-events/[id]", "products", "products/[id]",
    "enquiries", "enquiries/[id]", "enquiries/[id]/notify", "enquiries/[id]/attachment", "upload"];
  let checks = 0;
  const id = new mongoose.Types.ObjectId().toString();
  const context = { params: Promise.resolve({ id }) };
  function request(path: string, method: string, token?: string, body?: unknown) {
    return new NextRequest(`http://localhost/api/admin/${path}`, { method,
      headers: { ...(token ? { authorization: `Bearer ${token}` } : {}), "content-type": "application/json" },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}) });
  }
  async function expect(response: Response, status: number) {
    assert.equal(response.status, status, await response.text()); checks++;
  }
  type Handler = (request: NextRequest, context?: { params: Promise<{ id: string }> }) => Promise<Response>;
  const handlers: Record<string, Record<string, Handler>> = {};
  for (const path of routes) {
    const route = await import(`../app/api/admin/${path}/route`);
    handlers[path] = route;
    if (path === "auth/login" || path === "auth/logout") continue;
    for (const method of ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
      if (route[method]) {
        await expect(await route[method](request(path, method), context), 401);
        await expect(await proxy(request(path, method, "invalid.jwt.token")), 401);
      }
    }
  }
  await expect(await handlers["auth/login"].POST(new NextRequest("http://localhost/api/admin/auth/login", { method: "POST", body: "{" })), 400);
  await expect(await handlers["auth/login"].POST(request("auth/login", "POST", undefined, {})), 422);
  await expect(await handlers["auth/logout"].POST(request("auth/logout", "POST")), 200);
  for (const value of ["abc", "NaN", "0", "-1", "1.5", "101"]) {
    assert.equal(adminPaginationSafe(value), false); checks++;
  }
  function adminPaginationSafe(value: string) {
    try { adminPagination(new URLSearchParams({ limit: value })); return true; } catch { return false; }
  }
  assert.equal(literalSearch("[a.*"), "\\[a\\.\\*"); checks++;
  const event = { title: "Test event", type: "event", excerpt: "Test event excerpt", content: "Test event content", category: id };
  assert.equal(newsEventCreateSchema.safeParse(event).success, false); checks++;
  assert.equal(newsEventCreateSchema.safeParse({ ...event, eventStartDate: "2026-11-01", eventEndDate: "bad" }).success, false); checks++;
  const malformed = await new SignJWT({ role: "admin" }).setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h").sign(new TextEncoder().encode(process.env.AUTH_SECRET));
  assert.equal(await verifyAdminToken(malformed), null); checks++;

  await connectDB();
  const password = randomUUID();
  const account = await Admin.create({ name: "Temporary API test", email: `api-test-${randomUUID()}@example.invalid`,
    password: await hashPassword(password), role: "admin" });
  const { default: Category } = await import("../models/Category");
  const { default: Blog } = await import("../models/Blog");
  const { default: NewsEvent } = await import("../models/NewsEvent");
  const { default: ProductCategory } = await import("../models/ProductCategory");
  const { default: Enquiry } = await import("../models/Enquiry");
  const { emptyCategory, emptyProduct } = await import("../lib/product-validation");
  const { cloudinary } = await import("../lib/cloudinary");
  const originalDestroy = cloudinary.uploader.destroy;
  cloudinary.uploader.destroy = (async () => ({ result: "ok" })) as typeof originalDestroy;
  const marker = `api-test-${randomUUID()}`;
  type CleanupModel = { deleteOne(filter: { _id: string }): unknown };
  const created: { model: CleanupModel; id: string }[] = [];
  try {
    const token = await signAdminToken({ id: account._id.toString(), email: account.email, role: "admin", name: account.name });
    const login = await handlers["auth/login"].POST(request("auth/login", "POST", undefined, { email: account.email, password }));
    assert.equal(login.status, 200); assert.match(login.headers.get("set-cookie") || "", /HttpOnly/i); checks++;
    await expect(await handlers["auth/login"].POST(request("auth/login", "POST", undefined, { email: account.email, password: "wrong-password" })), 401);
    for (const path of ["auth/me", "dashboard", "blogs", "news-events", "categories", "products", "enquiries"]) {
      await expect(await handlers[path].GET(request(path, "GET", token)), 200);
    }
    for (const path of ["blogs", "news-events", "enquiries"]) {
      await expect(await handlers[path].GET(request(`${path}?page=abc`, "GET", token)), 422);
      await expect(await handlers[path].GET(request(`${path}?search=%5B`, "GET", token)), 200);
    }
    for (const path of ["blogs/[id]", "news-events/[id]", "categories/[id]", "products/[id]", "enquiries/[id]"]) {
      await expect(await handlers[path].GET(request(path, "GET", token), context), 404);
      await expect(await handlers[path].GET(request(path, "GET", token), { params: Promise.resolve({ id: "bad" }) }), 422);
    }
    for (const path of ["blogs", "news-events", "categories", "products"]) {
      await expect(await handlers[path].POST(request(path, "POST", token, {})), 422);
    }
    async function create(path: string, data: unknown, model: CleanupModel) {
      const response = await handlers[path].POST(request(path, "POST", token, data));
      const body = await response.json();
      assert.equal(response.status, 201, JSON.stringify(body)); checks++;
      const recordId = String(body.data._id);
      created.push({ model, id: recordId });
      return { params: Promise.resolve({ id: recordId }) };
    }
    const categoryContext = await create("categories", { name: marker, type: "general" }, Category);
    const categoryId = (await categoryContext.params).id;
    await expect(await handlers["categories/[id]"].PUT(request("categories/test", "PUT", token, { description: "Updated by API regression test" }), categoryContext), 200);
    const article = { title: marker, excerpt: "Temporary API regression test", content: "Temporary API regression content", category: categoryId,
      featuredImage: { url: "https://example.invalid/test.jpg", publicId: marker, alt: "Temporary test" } };
    for (const [path, model] of [["blogs", Blog], ["news-events", NewsEvent]] as const) {
      const ctx = await create(path, { ...article, ...(path === "news-events" ? { type: "news" } : {}) }, model);
      await expect(await handlers[`${path}/[id]`].PUT(request(path, "PUT", token, { status: "published", title: `${marker} updated` }), ctx), 200);
      await expect(await handlers["categories/[id]"].DELETE(request("categories/test", "DELETE", token), categoryContext), 409);
      await expect(await handlers[`${path}/[id]`].DELETE(request(path, "DELETE", token), ctx), 200);
    }
    await expect(await handlers["categories/[id]"].DELETE(request("categories/test", "DELETE", token), categoryContext), 200);
    const product = { ...emptyCategory, id: marker, slug: marker, name: "Temporary API test", children: [{ ...emptyProduct }] };
    const productContext = await create("products", product, ProductCategory);
    await expect(await handlers["products/[id]"].PUT(request("products/test", "PUT", token, { ...product, description: "Updated test description" }), productContext), 200);
    await expect(await handlers["products/[id]"].PUT(request("products/test", "PUT", token, { ...product, slug: `${marker}-changed` }), productContext), 409);
    await expect(await handlers["products/[id]"].DELETE(request("products/test", "DELETE", token), productContext), 200);
    const enquiry = await Enquiry.create({ referenceId: marker, businessLine: "test", fullName: "API test", companyName: "Temporary test",
      workEmail: "test@example.invalid", phone: "Test", location: "Test", requirement: "Temporary API regression test" });
    created.push({ model: Enquiry, id: enquiry._id.toString() });
    const enquiryContext = { params: Promise.resolve({ id: enquiry._id.toString() }) };
    await expect(await handlers["enquiries/[id]"].PATCH(request("enquiries/test", "PATCH", token, { status: "in-review", notes: "Test update" }), enquiryContext), 200);
    await expect(await handlers["enquiries/[id]"].DELETE(request("enquiries/test", "DELETE", token), enquiryContext), 200);
    await expect(await handlers.upload.POST(request("upload", "POST", token)), 400);
    await Admin.updateOne({ _id: account._id }, { role: "editor" });
    await expect(await handlers["enquiries/[id]"].DELETE(request("enquiries/test", "DELETE", token), context), 403);
    await expect(await handlers["categories/[id]"].DELETE(request("categories/test", "DELETE", token), context), 403);
    await Admin.updateOne({ _id: account._id }, { isActive: false });
    await expect(await handlers.dashboard.GET(request("dashboard", "GET", token)), 401);
    await expect(await handlers["auth/login"].POST(request("auth/login", "POST", undefined, { email: account.email, password })), 403);
  } finally {
    cloudinary.uploader.destroy = originalDestroy;
    for (const record of created) await record.model.deleteOne({ _id: record.id });
    await Admin.deleteOne({ _id: account._id });
  }
  console.log(`Admin API: ${checks} checks passed. Temporary account removed; no emails sent or media uploaded.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => mongoose.disconnect());
