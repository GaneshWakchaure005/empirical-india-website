import mongoose, { Schema, Document, Model } from "mongoose";
import { NewsEventType, NewsEventStatus, IEventDetails, INewsEventSEO } from "@/types/news-event";
import { IFeaturedImage } from "@/types/blog";

export interface INewsEventDocument extends Document {
  title: string;
  slug: string;
  type: NewsEventType;
  excerpt: string;
  content: string;
  featuredImage: IFeaturedImage;
  category: mongoose.Types.ObjectId;
  tags: string[];
  author: mongoose.Types.ObjectId;
  status: NewsEventStatus;
  featured: boolean;
  eventDetails?: IEventDetails;
  seo: INewsEventSEO;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FeaturedImageSchema = new Schema(
  {
    url: { type: String, required: [true, "Image URL is required"] },
    publicId: { type: String, required: [true, "Cloudinary publicId is required"] },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

const EventDetailsSchema = new Schema(
  {
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String, trim: true },
    registrationUrl: { type: String, trim: true },
  },
  { _id: false }
);

const SEOSchema = new Schema(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: [String], default: [] },
  },
  { _id: false }
);

const NewsEventSchema = new Schema<INewsEventDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["news", "event"],
      default: "news",
      required: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [600, "Excerpt cannot exceed 600 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    featuredImage: {
      type: FeaturedImageSchema,
      required: [true, "Featured image is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Author is required"],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    eventDetails: {
      type: EventDetailsSchema,
      default: undefined,
    },
    seo: {
      type: SEOSchema,
      default: () => ({}),
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete (ret as any).__v;
        return ret;
      },
    },
  }
);

// Indexes
NewsEventSchema.index({ type: 1 });
NewsEventSchema.index({ status: 1 });
NewsEventSchema.index({ category: 1 });
NewsEventSchema.index({ publishedAt: -1 });
NewsEventSchema.index({ createdAt: -1 });
NewsEventSchema.index({ featured: 1 });
NewsEventSchema.index({ "eventDetails.startDate": 1 });
NewsEventSchema.index({ type: 1, status: 1, publishedAt: -1 });
NewsEventSchema.index({ title: "text", excerpt: "text" });

export const NewsEvent: Model<INewsEventDocument> =
  mongoose.models.NewsEvent ||
  mongoose.model<INewsEventDocument>("NewsEvent", NewsEventSchema);

export default NewsEvent;
