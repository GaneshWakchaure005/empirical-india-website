import { randomUUID } from "node:crypto";
import { cloudinary } from "@/lib/cloudinary";
import { MAX_ENQUIRY_ATTACHMENT_BYTES, safeAttachmentName, validateEnquiryAttachment, validateEnquiryAttachmentBytes } from "@/lib/enquiry-attachment-validation";
import { enquiryAttachmentContent as copy } from "@/data/enquiry-attachments";

export type EnquiryAttachment = {
  attachmentName?: string;
  attachmentUrl?: string;
  attachmentPublicId?: string;
  attachmentResourceType?: "image" | "raw";
  attachmentFormat?: string;
  attachmentContentType?: string;
  attachmentSize?: number;
};

export class AttachmentError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

export function resolveEnquiryAttachment(attachment: EnquiryAttachment): EnquiryAttachment {
  if (attachment.attachmentPublicId || !attachment.attachmentUrl) return attachment;
  // Recover records written by the previous cached schema. Accept only this
  // account's Cloudinary folder; never turn an arbitrary stored URL into a fetch.
  try {
    const url = new URL(attachment.attachmentUrl);
    if (url.protocol !== "https:" || url.hostname !== "res.cloudinary.com" || url.username || url.password || url.port) return attachment;
    const [cloudName, resourceType, deliveryType, ...segments] = url.pathname.slice(1).split("/");
    if (cloudName !== cloudinary.config().cloud_name || !["image", "raw"].includes(resourceType) || deliveryType !== "authenticated") return attachment;
    if (/^s--[^/]+--$/.test(segments[0])) segments.shift();
    if (/^v\d+$/.test(segments[0])) segments.shift();
    const path = segments.map(decodeURIComponent).join("/");
    if (!/^empirical-india\/enquiries\/[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(path)) return attachment;
    const extension = path.split(".").pop()!.toLowerCase();
    const format = resourceType === "image" ? extension : "";
    return { ...attachment, attachmentName: attachment.attachmentName, attachmentUrl: attachment.attachmentUrl,
      attachmentPublicId: resourceType === "image" ? path.slice(0, -(extension.length + 1)) : path,
      attachmentResourceType: resourceType as "image" | "raw", attachmentFormat: format };
  } catch { return attachment; }
}

export async function uploadEnquiryAttachment(file: File): Promise<EnquiryAttachment> {
  const fileValidation = validateEnquiryAttachment(file);
  if (!fileValidation.valid) throw new AttachmentError(fileValidation.error, 422);
  const bytes = Buffer.from(await file.arrayBuffer());
  const validation = validateEnquiryAttachmentBytes(file, bytes);
  if (!validation.valid) throw new AttachmentError(validation.error);
  // RFQ documents must retain their original bytes, including image metadata.
  // Raw storage avoids Cloudinary image processing and also supports CAD/PDF files.
  const publicId = `empirical-india/enquiries/${randomUUID()}.${validation.extension}`;
  try {
    const result = await new Promise<{ secure_url: string; public_id: string; format?: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({
        public_id: publicId, resource_type: "raw", type: "authenticated",
        overwrite: false, timeout: 30000,
      }, (error, uploaded) => {
        if (error || !uploaded) reject(new Error("Attachment upload failed"));
        else resolve(uploaded);
      });
      stream.on("error", reject);
      stream.end(bytes);
    });
    // Cloudinary may return a permanently signed delivery URL for authenticated assets.
    // Persist the unsigned URL; issue short-lived access only when needed.
    const storageUrl = result.secure_url.replace(/\/s--[^/]+--\//, "/");
    return { attachmentName: safeAttachmentName(file.name), attachmentUrl: storageUrl,
      attachmentPublicId: result.public_id, attachmentResourceType: "raw",
      attachmentFormat: "",
      attachmentContentType: validation.contentType, attachmentSize: bytes.length };
  } catch {
    throw new AttachmentError(copy.uploadFailed, 502);
  }
}

export async function deleteEnquiryAttachment(attachment: EnquiryAttachment) {
  attachment = resolveEnquiryAttachment(attachment);
  if (!attachment.attachmentPublicId) return;
  await cloudinary.uploader.destroy(attachment.attachmentPublicId, {
    resource_type: attachment.attachmentResourceType || "image", type: "authenticated", invalidate: true,
  });
}

export function enquiryAttachmentDownloadUrl(attachment: EnquiryAttachment, lifetimeSeconds = 60) {
  attachment = resolveEnquiryAttachment(attachment);
  if (!attachment.attachmentPublicId?.startsWith("empirical-india/enquiries/") ||
      !["image", "raw"].includes(attachment.attachmentResourceType || "")) {
    throw new AttachmentError("Attachment is unavailable", 404);
  }
  // Sign from trusted metadata, never fetch a client-supplied URL.
  return cloudinary.utils.private_download_url(attachment.attachmentPublicId, attachment.attachmentFormat || "", {
    resource_type: attachment.attachmentResourceType, type: "authenticated",
    expires_at: Math.floor(Date.now() / 1000) + lifetimeSeconds,
  });
}

export async function readLimitedBody(stream: ReadableStream<Uint8Array> | null, limit: number): Promise<Buffer> {
  if (!stream) return Buffer.alloc(0);
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new AttachmentError(copy.tooLarge, 413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return Buffer.concat(chunks, size);
}

export async function retrieveEnquiryAttachment(attachment: EnquiryAttachment) {
  try {
    const response = await fetch(enquiryAttachmentDownloadUrl(attachment), {
      cache: "no-store", signal: AbortSignal.timeout(20000), redirect: "error",
    });
    if (!response.ok) throw new Error("Attachment download failed");
    const bytes = await readLimitedBody(response.body, MAX_ENQUIRY_ATTACHMENT_BYTES);
    const validation = validateEnquiryAttachmentBytes({ name: attachment.attachmentName || "", size: bytes.length }, bytes);
    if (!validation.valid) throw new Error("Attachment validation failed");
    return { content: bytes, contentType: validation.contentType,
      filename: safeAttachmentName(attachment.attachmentName || "attachment") };
  } catch {
    throw new AttachmentError(copy.downloadFailed, 502);
  }
}
