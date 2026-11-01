import assert from "node:assert/strict";
import nodemailer from "nodemailer";
import { createEnquiryMessage, getSMTPConfig, mailFailureCode } from "../lib/enquiry-mail";
import Enquiry from "../models/Enquiry";

async function test() {
  const env = { SMTP_HOST: "smtp.example.invalid", SMTP_PORT: "465", SMTP_SECURE: "true", SMTP_USER: "website@example.com", SMTP_PASS: "test-only-password" };
  const config = getSMTPConfig(env);
  assert.equal(config.to, env.SMTP_USER);
  assert.equal(config.secure, true);
  assert.equal(getSMTPConfig({ ...env, ENQUIRY_EMAIL_TO: "sales@example.com" }).to, "sales@example.com");
  assert.equal(getSMTPConfig({ ...env, SMTP_SECURE: undefined }).secure, true);
  assert.equal(getSMTPConfig({ ...env, SMTP_PORT: "587", SMTP_SECURE: "false" }).secure, false);
  assert.throws(() => getSMTPConfig({ ...env, SMTP_SECURE: "false" }), /SMTP_NOT_CONFIGURED/);
  assert.throws(() => getSMTPConfig({ ...env, SMTP_PASS: "" }), /SMTP_NOT_CONFIGURED/);
  assert.throws(() => getSMTPConfig({ ...env, SMTP_PORT: "invalid" }), /SMTP_NOT_CONFIGURED/);
  assert.throws(() => getSMTPConfig({ ...env, ENQUIRY_EMAIL_TO: "invalid" }), /SMTP_NOT_CONFIGURED/);
  const enquiry = { referenceId: "EI-TEST", businessLine: "roll-forming-lines", fullName: "Test Buyer", companyName: "Buyer Company",
    workEmail: "buyer@example.com", phone: "+91 1234567890", location: "India", requirement: "Customer-defined test requirement", attachmentName: "drawing.pdf" };
  const message = createEnquiryMessage(enquiry, config);
  assert.equal(message.replyTo, enquiry.workEmail);
  assert.equal(message.from.address, env.SMTP_USER);
  assert.equal(message.to, env.SMTP_USER);
  assert.equal(message.subject, "New website enquiry");
  assert.ok(!JSON.stringify(message).includes(enquiry.referenceId));
  for (const [key, value] of Object.entries(enquiry)) {
    if (key !== "referenceId") assert.ok(message.text.includes(value));
  }
  assert.ok(message.text.includes("no file was uploaded or attached"));
  assert.ok(!JSON.stringify(message).includes(env.SMTP_PASS));
  assert.equal(message.disableFileAccess, true);
  assert.equal(message.disableUrlAccess, true);
  const htmlMessage = createEnquiryMessage({ ...enquiry, fullName: '<script>alert("test")</script>', attachmentUrl: "https://example.invalid/test.png?x=1&y=2" }, config);
  assert.ok(!htmlMessage.html.includes("<script>"));
  assert.ok(htmlMessage.html.includes("&lt;script&gt;"));
  assert.ok(htmlMessage.html.includes('href="https://example.invalid/test.png?x=1&amp;y=2"'));
  assert.ok(htmlMessage.html.includes("View / download attachment"));
  assert.ok(!createEnquiryMessage({ ...enquiry, referenceId: "bad\r\nBcc: attacker@example.com" }, config).subject.includes("\n"));
  const transport = nodemailer.createTransport({ jsonTransport: true });
  const result = await transport.sendMail(message);
  const serialized = JSON.parse(result.message);
  assert.equal(serialized.replyTo[0].address, enquiry.workEmail);
  assert.equal(serialized.to[0].address, env.SMTP_USER);
  const document = new Enquiry(enquiry);
  await document.validate();
  assert.equal(document.emailStatus, "pending");
  assert.equal(document.emailAttempts, 0);
  document.emailStatus = "sent"; document.emailSentAt = new Date();
  await document.validate();
  assert.equal(mailFailureCode({ code: "EAUTH" }), "SMTP_AUTH_FAILED");
  assert.equal(mailFailureCode({ code: "ETIMEDOUT" }), "SMTP_CONNECTION_FAILED");
  assert.equal(mailFailureCode(new Error("credentials must not be logged")), "SMTP_SEND_FAILED");
  console.log("Enquiry email tests passed: SMTP configuration/TLS, recipients, Reply-To, content, header safety, transport serialization, delivery schema and redacted errors. No emails sent.");
}

test().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
