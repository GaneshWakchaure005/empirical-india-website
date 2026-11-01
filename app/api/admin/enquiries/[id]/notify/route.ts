import { NextRequest } from "next/server";
import { requireEditorOrAdmin } from "@/lib/auth";
import { objectIdSchema } from "@/lib/validation";
import { deliverEnquiryNotification } from "@/lib/enquiry-notifications";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireEditorOrAdmin(request);
    const id = objectIdSchema.parse((await params).id);
    const result = await deliverEnquiryNotification(id);
    if (result.status === "not-eligible") return errorResponse("This enquiry is already sent, currently sending, or no longer exists.", 409);
    if (result.status === "failed") return errorResponse("Email could not be sent. Check SMTP configuration and try again.", 502);
    return successResponse({ message: "Notification accepted by the mail server." });
  } catch (error) { return handleApiError(error); }
}
