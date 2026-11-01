import assert from "node:assert/strict";
import { loadEnvConfig } from "@next/env";
import { randomUUID } from "node:crypto";
import { emptyCategory, emptyProduct } from "../lib/product-validation";

async function test() {
  loadEnvConfig(process.cwd());
  const { signAdminToken } = await import("../lib/auth");
  const token = await signAdminToken({ id: "000000000000000000000001", email: "product-test@example.invalid", name: "Product test", role: "admin" });
  const base = process.env.PRODUCT_TEST_URL || "http://127.0.0.1:3000";
  const slug = `test-product-${randomUUID()}`;
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  let recordId = "";
  let uploadedPublicId = "";
  async function request(path: string, init?: RequestInit) {
    const response = await fetch(`${base}${path}`, init);
    return { response, body: await response.json() };
  }
  try {
    const catalogue = await request("/api/products");
    assert.equal(catalogue.response.status, 200);
    for (const category of catalogue.body.data) {
      assert.equal(category.status, "published");
      const categoryPage = await fetch(`${base}/products/${category.slug}`);
      assert.equal(categoryPage.status, 200);
      for (const child of category.children) {
        const childPage = await fetch(`${base}/products/${category.slug}/${child.slug}`);
        assert.equal(childPage.status, 200);
        assert.ok((await childPage.text()).includes(child.name), `Missing product content: ${child.slug}`);
      }
    }
    console.log(`Existing catalogue routes passed: ${catalogue.body.data.length} published categories and ${catalogue.body.data.reduce((total: number, category: { children: unknown[] }) => total + category.children.length, 0)} products.`);
    const anonymous = await request("/api/admin/products");
    assert.equal(anonymous.response.status, 401);
    const forbiddenWrite = await request("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
    assert.equal(forbiddenWrite.response.status, 401);
    const invalid = await request("/api/admin/products", { method: "POST", headers, body: JSON.stringify({ name: "Invalid" }) });
    assert.equal(invalid.response.status, 422);
    const data = { ...emptyCategory, id: slug, slug, name: "Temporary CRUD test", children: [{ ...emptyProduct, description: "Initial test description" }] };
    const created = await request("/api/admin/products", { method: "POST", headers, body: JSON.stringify(data) });
    assert.equal(created.response.status, 201);
    recordId = created.body.data._id;
    assert.ok(recordId);
    const draftPublic = await request("/api/products");
    assert.ok(!draftPublic.body.data.some((category: { slug: string }) => category.slug === slug));
    const duplicate = await request("/api/admin/products", { method: "POST", headers, body: JSON.stringify(data) });
    assert.equal(duplicate.response.status, 409);
    const fetched = await request(`/api/admin/products/${recordId}`, { headers });
    assert.equal(fetched.body.data.children[0].description, "Initial test description");
    const badImage = new FormData(); badImage.set("image", new File(["not an image"], "test.txt", { type: "text/plain" }));
    const rejectedUpload = await request("/api/admin/upload", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: badImage });
    assert.equal(rejectedUpload.response.status, 400);
    let image = "https://res.cloudinary.com/demo/image/upload/sample.jpg";
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      const form = new FormData();
      form.set("image", new File([Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a8gAAAABJRU5ErkJggg==", "base64")], "product-crud-test.png", { type: "image/png" }));
      form.set("folder", "products");
      const uploaded = await request("/api/admin/upload", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
      assert.equal(uploaded.response.status, 201, uploaded.body.message);
      uploadedPublicId = uploaded.body.data.publicId;
      image = uploaded.body.data.secureUrl;
      console.log("Cloudinary image upload passed.");
    } else console.log("Cloudinary credentials absent: live upload skipped; invalid upload rejection tested.");
    const published = { ...data, status: "published", description: "Updated category text", image,
      children: [{ ...data.children[0], name: "Updated test product", description: "Updated product description", image,
        features: [{ title: "Test feature", description: "Updated feature text" }], gallery: [image],
        specifications: [{ label: "Test requirement", value: "Customer defined" }] }] };
    const update = await request(`/api/admin/products/${recordId}`, { method: "PUT", headers, body: JSON.stringify(published) });
    assert.equal(update.response.status, 200);
    const visible = await request("/api/products");
    const publicRecord = visible.body.data.find((category: { slug: string }) => category.slug === slug);
    assert.equal(publicRecord.children[0].description, "Updated product description");
    assert.equal(publicRecord.image, image);
    const page = await fetch(`${base}/products/${slug}`);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /Updated category text/);
    const detailPage = await fetch(`${base}/products/${slug}/new-product`);
    assert.equal(detailPage.status, 200);
    assert.match(await detailPage.text(), /Updated product description/);
    const renamed = await request(`/api/admin/products/${recordId}`, { method: "PUT", headers, body: JSON.stringify({ ...published, slug: `${slug}-renamed` }) });
    assert.equal(renamed.response.status, 409);
    const unpublished = await request(`/api/admin/products/${recordId}`, { method: "PUT", headers, body: JSON.stringify({ ...published, status: "draft" }) });
    assert.equal(unpublished.response.status, 200);
    const hidden = await request("/api/products");
    assert.ok(!hidden.body.data.some((category: { slug: string }) => category.slug === slug));
    const removedChild = await request(`/api/admin/products/${recordId}`, { method: "PUT", headers, body: JSON.stringify({ ...published, image: "", gallery: [], children: [] }) });
    assert.equal(removedChild.response.status, 200);
    assert.equal(removedChild.body.data.children.length, 0);
    assert.equal(removedChild.body.data.image, "");
    const deleted = await request(`/api/admin/products/${recordId}`, { method: "DELETE", headers });
    assert.equal(deleted.response.status, 200);
    const missing = await request(`/api/admin/products/${recordId}`, { headers });
    assert.equal(missing.response.status, 404);
    recordId = "";
    const finalPublic = await request("/api/products");
    assert.ok(!finalPublic.body.data.some((category: { slug: string }) => category.slug === slug));
    console.log("HTTP product CRUD passed: auth, validation, duplicate rejection, draft visibility, nested text/images, publication, category/detail rendering, stable URLs, child/image removal and deletion.");
  } finally {
    if (recordId) {
      const cleanup = await fetch(`${base}/api/admin/products/${recordId}`, { method: "DELETE", headers });
      assert.ok(cleanup.ok, "Temporary test category cleanup failed");
    }
    if (uploadedPublicId) {
      const { deleteImageFromCloudinary } = await import("../lib/cloudinary");
      assert.ok(await deleteImageFromCloudinary(uploadedPublicId), "Temporary Cloudinary image cleanup failed");
    }
  }
}

test().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
