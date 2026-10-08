import { NextResponse } from "next/server";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { ApiResponse, ApiPaginationResponse, ApiPagination } from "@/types/api";

export function successResponse<T>(data: T, status = 200) {
  const body: ApiResponse<T> = {
    success: true,
    data,
  };
  return NextResponse.json(body, { status });
}

export function paginatedResponse<T>(
  data: T[],
  pagination: ApiPagination,
  status = 200
) {
  const body: ApiPaginationResponse<T> = {
    success: true,
    data,
    pagination,
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(
  message: string,
  status = 500,
  errors?: Record<string, any>
) {
  const body: ApiResponse = {
    success: false,
    message,
    ...(errors ? { errors } : {}),
  };
  return NextResponse.json(body, { status });
}

export function validationErrorResponse(
  errors: Record<string, any>,
  message = "Validation failed"
) {
  return errorResponse(message, 422, errors);
}

/**
 * Formats Zod issues into a friendly object: { [field]: [messages] }
 */
export function formatZodErrors(error: ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".") || "form";
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(issue.message);
  }
  return formatted;
}

/**
 * Centralized error handler for Route Handlers
 */
export function handleApiError(error: unknown) {
  // Zod validation errors
  if (error instanceof ZodError) {
    const formattedErrors = formatZodErrors(error);
    return validationErrorResponse(formattedErrors, "Validation failed");
  }

  // Mongoose invalid ObjectId error
  if (error instanceof mongoose.Error.CastError) {
    return errorResponse(`Invalid ID format: ${error.value}`, 400);
  }

  // Mongoose schema validation error
  if (error instanceof mongoose.Error.ValidationError) {
    const errors: Record<string, string> = {};
    for (const key in error.errors) {
      errors[key] = error.errors[key].message;
    }
    return validationErrorResponse(errors, "Database validation error");
  }

  // MongoDB duplicate key error (code 11000)
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    (error as any).code === 11000
  ) {
    const field = Object.keys((error as any).keyValue || {})[0] || "field";
    const value = (error as any).keyValue?.[field];
    return errorResponse(
      `Duplicate value entered for ${field}: "${value}". Must be unique.`,
      409
    );
  }

  // Standard Error
  if (error instanceof Error) {
    if (error.message.includes("Unauthorized") || error.message.includes("jwt")) {
      return errorResponse(error.message, 401);
    }
    if (error.message.includes("Forbidden") || error.message.includes("insufficient")) {
      return errorResponse(error.message, 403);
    }
    if (error.message.includes("not found")) {
      return errorResponse(error.message, 404);
    }

    const isProduction = process.env.NODE_ENV === "production";
    return errorResponse(
      isProduction ? "An unexpected server error occurred." : error.message,
      500
    );
  }

  return errorResponse("Internal Server Error", 500);
}
