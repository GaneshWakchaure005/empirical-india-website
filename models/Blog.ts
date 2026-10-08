import mongoose, { Schema, Document, Model } from "mongoose";
import { BlogStatus, IFeaturedImage, IBlogSEO } from "@/types/blog";

export interface IBlogDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: IFeaturedImage;
  category: mongoose.Types.ObjectId;
  tags: string[];
  author: mongoose.Types.ObjectId;
  status: BlogStatus;
  featured: boolean;
  seo: IBlogSEO;
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

const SEOSchema = new Schema(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: [String], default: [] },
  },
  { _id: false }
);

const BlogSchema = new Schema<IBlogDocument>(
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
BlogSchema.index({ status: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ publishedAt: -1 });
BlogSchema.index({ createdAt: -1 });
BlogSchema.index({ featured: 1 });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ status: 1, featured: 1 });
BlogSchema.index({ title: "text", excerpt: "text" });

export const Blog: Model<IBlogDocument> =
  mongoose.models.Blog || mongoose.model<IBlogDocument>("Blog", BlogSchema);

export default Blog;
