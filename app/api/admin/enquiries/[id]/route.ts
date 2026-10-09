import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { requireEditorOrAdmin, requireAdmin } from "@/lib/auth";
import { objectIdSchema } from "@/lib/validation";
import {
  successResponse,
  errorResponse,
  handleApiError,
} from "@/lib/api-response";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireEditorOrAdmin(request);
    const { id } = await params;
    objectIdSchema.parse(id);

    await connectDB();
    const enquiry = await Enquiry.findById(id).lean();

    if (!enquiry) {
      return errorResponse("Enquiry not found", 404);
    }

    return successResponse(enquiry);
  } catch (error) {
    return handleApiError(error);
  }
}

const updateEnquirySchema = z.object({
  status: z.enum(["new", "in-review", "responded", "archived"]).optional(),
  notes: z.string().max(2000).optional(),
});

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await requireEditorOrAdmin(request);
    const { id } = await params;
    objectIdSchema.parse(id);

    const body = await request.json();
    const validated = updateEnquirySchema.parse(body);

    await connectDB();
    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return errorResponse("Enquiry not found", 404);
    }

    if (validated.status !== undefined) enquiry.status = validated.status;
    if (validated.notes !== undefined) enquiry.notes = validated.notes;

    await enquiry.save();

    return successResponse(enquiry);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    objectIdSchema.parse(id);

    await connectDB();
    const deleted = await Enquiry.findByIdAndDelete(id);

    if (!deleted) {
      return errorResponse("Enquiry not found", 404);
    }

    return successResponse({
      message: "Enquiry deleted successfully",
      id,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
