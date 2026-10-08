import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { loginSchema } from "@/lib/validation";
import { comparePassword, hashPassword, signAdminToken, COOKIE_OPTIONS } from "@/lib/auth";
import { successResponse, errorResponse, handleApiError } from "@/lib/api-response";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = loginSchema.parse(body);

    await connectDB();

    let admin = await Admin.findOne({ email: validated.email.toLowerCase() }).select("+password");

    // Auto-bootstrap admin if database has no admin or matches .env demo admin credentials
    if (!admin) {
      const envEmail = process.env.ADMIN_EMAIL?.toLowerCase();
      const envPassword = process.env.ADMIN_PASSWORD;
      const envName = process.env.ADMIN_NAME || "Admin";

      if (
        envEmail &&
        envPassword &&
        validated.email.toLowerCase() === envEmail &&
        validated.password === envPassword
      ) {
        const hashedPassword = await hashPassword(envPassword);
        admin = await Admin.create({
          name: envName,
          email: envEmail,
          password: hashedPassword,
          role: "admin",
          isActive: true,
        });
      }
    }

    if (!admin) {
      return errorResponse("Invalid email or password", 401);
    }

    if (!admin.isActive) {
      return errorResponse("Account has been deactivated. Please contact support.", 403);
    }

    const isValidPassword = await comparePassword(validated.password, admin.password!);
    if (!isValidPassword) {
      return errorResponse("Invalid email or password", 401);
    }

    const token = await signAdminToken({
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      name: admin.name,
    });

    const response = successResponse(
      {
        admin: {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
      200
    );

    // Set secure HTTP-only cookie
    response.cookies.set(COOKIE_OPTIONS.name, token, COOKIE_OPTIONS);

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
