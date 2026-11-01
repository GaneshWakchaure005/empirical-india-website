import mongoose from "mongoose";
import { loadEnvConfig } from "@next/env";
import ProductCategory from "../models/ProductCategory";
import { productCategorySchema } from "../lib/product-validation";
import { rollFormingLines, modularPallets, tubesForTrolleyBags, solarStructure } from "../data/products-data";
import productCards from "../data/products-data/products-lines";

async function seed() {
  loadEnvConfig(process.cwd());
  const { default: connectDB } = await import("../lib/mongodb");
  await connectDB();
  await ProductCategory.init();
  const categories = [rollFormingLines, modularPallets, tubesForTrolleyBags, solarStructure];
  const slugs = ["roll-forming-lines", "modular-metal-pallets", "trolley-bag-tubes", "solar-structures"];
  const selectedCategory = process.argv.find((argument) => argument.startsWith("--category="))?.slice("--category=".length);
  const publish = process.argv.includes("--publish");
  if (selectedCategory !== undefined && !slugs.includes(selectedCategory)) throw new Error("Unknown product category. Use an existing canonical category slug.");
  if (publish && !selectedCategory) throw new Error("Select --category=<slug> when using --publish.");
  for (const [index, category] of categories.entries()) {
    if (selectedCategory && slugs[index] !== selectedCategory) continue;
    const card = productCards.find((item) => item.slug === slugs[index]);
    const image = category.image && category.image !== "null" ? category.image : card?.image || "";
    const content = productCategorySchema.parse({ ...category, id: slugs[index], slug: slugs[index],
      image, heroImage: category.heroImage && category.heroImage !== "null" ? category.heroImage : image,
      order: index, status: "published" });
    const result = await ProductCategory.updateOne({ slug: content.slug }, { $setOnInsert: content }, { upsert: true, runValidators: true });
    await ProductCategory.updateOne({ slug: content.slug, image: "null", heroImage: "null" }, { $set: { image: content.image, heroImage: content.heroImage } });
    if (content.slug === "solar-structures") {
      await ProductCategory.updateOne({ slug: content.slug, name: "Solar Structure" }, { $set: { name: "Solar Structures" } });
    }
    if (publish) await ProductCategory.updateOne({ slug: content.slug }, { $set: { status: "published" } });
    const saved = await ProductCategory.findOne({ slug: content.slug }).select("name status children.slug").lean();
    if (!saved) throw new Error(`Could not verify imported category: ${content.slug}`);
    console.log(`${result.upsertedCount ? "Imported" : "Kept existing"}: ${saved.name} (${saved.children.length} products, ${saved.status})`);
  }
}

seed().catch((error: unknown) => { console.error(error instanceof Error ? error.message : "Product import failed"); process.exitCode = 1; })
  .finally(() => mongoose.disconnect());
