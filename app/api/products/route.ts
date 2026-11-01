import { getPublishedProducts } from "@/lib/products";
import { successResponse, handleApiError } from "@/lib/api-response";

export async function GET() {
  try { return successResponse(await getPublishedProducts()); }
  catch (error) { return handleApiError(error); }
}
