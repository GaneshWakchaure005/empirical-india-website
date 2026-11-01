import nodemailer from "nodemailer";
import { z } from "zod";
import { enquiryAttachmentDownloadUrl, resolveEnquiryAttachment, retrieveEnquiryAttachment, type EnquiryAttachment } from "@/lib/enquiry-attachments";

export type EnquiryMailData = EnquiryAttachment & {
  referenceId: string; businessLine: string; fullName: string; companyName: string;
  workEmail: string; phone: string; location: string; requirement: string;
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

export function createEnquiryMessage(enquiry: EnquiryMailData, config: ReturnType<typeof getSMTPConfig>, attachment?: Awaited<ReturnType<typeof retrieveEnquiryAttachment>>) {
  const storedAttachment = resolveEnquiryAttachment(enquiry);
  const attachmentUrl = storedAttachment.attachmentPublicId ? enquiryAttachmentDownloadUrl(storedAttachment, 7 * 24 * 60 * 60) : enquiry.attachmentUrl;
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
  const details = [
    ["Business line", enquiry.businessLine], ["Name", enquiry.fullName], ["Company", enquiry.companyName],
    ["Work email", enquiry.workEmail], ["Phone", enquiry.phone], ["Location", enquiry.location],
  ];
  return {
    from: { name: "Empirical India Website", address: config.user },
    to: config.to,
    replyTo: enquiry.workEmail,
    subject: "New website enquiry",
    text: [
      "New website enquiry", "", `Business line: ${enquiry.businessLine}`,
      `Name: ${enquiry.fullName}`, `Company: ${enquiry.companyName}`, `Work email: ${enquiry.workEmail}`,
      `Phone: ${enquiry.phone}`, `Location: ${enquiry.location}`, "", "Requirement:", enquiry.requirement,
      ...(attachmentUrl ? ["", `Attached file: ${enquiry.attachmentName || "Attachment"}`, `Document link: ${attachmentUrl}`,
        ...(storedAttachment.attachmentPublicId ? ["The download link expires in 7 days. The file is also attached to this email and available in the admin inbox."] : [])]
        : enquiry.attachmentName ? ["", `Selected filename: ${enquiry.attachmentName}`, "The form supplied a filename only; no file was uploaded or attached."] : []),
      "", "Reply to this email to contact the buyer. The enquiry is also saved in the website admin inbox.",
    ].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033"><h2>New website enquiry</h2>${details.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join("")}<h3>Requirement</h3><p style="white-space:pre-wrap">${escapeHtml(enquiry.requirement)}</p>${attachmentUrl ? `<p><strong>Attachment:</strong> ${escapeHtml(enquiry.attachmentName || "Attachment")}</p><p><a href="${escapeHtml(attachmentUrl)}">View / download attachment</a></p>${storedAttachment.attachmentPublicId ? "<p>This signed link expires in 7 days. The file is also attached to this email and available in the admin inbox.</p>" : ""}` : ""}<p>Reply to this email to contact the buyer.</p></div>`,
    attachments: attachment ? [{ ...attachment, contentDisposition: "attachment" as const }] : [],
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
  // Fetch only server-owned Cloudinary assets, then attach bytes. Nodemailer cannot access URLs or local paths.
  const storedAttachment = resolveEnquiryAttachment(enquiry);
  const attachment = storedAttachment.attachmentPublicId ? await retrieveEnquiryAttachment(enquiry) : undefined;
  const transport = createSMTPTransport();
  try {
    const result = await transport.sendMail(createEnquiryMessage(enquiry, config, attachment));
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
