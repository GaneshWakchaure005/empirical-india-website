import mongoose, { Schema, type Model } from "mongoose";
import type { ManagedProductCategory } from "@/lib/product-validation";

const options = { _id: false };
const detail = new Schema({ title: { type: String, required: true }, description: String }, options);
const seo = new Schema({ title: String, description: String, keywords: [String] }, options);
const child = new Schema({
  id: { type: String, required: true }, name: { type: String, required: true },
  slug: { type: String, required: true }, shortDescription: String, description: String,
  image: String, imageAlt: String, gallery: [String], highlights: [String], features: [detail],
  specifications: [new Schema({ label: String, value: String }, options)], applications: [detail],
  customizationOptions: [String], enquiryTitle: String, seo,
}, options);
const schema = new Schema<ManagedProductCategory>({
  id: { type: String, required: true, unique: true }, name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, tagline: String, shortDescription: String,
  description: String, image: String, imageAlt: String, heroImage: String, gallery: [String],
  overview: String, keyBenefits: [String], industries: [String], manufacturingCapabilities: [String],
  children: [child], pageSections: [String], enquiryTitle: String, enquiryDescription: String, seo,
  faqs: [new Schema({ question: String, answer: String }, options)],
  status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const ProductCategory: Model<ManagedProductCategory> = mongoose.models.ProductCategory || mongoose.model("ProductCategory", schema);
export default ProductCategory;
