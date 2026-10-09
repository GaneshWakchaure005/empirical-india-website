/**
 * Shared data types for Empirical India product category pages.
 * Replace every image: "null" value with a real image URL when available.
 */

export type ProductFeature = {
  title: string;
  description: string;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductApplication = {
  title: string;
  description: string;
};

export type ProductChild = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: string[];
  features: ProductFeature[];
  specifications: ProductSpecification[];
  applications: ProductApplication[];
  customizationOptions: string[];
  enquiryTitle: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  description: string;
  image: string;
  heroImage: string;
  gallery: string[];
  overview: string;
  keyBenefits: string[];
  industries: string[];
  manufacturingCapabilities: string[];
  children: ProductChild[];
  pageSections: string[];
  enquiryTitle: string;
  enquiryDescription: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};
