import assert from "node:assert/strict";
import mongoose from "mongoose";

async function main() {
  // Simulate a model compiled before the upload fields were added, as Next HMR does.
  const cached = mongoose.model("Enquiry", new mongoose.Schema({ attachmentName: String, attachmentUrl: String }));
  const { default: Enquiry } = await import("../models/Enquiry");
  assert.equal(Enquiry, cached, "Existing model references must keep working");
  const record = new Enquiry({ referenceId: "reload-test", fullName: "Test", companyName: "Test", workEmail: "test@example.invalid",
    phone: "1234567890", location: "Test", requirement: "Test requirement", attachmentName: "test.png", attachmentUrl: "https://example.invalid/test.png",
    attachmentPublicId: "empirical-india/enquiries/test.png", attachmentResourceType: "raw", attachmentFormat: "", attachmentContentType: "image/png", attachmentSize: 100 });
  await record.validate();
  for (const field of ["attachmentPublicId", "attachmentResourceType", "attachmentFormat", "attachmentContentType", "attachmentSize"]) {
    assert.ok(Enquiry.schema.path(field), `Cached schema must include ${field}`);
    assert.ok(Object.hasOwn(record.toObject(), field), `Strict mode must retain ${field}`);
  }
  assert.equal(record.attachmentPublicId, "empirical-india/enquiries/test.png");
  assert.equal(record.attachmentContentType, "image/png");
  console.log("Cached enquiry model upgrade passed: new attachment fields survive strict mode and have document accessors.");
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
