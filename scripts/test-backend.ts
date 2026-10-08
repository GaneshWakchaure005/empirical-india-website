/**
 * Backend Validation and Integration Test Suite
 * Tests authentication, validation schemas, slug generation, image validation,
 * and business logic.
 */
import {
  loginSchema,
  categoryCreateSchema,
  blogCreateSchema,
  newsEventCreateSchema,
  objectIdSchema,
} from "../lib/validation";
import { generateBaseSlug } from "../lib/slug";
import { hashPassword, comparePassword, signAdminToken, verifyAdminToken } from "../lib/auth";
import { validateImageFile, MAX_IMAGE_SIZE_BYTES } from "../lib/cloudinary";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ""}`);
    failed++;
  }
}

async function runTests() {
  console.log("\n🧪 Running Backend Test Suite...\n");

  // 1. AUTHENTICATION & PASSWORD TESTS
  console.log("▶ [1/5] Testing Authentication & Token Cryptography");
  const rawPassword = "TestPassword@123";
  const hashedPassword = await hashPassword(rawPassword);
  assert(hashedPassword !== rawPassword, "Password gets hashed");
  assert(await comparePassword(rawPassword, hashedPassword), "Password comparison succeeds with correct password");
  assert(!(await comparePassword("WrongPassword", hashedPassword)), "Password comparison rejects wrong password");

  const token = await signAdminToken({
    id: "675841029384756201928301",
    email: "admin@empiricalindia.com",
    role: "admin",
    name: "Admin",
  });
  assert(typeof token === "string" && token.length > 20, "JWT token signs successfully");

  const verified = await verifyAdminToken(token);
  assert(verified?.email === "admin@empiricalindia.com", "JWT payload verifies correctly");
  assert(verified?.role === "admin", "JWT role preserves admin privileges");

  const invalidToken = await verifyAdminToken("invalid.jwt.token");
  assert(invalidToken === null, "Invalid JWT returns null safely without throwing");

  // 2. SLUG GENERATION TESTS
  console.log("\n▶ [2/5] Testing Slug Generation & Normalization");
  assert(
    generateBaseSlug("Industrial Automation Solutions") === "industrial-automation-solutions",
    "Converts title to kebab-case slug"
  );
  assert(
    generateBaseSlug("Roll-Forming Machine & Pallets #1!") === "roll-forming-machine-and-pallets-1" ||
    generateBaseSlug("Roll-Forming Machine & Pallets #1!") === "roll-forming-machine-pallets-1",
    "Strips special characters from slug"
  );

  // 3. VALIDATION SCHEMAS TESTS
  console.log("\n▶ [3/5] Testing Zod Validation Schemas");
  // Login validation
  assert(loginSchema.safeParse({ email: "valid@example.com", password: "password123" }).success, "Valid login passes");
  assert(!loginSchema.safeParse({ email: "invalid-email", password: "123" }).success, "Invalid login fails");

  // ObjectId validation
  assert(objectIdSchema.safeParse("675841029384756201928301").success, "Valid 24-hex ObjectId passes");
  assert(!objectIdSchema.safeParse("not-an-id").success, "Invalid ObjectId rejected");

  // Category validation
  assert(
    categoryCreateSchema.safeParse({ name: "Roll-Forming", type: "blog" }).success,
    "Valid category passes"
  );
  assert(!categoryCreateSchema.safeParse({ name: "A" }).success, "Too short category name rejected");

  // Blog validation
  const validBlog = {
    title: "Testing Roll Forming",
    excerpt: "This is a detailed excerpt about precision tooling.",
    content: "Full markdown content goes here with extensive engineering notes.",
    category: "675841029384756201928301",
    tags: "roll, tooling, steel",
    status: "published",
    featured: true,
  };
  const parsedBlog = blogCreateSchema.safeParse(validBlog);
  assert(parsedBlog.success, "Valid blog passes validation");
  if (parsedBlog.success) {
    assert(Array.isArray(parsedBlog.data.tags) && parsedBlog.data.tags.length === 3, "Tags string coerced to array");
  }

  // News & Event validation
  const validNews = {
    title: "New Facility Expansion",
    type: "news",
    excerpt: "Empirical India announces new manufacturing bays.",
    content: "We have expanded our plant with specialized roll-forming assembly lines.",
    category: "675841029384756201928301",
    status: "published",
  };
  assert(newsEventCreateSchema.safeParse(validNews).success, "Valid news item passes");

  const validEvent = {
    title: "Industrial Expo 2026",
    type: "event",
    excerpt: "Meeting engineering buyers at the national trade expo.",
    content: "Visit our booth to view live demonstrations.",
    category: "675841029384756201928301",
    eventStartDate: "2026-11-20T10:00:00.000Z",
    eventLocation: "Hall 3, Trade Center",
    status: "published",
  };
  assert(newsEventCreateSchema.safeParse(validEvent).success, "Valid event item with start date passes");

  const invalidEvent = {
    ...validEvent,
    eventStartDate: "not-a-date",
  };
  assert(!newsEventCreateSchema.safeParse(invalidEvent).success, "Event with invalid date string is rejected");

  // 4. IMAGE VALIDATION TESTS
  console.log("\n▶ [4/5] Testing Image Validation & Upload Constraints");
  // Mock File-like object
  const validMockJpeg = new File(["dummy data"], "photo.jpg", { type: "image/jpeg" });
  assert(validateImageFile(validMockJpeg).valid, "JPEG image MIME accepted");

  const validMockWebp = new File(["dummy data"], "photo.webp", { type: "image/webp" });
  assert(validateImageFile(validMockWebp).valid, "WEBP image MIME accepted");

  const invalidMockPdf = new File(["dummy data"], "doc.pdf", { type: "application/pdf" });
  assert(!validateImageFile(invalidMockPdf).valid, "PDF MIME rejected");

  // Oversized mock
  const oversizedData = new Uint8Array(MAX_IMAGE_SIZE_BYTES + 1024);
  const oversizedMock = new File([oversizedData], "huge.png", { type: "image/png" });
  assert(!validateImageFile(oversizedMock).valid, "Oversized (>5MB) image rejected");

  // 5. SUMMARY
  console.log("\n==========================================");
  console.log(`Results: ${passed} Passed, ${failed} Failed`);
  console.log("==========================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
