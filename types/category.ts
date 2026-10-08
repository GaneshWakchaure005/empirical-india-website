export type CategoryType = "blog" | "news" | "event" | "general";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  type: CategoryType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryPublic {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: CategoryType;
  isActive: boolean;
}
