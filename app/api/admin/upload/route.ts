import { NextRequest } from "next/server";
import { requireEditorOrAdmin } from "@/lib/auth";
import {
  uploadImageToCloudinary,
  validateImageFile,
  CloudinaryFolder,
} from "@/lib/cloudinary";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";


export async function POST(request: NextRequest) {
  try {
    await requireEditorOrAdmin(request);

    const formData = await request.formData();
    const file = formData.get("image") as File | null;
    const folderInput = (formData.get("folder") as string) || "general";

    if (!file) {
      return errorResponse("Image file is required", 400);
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      return errorResponse(validation.error || "Invalid image file", 400);
    }

    let folder: CloudinaryFolder = "empirical-india/general";
    if (folderInput === "blogs" || folderInput === "empirical-india/blogs") {
      folder = "empirical-india/blogs";
    } else if (
      folderInput === "news-events" ||
      folderInput === "empirical-india/news-events"
    ) {
      folder = "empirical-india/news-events";
    }

    const result = await uploadImageToCloudinary(file, folder);

    return successResponse(result, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
