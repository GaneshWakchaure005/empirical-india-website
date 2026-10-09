import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiryDocument extends Document {
  referenceId: string;
  businessLine: string;
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  location: string;
  requirement: string;
  status: "new" | "in-review" | "responded" | "archived";
  notes?: string;
  attachmentName?: string;
  attachmentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiryDocument>(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    businessLine: {
      type: String,
      required: true,
      default: "general",
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 120,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: 150,
    },
    workEmail: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    requirement: {
      type: String,
      required: [true, "Requirement description is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "in-review", "responded", "archived"],
      default: "new",
    },
    notes: {
      type: String,
      default: "",
    },
    attachmentName: {
      type: String,
    },
    attachmentUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

EnquirySchema.index({ status: 1, createdAt: -1 });
EnquirySchema.index({ businessLine: 1 });

export const Enquiry: Model<IEnquiryDocument> =
  mongoose.models.Enquiry ||
  mongoose.model<IEnquiryDocument>("Enquiry", EnquirySchema);

export default Enquiry;
