import nodemailer from "nodemailer";
import { z } from "zod";

export type EnquiryMailData = {
  referenceId: string; businessLine: string; fullName: string; companyName: string;
  workEmail: string; phone: string; location: string; requirement: string;
  attachmentName?: string; attachmentUrl?: string;
};

export function getSMTPConfig(env: Record<string, string | undefined> = process.env) {
  const schema = z.object({
    host: z.string().trim().min(1), port: z.coerce.number().int().min(1).max(65535),
    user: z.string().trim().email(), pass: z.string().min(1),
    to: z.string().trim().email(),
  });
  const parsed = schema.safeParse({ host: env.SMTP_HOST, port: env.SMTP_PORT || "465",
    user: env.SMTP_USER, pass: env.SMTP_PASS, to: env.ENQUIRY_EMAIL_TO || env.SMTP_USER });
  if (!parsed.success) throw new Error("SMTP_NOT_CONFIGURED");
  if (env.SMTP_SECURE && !["true", "false"].includes(env.SMTP_SECURE.toLowerCase())) throw new Error("SMTP_NOT_CONFIGURED");
  const secure = env.SMTP_SECURE ? env.SMTP_SECURE.toLowerCase() === "true" : parsed.data.port === 465;
  if (parsed.data.port === 465 && !secure) throw new Error("SMTP_NOT_CONFIGURED");
  return { ...parsed.data, secure };
}

export function createEnquiryMessage(enquiry: EnquiryMailData, config: ReturnType<typeof getSMTPConfig>) {
  return {
    from: { name: "Empirical India Website", address: config.user },
    to: config.to,
    replyTo: enquiry.workEmail,
    subject: `New website enquiry — ${enquiry.referenceId.replace(/[\r\n]/g, " ")}`,
    text: [
      "New website enquiry", "", `Reference: ${enquiry.referenceId}`, `Business line: ${enquiry.businessLine}`,
      `Name: ${enquiry.fullName}`, `Company: ${enquiry.companyName}`, `Work email: ${enquiry.workEmail}`,
      `Phone: ${enquiry.phone}`, `Location: ${enquiry.location}`, "", "Requirement:", enquiry.requirement,
      ...(enquiry.attachmentUrl ? ["", `Document link: ${enquiry.attachmentUrl}`]
        : enquiry.attachmentName ? ["", `Selected filename: ${enquiry.attachmentName}`, "The form supplied a filename only; no file was uploaded or attached."] : []),
      "", "Reply to this email to contact the buyer. The enquiry is also saved in the website admin inbox.",
    ].join("\n"),
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export function createSMTPTransport() {
  const config = getSMTPConfig();
  return nodemailer.createTransport({ host: config.host, port: config.port, secure: config.secure,
    requireTLS: !config.secure, auth: { user: config.user, pass: config.pass },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000, dnsTimeout: 10000,
    disableFileAccess: true, disableUrlAccess: true });
}

export async function sendEnquiryEmail(enquiry: EnquiryMailData) {
  const config = getSMTPConfig();
  const transport = createSMTPTransport();
  try {
    const result = await transport.sendMail(createEnquiryMessage(enquiry, config));
    if (!result.accepted.length || result.rejected.length) throw new Error("SMTP_REJECTED");
    return result.messageId;
  } finally { transport.close(); }
}

export function mailFailureCode(error: unknown): string {
  if (error instanceof Error && ["SMTP_NOT_CONFIGURED", "SMTP_REJECTED"].includes(error.message)) return error.message;
  const code = error && typeof error === "object" && "code" in error ? error.code : "";
  if (code === "EAUTH") return "SMTP_AUTH_FAILED";
  if (["ETIMEDOUT", "ECONNECTION", "ESOCKET", "EDNS"].includes(String(code))) return "SMTP_CONNECTION_FAILED";
  return "SMTP_SEND_FAILED";
}
