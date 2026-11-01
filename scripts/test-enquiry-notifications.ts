import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";
import { loadEnvConfig } from "@next/env";

async function test() {
  loadEnvConfig(process.cwd());
  const { default: connectDB } = await import("../lib/mongodb");
  const { default: Enquiry } = await import("../models/Enquiry");
  const { deliverEnquiryNotification } = await import("../lib/enquiry-notifications");
  await connectDB();
  const ids: string[] = [];
  async function create() {
    const record = await Enquiry.create({ referenceId: `EI-NOTIFICATION-TEST-${randomUUID()}`, businessLine: "test",
      fullName: "Notification delivery test", companyName: "Temporary test record", workEmail: "test@example.invalid",
      phone: "Not applicable", location: "Test", requirement: "Temporary notification-state test. No real email will be sent." });
    ids.push(record._id.toString());
    return record._id.toString();
  }
  try {
    const successId = await create();
    let sends = 0;
    const sender = async () => { sends += 1; await new Promise((resolve) => setTimeout(resolve, 30)); return "mock-message-id"; };
    const outcomes = await Promise.all([deliverEnquiryNotification(successId, sender), deliverEnquiryNotification(successId, sender)]);
    assert.equal(sends, 1);
    assert.deepEqual(outcomes.map((result) => result.status).sort(), ["not-eligible", "sent"]);
    const sent = await Enquiry.findById(successId).lean();
    assert.equal(sent?.emailStatus, "sent");
    assert.equal(sent?.emailAttempts, 1);
    assert.ok(sent?.emailSentAt);
    assert.equal(sent?.emailMessageId, "mock-message-id");
    assert.equal((await deliverEnquiryNotification(successId, sender)).status, "not-eligible");
    const failureId = await create();
    const failure = await deliverEnquiryNotification(failureId, async () => { throw Object.assign(new Error("Test-only authentication rejection"), { code: "EAUTH" }); });
    assert.equal(failure.status, "failed");
    const failed = await Enquiry.findById(failureId).lean();
    assert.equal(failed?.emailStatus, "failed");
    assert.equal(failed?.emailFailureCode, "SMTP_AUTH_FAILED");
    assert.equal(failed?.status, "new");
    assert.equal((await deliverEnquiryNotification(failureId, sender)).status, "sent");
    const retried = await Enquiry.findById(failureId).lean();
    assert.equal(retried?.emailAttempts, 2);
    assert.equal(retried?.emailFailureCode, undefined);
    assert.equal((await deliverEnquiryNotification(new mongoose.Types.ObjectId().toString(), sender)).status, "not-eligible");
    console.log("Notification database tests passed: successful send state, concurrent duplicate prevention, saved enquiries on SMTP failure, redacted failure status and retry recovery. No emails sent.");
  } finally { await Enquiry.deleteMany({ _id: { $in: ids } }); }
}

test().catch((error: unknown) => { console.error(error); process.exitCode = 1; }).finally(() => mongoose.disconnect());
