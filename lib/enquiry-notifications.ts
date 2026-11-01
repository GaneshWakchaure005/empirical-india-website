import connectDB from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { mailFailureCode, sendEnquiryEmail } from "@/lib/enquiry-mail";

export async function deliverEnquiryNotification(id: string, sender = sendEnquiryEmail) {
  await connectDB();
  const enquiry = await Enquiry.findOneAndUpdate({ _id: id, $or: [
    { emailStatus: { $in: ["pending", "failed"] } },
    { emailStatus: { $exists: false } },
    { emailStatus: "sending", emailLastAttemptAt: { $lt: new Date(Date.now() - 5 * 60 * 1000) } },
  ] }, { $set: { emailStatus: "sending", emailLastAttemptAt: new Date() }, $inc: { emailAttempts: 1 } }, { returnDocument: "after" });
  if (!enquiry) return { status: "not-eligible" as const };
  let messageId: string;
  try { messageId = await sender(enquiry); }
  catch (error) {
    const failureCode = mailFailureCode(error);
    await Enquiry.updateOne({ _id: id }, { $set: { emailStatus: "failed", emailFailureCode: failureCode } });
    console.error("Enquiry notification failed", { referenceId: enquiry.referenceId, code: failureCode });
    return { status: "failed" as const };
  }
  await Enquiry.updateOne({ _id: id }, { $set: { emailStatus: "sent", emailSentAt: new Date(), emailMessageId: messageId }, $unset: { emailFailureCode: 1 } });
  return { status: "sent" as const };
}
