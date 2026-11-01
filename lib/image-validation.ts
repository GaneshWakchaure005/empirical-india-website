export const ALLOWED_IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

export function validateImageFile(file: Pick<File, "type" | "size"> | null): { valid: boolean; error?: string } {
  if (!file) return { valid: false, error: "Image file is required." };
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
    return { valid: false, error: "Please select a JPG, PNG or WebP image." };
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return { valid: false, error: `File size exceeds the 2MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB). Choose a smaller image.` };
  }
  return { valid: true };
}
