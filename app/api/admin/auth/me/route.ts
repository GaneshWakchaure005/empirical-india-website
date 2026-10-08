import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { requireEditorOrAdmin } from "@/lib/auth";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";


export async function GET(request: NextRequest) {
  try {
    const adminPayload = await requireEditorOrAdmin(request);

    await connectDB();
    const admin = await Admin.findById(adminPayload.id).select("-password");

    if (!admin) {
      return errorResponse("Admin user not found", 404);
    }

    if (!admin.isActive) {
      return errorResponse("Account is inactive", 403);
    }

    return successResponse({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
      isActive: admin.isActive,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
