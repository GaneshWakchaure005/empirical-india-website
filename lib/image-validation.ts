export const ALLOWED_IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE_BYTES = 500 * 1024; // 500 KB
export const MAX_IMAGE_SIZE_LABEL = "500 KB";

export function validateImageFile(file: Pick<File, "type" | "size"> | null): { valid: boolean; error?: string } {
  if (!file) return { valid: false, error: "Image file is required." };
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
    return { valid: false, error: "Please select a JPG, PNG or WebP image." };
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const sizeInKb = (file.size / 1024).toFixed(1);
    return {
      valid: false,
      error: `File size exceeds the 500 KB limit (${sizeInKb} KB). Please compress your image to less than 500 KB for optimal website performance.`,
    };
  }
  return { valid: true };
}
