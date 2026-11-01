import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";

async function main() {
  loadEnvConfig(process.cwd());
  const { nextEnquiryReference } = await import("../lib/enquiry-reference");
  const { default: Counter } = await import("../models/Counter");
  const key = `reference-test-${randomUUID()}`;
  try {
    const ids = await Promise.all(Array.from({ length: 30 }, () => nextEnquiryReference(key)));
    assert.equal(new Set(ids).size, 30);
    assert.deepEqual(ids.map((id) => Number(id.slice(7))).sort((a, b) => a - b), Array.from({ length: 30 }, (_, i) => i + 1));
    assert.ok(ids.includes("EI-RFQ-000001"));
    assert.equal(await nextEnquiryReference(key), "EI-RFQ-000031");
    console.log("Sequential enquiry IDs passed: 30 concurrent requests, no duplicates, persisted continuation. Isolated test counter removed.");
  } finally { await Counter.deleteOne({ _id: key }); }
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; }).finally(() => mongoose.disconnect());
