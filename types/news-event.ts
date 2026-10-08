import { CategoryPublic } from "./category";
import { IFeaturedImage } from "./blog";

export type NewsEventType = "news" | "event";
export type NewsEventStatus = "draft" | "published";

export interface IEventDetails {
  startDate?: Date;
  endDate?: Date;
  location?: string;
  registrationUrl?: string;
}

export interface INewsEventSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface INewsEvent {
  _id: string;
  title: string;
  slug: string;
  type: NewsEventType;
  excerpt: string;
  content: string;
  featuredImage: IFeaturedImage;
  category: any;
  tags: string[];
  author: any;
  status: NewsEventStatus;
  featured: boolean;
  eventDetails?: IEventDetails;
  seo: INewsEventSEO;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsEventPublic {
  id: string;
  title: string;
  slug: string;
  type: NewsEventType;
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
  eventDetails?: {
    startDate?: string | Date;
    endDate?: string | Date;
    location?: string;
    registrationUrl?: string;
  };
  seo: INewsEventSEO;
  publishedAt?: string | Date;
  createdAt: string | Date;
}
