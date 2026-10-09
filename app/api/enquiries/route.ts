import { NextRequest } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";

const enquirySubmitSchema = z.object({
  businessLine: z.string().default("general"),
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(120),
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(150),
  workEmail: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number must be at least 6 characters").max(30),
  location: z.string().min(2, "Location is required").max(100),
  requirement: z.string().min(10, "Requirement must be at least 10 characters").max(4000),
  attachmentName: z.string().optional(),
  attachmentUrl: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = enquirySubmitSchema.parse(body);

    await connectDB();

    // Generate unique RFQ reference ID
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const referenceId = `EI-RFQ-${randomDigits}`;

    const enquiry = await Enquiry.create({
      referenceId,
      businessLine: validated.businessLine,
      fullName: validated.fullName,
      companyName: validated.companyName,
      workEmail: validated.workEmail.toLowerCase(),
      phone: validated.phone,
      location: validated.location,
      requirement: validated.requirement,
      attachmentName: validated.attachmentName,
      attachmentUrl: validated.attachmentUrl,
      status: "new",
    });

    return successResponse(
      {
        referenceId: enquiry.referenceId,
        id: enquiry._id.toString(),
        message: "Enquiry submitted successfully",
      },
      201
    );
  } catch (error) {
    return handleApiError(error);
  }
}
