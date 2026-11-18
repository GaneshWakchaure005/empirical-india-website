import { NewsSkeleton } from "@/components/news/NewsStateViews";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <NewsSkeleton />
      </div>
    </div>
  );
}
