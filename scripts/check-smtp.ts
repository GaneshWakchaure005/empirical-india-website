import { loadEnvConfig } from "@next/env";

async function check() {
  loadEnvConfig(process.cwd());
  const { createSMTPTransport, getSMTPConfig, sendEnquiryEmail } = await import("../lib/enquiry-mail");
  const config = getSMTPConfig();
  const transport = createSMTPTransport();
  try {
    await transport.verify();
    console.log("SMTP connection, TLS and authentication verified.");
  } finally { transport.close(); }
  if (process.argv.includes("--send-test")) {
    await sendEnquiryEmail({
      referenceId: `SMTP-TEST-${new Date().toISOString()}`, businessLine: "Website email delivery test",
      fullName: "Website SMTP test", companyName: "Empirical India website",
      workEmail: config.user, phone: "Not applicable", location: "Website configuration check",
      requirement: "This is a test notification confirming that website enquiries can be sent through the configured SMTP account. This is not a customer enquiry. No enquiry record was created.",
    });
    console.log("One clearly labelled test notification was accepted by SMTP for the configured enquiry mailbox. Check the inbox/spam folder to confirm receipt.");
  }
}

check().catch(async (error: unknown) => {
  const { mailFailureCode } = await import("../lib/enquiry-mail");
  console.error(`SMTP check failed: ${mailFailureCode(error)}. Verify the SMTP settings and outbound SMTP connectivity.`);
  process.exitCode = 1;
});
