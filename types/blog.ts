import { CategoryPublic } from "./category";

export type BlogStatus = "draft" | "published";

export interface IFeaturedImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface IBlogSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: IFeaturedImage;
  category: any;
  tags: string[];
  author: any;
  status: BlogStatus;
  featured: boolean;
  seo: IBlogSEO;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPublic {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: IFeaturedImage;
  category: CategoryPublic | null;
  tags: string[];
  author?: {
    id: string;
    name: string;
  };
  featured: boolean;
  seo: IBlogSEO;
  publishedAt?: string | Date;
  createdAt: string | Date;
}
