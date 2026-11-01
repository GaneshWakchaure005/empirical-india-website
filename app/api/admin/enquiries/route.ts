import { adminPagination, literalSearch } from "@/lib/admin-query";
import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { requireEditorOrAdmin } from "@/lib/auth";
import { paginatedResponse, handleApiError } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await requireEditorOrAdmin(request);
    await connectDB();

    const { searchParams } = new URL(request.url);
    const { page, limit } = adminPagination(searchParams, 15);
    const status = searchParams.get("status")?.trim();
    const businessLine = searchParams.get("businessLine")?.trim();
    const search = searchParams.get("search")?.trim();

    const query: any = {};

    if (status && ["new", "in-review", "responded", "archived"].includes(status)) {
      query.status = status;
    }

    if (businessLine && businessLine !== "all") {
      query.businessLine = businessLine;
    }

    if (search) {
      query.$or = [
        { referenceId: { $regex: literalSearch(search), $options: "i" } },
        { fullName: { $regex: literalSearch(search), $options: "i" } },
        { companyName: { $regex: literalSearch(search), $options: "i" } },
        { workEmail: { $regex: literalSearch(search), $options: "i" } },
        { location: { $regex: literalSearch(search), $options: "i" } },
        { requirement: { $regex: literalSearch(search), $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [enquiries, total] = await Promise.all([
      Enquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Enquiry.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return paginatedResponse(enquiries, {
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
