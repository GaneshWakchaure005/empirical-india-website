import { enquiryAttachmentContent as copy } from "@/data/enquiry-attachments";

export const MAX_ENQUIRY_ATTACHMENT_BYTES = 15 * 1024 * 1024;
export const ENQUIRY_ATTACHMENT_ACCEPT = ".pdf,.dwg,.dxf,.stp,.step,.png,.jpg,.jpeg,.webp";

const formats: Record<string, { contentType: string; resourceType: "image" | "raw" }> = {
  png: { contentType: "image/png", resourceType: "image" },
  jpg: { contentType: "image/jpeg", resourceType: "image" },
  jpeg: { contentType: "image/jpeg", resourceType: "image" },
  webp: { contentType: "image/webp", resourceType: "image" },
  pdf: { contentType: "application/pdf", resourceType: "raw" },
  dwg: { contentType: "application/acad", resourceType: "raw" },
  dxf: { contentType: "application/dxf", resourceType: "raw" },
  stp: { contentType: "application/step", resourceType: "raw" },
  step: { contentType: "application/step", resourceType: "raw" },
};

export function validateEnquiryAttachment(file: Pick<File, "name" | "size">) {
  if (!file.size) return { valid: false as const, error: copy.empty };
  if (file.size > MAX_ENQUIRY_ATTACHMENT_BYTES) return { valid: false as const, error: copy.tooLarge };
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  if (!formats[extension]) return { valid: false as const, error: copy.unsupported };
  return { valid: true as const, extension, ...formats[extension] };
}

// Check signatures as well as extensions; browser-supplied MIME types are untrusted.
export function validateEnquiryAttachmentBytes(file: Pick<File, "name" | "size">, bytes: Uint8Array) {
  const result = validateEnquiryAttachment(file);
  if (!result.valid) return result;
  const header = new TextDecoder().decode(bytes.subarray(0, 4096));
  const starts = (...signature: number[]) => signature.every((value, index) => bytes[index] === value);
  let valid = false;
  switch (result.extension) {
    case "png": valid = starts(137, 80, 78, 71, 13, 10, 26, 10); break;
    case "jpg": case "jpeg": valid = starts(255, 216, 255); break;
    case "webp": valid = header.startsWith("RIFF") && header.slice(8, 12) === "WEBP"; break;
    case "pdf": valid = header.startsWith("%PDF-"); break;
    case "dwg": valid = /^AC10\d{2}/.test(header); break;
    case "dxf": valid = header.startsWith("AutoCAD Binary DXF") || /(?:^|\r?\n)\s*0\s*\r?\nSECTION\s*\r?\n/.test(header); break;
    case "stp": case "step": valid = /^\s*ISO-10303-21;/.test(header); break;
  }
  return valid && bytes.length === file.size ? result : { valid: false as const, error: copy.invalid };
}

export function safeAttachmentName(name: string) {
  return name.split(/[\\/]/).pop()!.replace(/[\u0000-\u001f\u007f"<>]/g, "_").slice(-180) || "attachment";
}
