import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
export const objectIdSchema = z
  .string()
  .regex(objectIdRegex, "Must be a valid 24-character hexadecimal ObjectId");

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const categoryCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  slug: z.string().optional(),
  description: z.string().max(500).optional().default(""),
  type: z.enum(["blog", "news", "event", "general"]).default("general"),
  isActive: z.boolean().default(true),
});

export const categoryUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  slug: z.string().optional(),
  description: z.string().max(500).optional(),
  type: z.enum(["blog", "news", "event", "general"]).optional(),
  isActive: z.boolean().optional(),
});

export const blogCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z.string().optional(),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(600),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: objectIdSchema,
  tags: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
      return val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    })
    .default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().default(false),
  alt: z.string().default(""),
  metaTitle: z.string().max(100).optional().default(""),
  metaDescription: z.string().max(300).optional().default(""),
  keywords: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
      return val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    })
    .default([]),
});

export const blogUpdateSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  slug: z.string().optional(),
  excerpt: z.string().min(10).max(600).optional(),
  content: z.string().min(10).optional(),
  category: objectIdSchema.optional(),
  tags: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
      return val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    })
    .optional(),
  status: z.enum(["draft", "published"]).optional(),
  featured: z.boolean().optional(),
  alt: z.string().optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(300).optional(),
  keywords: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
      return val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    })
    .optional(),
});

export const newsEventCreateSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200),
    slug: z.string().optional(),
    type: z.enum(["news", "event"]),
    excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(600),
    content: z.string().min(10, "Content must be at least 10 characters"),
    category: objectIdSchema,
    tags: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => {
        if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
        return val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      })
      .default([]),
    status: z.enum(["draft", "published"]).default("draft"),
    featured: z.boolean().default(false),
    alt: z.string().default(""),
    eventStartDate: z.string().optional(),
    eventEndDate: z.string().optional(),
    eventLocation: z.string().optional(),
    eventRegistrationUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
    metaTitle: z.string().max(100).optional().default(""),
    metaDescription: z.string().max(300).optional().default(""),
    keywords: z
      .union([z.array(z.string()), z.string()])
      .transform((val) => {
        if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
        return val
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      })
      .default([]),
  })
  .refine(
    (data) => {
      if (data.type === "event" && data.eventStartDate) {
        return !isNaN(Date.parse(data.eventStartDate));
      }
      return true;
    },
    {
      message: "Valid start date is required for events",
      path: ["eventStartDate"],
    }
  );

export const newsEventUpdateSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  slug: z.string().optional(),
  type: z.enum(["news", "event"]).optional(),
  excerpt: z.string().min(10).max(600).optional(),
  content: z.string().min(10).optional(),
  category: objectIdSchema.optional(),
  tags: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
      return val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    })
    .optional(),
  status: z.enum(["draft", "published"]).optional(),
  featured: z.boolean().optional(),
  alt: z.string().optional(),
  eventStartDate: z.string().optional(),
  eventEndDate: z.string().optional(),
  eventLocation: z.string().optional(),
  eventRegistrationUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(300).optional(),
  keywords: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
      return val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    })
    .optional(),
});

/**
 * Extracts and normalizes form data fields from Request
 */
export async function parseFormDataFields(formData: FormData): Promise<Record<string, any>> {
  const result: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (value instanceof File) {
      // File will be handled specifically
      return;
    }

    if (value === "true") {
      result[key] = true;
    } else if (value === "false") {
      result[key] = false;
    } else {
      result[key] = value;
    }
  });

  return result;
}
