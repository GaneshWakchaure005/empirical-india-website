import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { Writable } from "node:stream";
import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { NextRequest } from "next/server";

async function test() {
  loadEnvConfig(process.cwd());
  const { cloudinary } = await import("../lib/cloudinary");
  const { default: connectDB } = await import("../lib/mongodb");
  const { default: Enquiry } = await import("../models/Enquiry");
  const { default: Admin } = await import("../models/Admin");
  const { hashPassword, signAdminToken } = await import("../lib/auth");
  const { POST } = await import("../app/api/enquiries/route");
  const attachmentRoute = await import("../app/api/admin/enquiries/[id]/attachment/route");
  const enquiryRoute = await import("../app/api/admin/enquiries/[id]/route");
  const notifyRoute = await import("../app/api/admin/enquiries/[id]/notify/route");
  const { MAX_ENQUIRY_ATTACHMENT_BYTES, validateEnquiryAttachmentBytes } = await import("../lib/enquiry-attachment-validation");
  const { uploadEnquiryAttachment, retrieveEnquiryAttachment, deleteEnquiryAttachment, resolveEnquiryAttachment } = await import("../lib/enquiry-attachments");
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j0ioAAAAASUVORK5CYII=", "base64");
  const pdf = Buffer.from("%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\n%%EOF");
  const step = Buffer.from("ISO-10303-21;\nHEADER;\nENDSEC;\nDATA;\nENDSEC;\nEND-ISO-10303-21;");

  // Optional live storage smoke check, using tiny disposable files, never real customer documents.
  if (process.argv.includes("--cloudinary")) {
    for (const [name, content] of [["test.png", png], ["test.pdf", pdf], ["test.step", step]] as const) {
      const attachment = await uploadEnquiryAttachment(new File([content], name));
      try {
        assert.equal((await fetch(attachment.attachmentUrl!)).ok, false, "Asset must not be public");
        const downloaded = await retrieveEnquiryAttachment(attachment);
        assert.deepEqual(downloaded.content, content);
        const legacy = { attachmentName: name, attachmentUrl: attachment.attachmentUrl };
        assert.equal(resolveEnquiryAttachment(legacy).attachmentPublicId, attachment.attachmentPublicId);
        assert.deepEqual((await retrieveEnquiryAttachment(legacy)).content, content);
        console.log(`Live Cloudinary private upload/download passed: ${name}`);
      } finally { await deleteEnquiryAttachment(attachment); }
    }
    return;
  }

  await connectDB();
  const marker = `attachment-test-${randomUUID()}`;
  const account = await Admin.create({ name: "Attachment test", email: `${marker}@example.invalid`, password: await hashPassword(randomUUID()), role: "admin" });
  const token = await signAdminToken({ id: account._id.toString(), email: account.email, name: account.name, role: "admin" });
  const originals = { upload: cloudinary.uploader.upload_stream, destroy: cloudinary.uploader.destroy,
    fetch: globalThis.fetch, transport: nodemailer.createTransport, create: Enquiry.create };
  const assets = new Map<string, Buffer>();
  const { default: Counter } = await import("../models/Counter");
  const originalCounterUpdate = Counter.findOneAndUpdate;
  Counter.findOneAndUpdate = ((filter: Record<string, unknown>, ...args: unknown[]) =>
    Reflect.apply(originalCounterUpdate, Counter, [{ ...filter, _id: marker }, ...args])) as typeof originalCounterUpdate;
  const messages: { subject: string; text: string; html: string; attachments?: { content: string; encoding: string; filename: string }[] }[] = [];
  let uploadFails = false;
  let smtpFails = false;
  let readFails = false;
  let uploads = 0;
  let checks = 0;
  const ids: string[] = [];
  const jsonTransport = originals.transport({ jsonTransport: true });
  cloudinary.uploader.upload_stream = ((options, callback) => new Writable({ write(chunk, _encoding, done) {
    uploads++;
    if (uploadFails) { callback!({ message: "Test failure", name: "TestError", http_code: 502 }, undefined); done(); return; }
    const publicId = String(options?.public_id);
    assets.set(publicId, Buffer.from(chunk));
    callback!(undefined, { secure_url: `https://res.cloudinary.com/${cloudinary.config().cloud_name}/${options?.resource_type}/authenticated/${publicId}`,
      public_id: publicId, format: options?.resource_type === "image" ? "png" : undefined } as never);
    done();
  } })) as typeof originals.upload;
  cloudinary.uploader.destroy = (async (publicId: string) => { assets.delete(publicId); return { result: "ok" }; }) as typeof originals.destroy;
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    assert.equal(url.hostname, "api.cloudinary.com");
    assert.equal(url.searchParams.get("type"), "authenticated");
    assert.ok(url.searchParams.get("signature"));
    assert.ok(Number(url.searchParams.get("expires_at")) > Date.now() / 1000);
    if (readFails) return new Response("Temporary retrieval failure", { status: 503 });
    const bytes = assets.get(url.searchParams.get("public_id") || "");
    return bytes ? new Response(new Uint8Array(bytes)) : new Response("Missing", { status: 404 });
  };
  nodemailer.createTransport = (() => ({ async sendMail(message: Parameters<typeof jsonTransport.sendMail>[0]) {
    if (smtpFails) throw Object.assign(new Error("Test SMTP failure"), { code: "EAUTH" });
    const result = await jsonTransport.sendMail(message);
    messages.push(JSON.parse(String(result.message)));
    return { messageId: "attachment-test-message", accepted: ["test@example.invalid"], rejected: [] };
  }, close() {} })) as unknown as typeof originals.transport;
  const envBefore = Object.fromEntries(["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "ENQUIRY_EMAIL_TO", "SMTP_PORT", "SMTP_SECURE"].map((name) => [name, process.env[name]]));
  Object.assign(process.env, { SMTP_HOST: "smtp.example.invalid", SMTP_USER: "test@example.invalid", SMTP_PASS: "test-only", ENQUIRY_EMAIL_TO: "test@example.invalid", SMTP_PORT: "465", SMTP_SECURE: "true" });
  const fields = { businessLine: "general", fullName: "Attachment test", companyName: marker, workEmail: "buyer@example.invalid", phone: "1234567890", location: "Test", requirement: "Temporary attachment regression test" };
  const context = (id: string) => ({ params: Promise.resolve({ id }) });
  const adminRequest = (suffix = "", method = "GET", authenticated = true) => new NextRequest(`http://localhost/api/admin/enquiries/test${suffix}`, { method, headers: authenticated ? { cookie: `admin_token=${token}` } : {} });
  async function submit(file?: File, overrides: Record<string, string> = {}) {
    const form = new FormData();
    for (const [key, value] of Object.entries({ ...fields, ...overrides })) form.set(key, value);
    if (file) form.set("attachment", file);
    const response = await POST(new NextRequest("http://localhost/api/enquiries", { method: "POST", body: form }));
    const body = await response.json();
    if (body.data?.id) ids.push(body.data.id);
    return { response, body };
  }
  async function status(response: Response, expected: number) {
    assert.equal(response.status, expected, response.bodyUsed ? "Response body already inspected" : await response.text()); checks++;
  }
  try {
    for (const [name, bytes] of [["sample.png", png], ["drawing.pdf", pdf], ["drawing.step", step]] as const) {
      const result = await submit(new File([bytes], name));
      assert.equal(result.response.status, 201, JSON.stringify(result.body)); checks++;
      const record = await Enquiry.findById(result.body.data.id).lean();
      assert.equal(record?.emailStatus, "sent");
      assert.equal(record?.attachmentName, name);
      assert.ok(record?.attachmentUrl?.startsWith("https://res.cloudinary.com/"));
      assert.ok(record?.attachmentPublicId?.startsWith("empirical-india/enquiries/"));
      const mail = messages.at(-1)!;
      assert.equal(mail.subject, "New website enquiry");
      assert.ok(!mail.text.includes(record!.referenceId));
      assert.equal(mail.attachments?.[0].filename, name);
      assert.deepEqual(Buffer.from(mail.attachments![0].content, "base64"), bytes);
      assert.ok(mail.html.includes('>View / download attachment</a>'));
      assert.ok(mail.html.includes("signature=")); checks += 2;
      checks += 8;
      await status(await attachmentRoute.GET(adminRequest("/attachment", "GET", false), context(record!._id.toString())), 401);
      const preview = await attachmentRoute.GET(adminRequest("/attachment"), context(record!._id.toString()));
      assert.equal(preview.status, 200);
      assert.equal(preview.headers.get("cache-control"), "private, no-store");
      assert.deepEqual(Buffer.from(await preview.arrayBuffer()), bytes); checks += 3;
      const download = await attachmentRoute.GET(adminRequest("/attachment?download=true"), context(record!._id.toString()));
      assert.match(download.headers.get("content-disposition") || "", /^attachment/); checks++;
      const detail = await enquiryRoute.GET(adminRequest(), context(record!._id.toString()));
      assert.equal((await detail.json()).data.attachmentUrl, record?.attachmentUrl); checks++;
      // Regression: a stale compiled schema saved the URL but discarded new metadata.
      await Enquiry.collection.updateOne({ _id: record!._id }, { $unset: {
        attachmentPublicId: "", attachmentResourceType: "", attachmentContentType: "", attachmentSize: "", attachmentFormat: "",
      }, $set: { emailStatus: "pending" } });
      const legacyPreview = await attachmentRoute.GET(adminRequest("/attachment"), context(record!._id.toString()));
      assert.equal(legacyPreview.status, 200);
      assert.deepEqual(Buffer.from(await legacyPreview.arrayBuffer()), bytes); checks += 2;
      const uploadsBeforeLegacy = uploads;
      await status(await notifyRoute.POST(adminRequest("/notify", "POST"), context(record!._id.toString())), 200);
      assert.equal(uploads, uploadsBeforeLegacy);
      assert.ok(messages.at(-1)!.text.includes("signature="));
      assert.deepEqual(Buffer.from(messages.at(-1)!.attachments![0].content, "base64"), bytes); checks += 3;
      await status(await enquiryRoute.DELETE(adminRequest("", "DELETE"), context(record!._id.toString())), 200);
      assert.equal(assets.size, 0); checks++;
    }
    const noAttachment = await submit();
    assert.equal(noAttachment.response.status, 201); checks++;
    assert.equal(messages.at(-1)?.attachments?.length || 0, 0); checks++;
    await status(await attachmentRoute.GET(adminRequest(), context(noAttachment.body.data.id)), 404);
    for (const file of [new File(["<script>alert(1)</script>"], "fake.png"), new File([png], "test.exe"), new File([], "empty.png"), new File([new Uint8Array(MAX_ENQUIRY_ATTACHMENT_BYTES + 1)], "large.png")]) {
      const before = uploads;
      const result = await submit(file);
      assert.ok([400, 413, 422].includes(result.response.status), JSON.stringify(result.body));
      assert.equal(uploads, before); checks += 2;
    }
    for (const format of ["jpg", "webp", "dwg", "dxf"]) {
      const bytes = { jpg: Buffer.from([255, 216, 255, 224]), webp: Buffer.from("RIFF0000WEBP"), dwg: Buffer.from("AC1032"), dxf: Buffer.from("0\nSECTION\n2\nHEADER\n") }[format]!;
      assert.equal(validateEnquiryAttachmentBytes({ name: `test.${format}`, size: bytes.length }, bytes).valid, true); checks++;
    }
    await status((await submit(undefined, { attachmentUrl: "https://attacker.example/test.png" })).response, 422);
    for (const url of ["https://attacker.example/a.png", "https://res.cloudinary.com/other-account/raw/authenticated/empirical-india/enquiries/test.png",
      `https://res.cloudinary.com/${cloudinary.config().cloud_name}/raw/authenticated/other-folder/test.png`]) {
      assert.equal(resolveEnquiryAttachment({ attachmentUrl: url }).attachmentPublicId, undefined); checks++;
    }
    await status((await submit(new File([png], "test.png"), { fullName: "" })).response, 422);
    uploadFails = true;
    await status((await submit(new File([png], "test.png"))).response, 502);
    uploadFails = false;
    assert.equal(assets.size, 0); checks++;
    Enquiry.create = (async () => { throw new Error("Test database failure"); }) as typeof originals.create;
    await status((await submit(new File([png], "test.png"))).response, 500);
    Enquiry.create = originals.create;
    assert.equal(assets.size, 0); checks++;
    smtpFails = true;
    const failedMail = await submit(new File([png], "retry.png"));
    assert.equal(failedMail.response.status, 201);
    assert.equal((await Enquiry.findById(failedMail.body.data.id))?.emailStatus, "failed");
    assert.equal(assets.size, 1); checks += 3;
    smtpFails = false;
    readFails = true;
    await status(await notifyRoute.POST(adminRequest("/notify", "POST"), context(failedMail.body.data.id)), 502);
    readFails = false;
    const uploadCount = uploads;
    await status(await notifyRoute.POST(adminRequest("/notify", "POST"), context(failedMail.body.data.id)), 200);
    assert.equal(uploads, uploadCount);
    assert.deepEqual(Buffer.from(messages.at(-1)!.attachments![0].content, "base64"), png); checks += 2;
    console.log(`Enquiry attachments: ${checks} checks passed (multipart, private storage metadata, email bytes, admin preview/download, validation, cleanup, SMTP failure and retries). No emails sent.`);
  } finally {
    Counter.findOneAndUpdate = originalCounterUpdate;
    await Counter.deleteOne({ _id: marker });
    Enquiry.create = originals.create;
    cloudinary.uploader.upload_stream = originals.upload;
    cloudinary.uploader.destroy = originals.destroy;
    globalThis.fetch = originals.fetch;
    nodemailer.createTransport = originals.transport;
    for (const [name, value] of Object.entries(envBefore)) { if (value === undefined) delete process.env[name]; else process.env[name] = value; }
    await Enquiry.deleteMany({ _id: { $in: ids } });
    await Admin.deleteOne({ _id: account._id });
  }
}
test().catch((error: unknown) => { console.error(error); process.exitCode = 1; }).finally(() => mongoose.disconnect());
