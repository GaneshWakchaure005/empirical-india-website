export type EnquiryStatus = "new" | "in-review" | "responded" | "archived";

export interface IEnquiry {
  _id: string;
  referenceId: string;
  businessLine: string;
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  location: string;
  requirement: string;
  status: EnquiryStatus;
  notes?: string;
  attachmentName?: string;
  attachmentUrl?: string;
  emailStatus?: "pending" | "sending" | "sent" | "failed";
  emailAttempts?: number;
  emailSentAt?: string;
  emailFailureCode?: string;
  createdAt: string;
  updatedAt: string;
}
