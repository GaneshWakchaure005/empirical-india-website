import assert from "node:assert/strict";
import { productCategorySchema, emptyCategory, emptyProduct } from "../lib/product-validation";
import { rollFormingLines, modularPallets, tubesForTrolleyBags, solarStructure } from "../data/products-data";
import ProductCategory from "../models/ProductCategory";

async function test() {
  for (const category of [rollFormingLines, modularPallets, tubesForTrolleyBags, solarStructure]) {
    const parsed = productCategorySchema.parse(category);
    assert.equal(parsed.status, "draft");
    assert.equal(parsed.children.length, category.children.length);
    assert.deepEqual(parsed.children[0].specifications, category.children[0].specifications);
    await new ProductCategory(parsed).validate();
  }
  assert.equal(productCategorySchema.safeParse({ ...emptyCategory, status: "invalid" }).success, false);
  assert.equal(productCategorySchema.safeParse({ ...emptyCategory, slug: "Bad Slug" }).success, false);
  assert.equal(productCategorySchema.safeParse({ ...emptyCategory, image: "javascript:alert(1)" }).success, false);
  assert.equal(productCategorySchema.safeParse({ ...emptyCategory, image: "https://untrusted.example/image.jpg" }).success, false);
  assert.equal(productCategorySchema.safeParse({ ...emptyCategory, order: -1 }).success, false);
  assert.equal(productCategorySchema.safeParse({ ...emptyCategory, children: [emptyProduct, emptyProduct] }).success, false);
  assert.equal(productCategorySchema.safeParse({ ...emptyCategory, children: [{ ...emptyProduct, specifications: [{ label: "", value: "x" }] }] }).success, false);
  const updated = productCategorySchema.parse({ ...emptyCategory, children: [{ ...emptyProduct, imageAlt: "Actual product", description: "Updated description", gallery: ["https://res.cloudinary.com/demo/image/upload/sample.jpg"] }] });
  const document = new ProductCategory(updated);
  await document.validate();
  assert.equal(document.children[0].description, "Updated description");
  assert.equal(document.children[0].gallery.length, 1);
  assert.equal(document.children[0].imageAlt, "Actual product");
  console.log("Product validation and Mongoose schema tests passed (all four static categories, draft defaults, images, duplicate URLs, specifications, and nested updates).");
}

test().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
