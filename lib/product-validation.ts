import { z } from "zod";

const text = z.string().trim().max(12000);
const name = z.string().trim().min(2).max(200);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens").max(150);
const image = z.union([z.literal(""), z.literal("null"), z.string().url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "https:" && ["res.cloudinary.com", "images.unsplash.com"].includes(url.hostname);
}, "Use a Cloudinary or Unsplash HTTPS image URL")]);
const list = z.array(text).max(100);
const details = z.array(z.object({ title: name, description: text })).max(100);
const seo = z.object({ title: text, description: text, keywords: list });

export const productChildSchema = z.object({
  id: slug, name, slug, shortDescription: text, description: text,
  image, imageAlt: text.default(""), gallery: z.array(image).max(30),
  highlights: list, features: details,
  specifications: z.array(z.object({ label: name, value: text })).max(100),
  applications: details, customizationOptions: list, enquiryTitle: text, seo,
});

export const productCategorySchema = z.object({
  id: slug, name, slug, tagline: text, shortDescription: text, description: text,
  image, imageAlt: text.default(""), heroImage: image, gallery: z.array(image).max(30),
  overview: text, keyBenefits: list, industries: list, manufacturingCapabilities: list,
  children: z.array(productChildSchema).max(100), pageSections: list,
  enquiryTitle: text, enquiryDescription: text, seo,
  faqs: z.array(z.object({ question: name, answer: text })).max(100).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  order: z.number().int().min(0).max(10000).default(0),
}).superRefine((value, context) => {
  const slugs = value.children.map((child) => child.slug);
  const ids = value.children.map((child) => child.id);
  if (new Set(slugs).size !== slugs.length || new Set(ids).size !== ids.length) {
    context.addIssue({ code: "custom", path: ["children"], message: "Product IDs and slugs must be unique within a category" });
  }
});

export type ManagedProductCategory = z.infer<typeof productCategorySchema>;

export const emptyProduct = {
  id: "new-product", name: "New product", slug: "new-product", shortDescription: "", description: "",
  image: "", imageAlt: "", gallery: [], highlights: [], features: [], specifications: [], applications: [],
  customizationOptions: [], enquiryTitle: "", seo: { title: "", description: "", keywords: [] },
};

export const emptyCategory: ManagedProductCategory = {
  ...emptyProduct, id: "new-category", name: "New category", slug: "new-category", tagline: "", heroImage: "",
  overview: "", keyBenefits: [], industries: [], manufacturingCapabilities: [], children: [], pageSections: [],
  enquiryDescription: "", faqs: [], status: "draft", order: 0,
};
