import slugify from "slugify";
import mongoose from "mongoose";

/**
 * Normalizes text to a clean URL-safe slug.
 */
export function generateBaseSlug(text: string): string {
  if (!text) return "";
  const cleaned = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
  return cleaned || "post";
}

/**
 * Finds a unique slug in the provided Mongoose model by checking for conflicts
 * and appending -2, -3, etc. if required.
 *
 * @param model Mongoose model to check against
 * @param title Title or target text to base the slug on
 * @param currentId Optional ID of the existing document being updated (to ignore self-conflicts)
 * @param existingSlug Optional existing slug to keep unchanged if title hasn't changed
 */
export async function generateUniqueSlug(
  model: mongoose.Model<any>,
  title: string,
  currentId?: string | mongoose.Types.ObjectId,
  existingSlug?: string
): Promise<string> {
  const baseSlug = generateBaseSlug(title);

  // If we already have a slug that matches the generated base, and it's the current doc, keep it
  if (existingSlug && (existingSlug === baseSlug || existingSlug.startsWith(`${baseSlug}-`))) {
    const existingConflict = await model.findOne({
      slug: existingSlug,
      ...(currentId ? { _id: { $ne: currentId } } : {}),
    });
    if (!existingConflict) {
      return existingSlug;
    }
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query: any = { slug };
    if (currentId) {
      query._id = { $ne: currentId };
    }

    const exists = await model.findOne(query).select("_id").lean();
    if (!exists) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}
