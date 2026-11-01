import { NextRequest } from "next/server";
import { requireEditorOrAdmin } from "@/lib/auth";
import { objectIdSchema } from "@/lib/validation";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { AttachmentError, resolveEnquiryAttachment, retrieveEnquiryAttachment } from "@/lib/enquiry-attachments";
import { errorResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireEditorOrAdmin(request);
    const id = objectIdSchema.parse((await params).id);
    await connectDB();
    const enquiry = await Enquiry.findById(id).lean();
    if (!enquiry || !resolveEnquiryAttachment(enquiry).attachmentPublicId) return errorResponse("Attachment not found", 404);
    const attachment = await retrieveEnquiryAttachment(enquiry);
    const inline = attachment.contentType.startsWith("image/") && request.nextUrl.searchParams.get("download") !== "true";
    const filename = encodeURIComponent(attachment.filename).replace(/['()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
    return new Response(new Uint8Array(attachment.content), {
      headers: {
        "content-type": attachment.contentType,
        "content-length": String(attachment.content.length),
        "content-disposition": `${inline ? "inline" : "attachment"}; filename="attachment"; filename*=UTF-8''${filename}`,
        "cache-control": "private, no-store",
        "x-content-type-options": "nosniff",
        "content-security-policy": "default-src 'none'; sandbox",
      },
    });
  } catch (error) {
    if (error instanceof AttachmentError) return errorResponse(error.message, error.status);
    return handleApiError(error);
  }
}
