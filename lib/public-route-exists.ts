import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import NewsEvent from "@/models/NewsEvent";
import ProductCategory from "@/models/ProductCategory";

// Check before streaming starts; a late notFound() otherwise returns 200 with PPR.
export async function publicRouteExists(pathname: string): Promise<boolean> {
  const parts = pathname.split("/").filter(Boolean).map(decodeURIComponent);
  if (parts.length < 2) return true;
  await connectDB();
  if (parts[0] === "blogs") return parts.length === 2 && Boolean(await Blog.exists({ slug: parts[1], status: "published" }));
  if (parts[0] === "news") return parts.length === 2 && Boolean(await NewsEvent.exists({ slug: parts[1], status: "published" }));
  if (parts[0] === "products") {
    if (parts.length > 3) return false;
    return Boolean(await ProductCategory.exists({ slug: parts[1], status: "published", ...(parts[2] ? { "children.slug": parts[2] } : {}) }));
  }
  return true;
}
