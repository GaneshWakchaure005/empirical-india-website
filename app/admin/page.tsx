"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Mail,
  PlusCircle,
  Eye,
  RefreshCw,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Inbox,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface DashboardStats {
  totalBlogs?: number;
  publishedBlogs?: number;
  draftBlogs?: number;
  totalNews?: number;
  totalEvents?: number;
  publishedNews?: number;
  upcomingEvents?: number;
  featuredPosts?: number;
  totalEnquiries?: number;
  newEnquiries?: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [recentNews, setRecentNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const [statsRes, blogsRes, enqRes, newsRes] = await Promise.all([
        fetch("/api/admin/dashboard"),
        fetch("/api/admin/blogs?limit=5"),
        fetch("/api/admin/enquiries?limit=5"),
        fetch("/api/admin/news-events?limit=5"),
      ]);

      const [statsData, blogsData, enqData, newsData] = await Promise.all([
        statsRes.json().catch(() => ({})),
        blogsRes.json().catch(() => ({})),
        enqRes.json().catch(() => ({})),
        newsRes.json().catch(() => ({})),
      ]);

      if (statsData?.success) setStats(statsData.data);
      if (blogsData?.success) setRecentBlogs(blogsData.data || []);
      if (enqData?.success) setRecentEnquiries(enqData.data || []);
      if (newsData?.success) setRecentNews(newsData.data || []);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>B2B Operational Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Operational Management Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              Real-time monitoring of B2B production lines, customer RFQ enquiries, published engineering articles, and industrial events.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={fetchDashboardData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all disabled:opacity-50"
              title="Refresh statistics"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/admin/blogs/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950/40 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Blog</span>
            </Link>
            <Link
              href="/admin/news/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-950/40 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create News</span>
            </Link>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Blogs */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Articles & Blogs
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {stats?.totalBlogs ?? 0}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">
              {stats?.publishedBlogs ?? 0} published
            </span>
            <span>·</span>
            <span>{stats?.draftBlogs ?? 0} drafts</span>
          </div>
        </div>

        {/* News & Events */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              News & Events
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {(stats?.totalNews ?? 0) + (stats?.totalEvents ?? 0)}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-semibold">
              {stats?.totalNews ?? 0} news
            </span>
            <span>·</span>
            <span>{stats?.totalEvents ?? 0} events</span>
          </div>
        </div>

        {/* Enquiries */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              RFQ Enquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {stats?.totalEnquiries ?? 0}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">
              {stats?.newEnquiries ?? 0} unread new
            </span>
            <span>·</span>
            <Link href="/admin/enquiries" className="text-cyan-400 hover:underline">
              View Inbox
            </Link>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Featured Highlights
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {stats?.featuredPosts ?? 0}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Promoted on public homepage & solutions
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Enquiries & Recent Blogs/News */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Enquiries Panel */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Inbox className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">Recent Customer RFQs</h2>
              </div>
              <Link
                href="/admin/enquiries"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {loading ? (
                <div className="space-y-3 py-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-slate-800/40 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : recentEnquiries.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs">
                  No enquiries received yet.
                </div>
              ) : (
                recentEnquiries.map((enq) => (
                  <div
                    key={enq._id}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-xs text-white truncate">
                          {enq.companyName || enq.fullName}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            enq.status === "new"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : enq.status === "responded"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate">
                        {enq.requirement || "No requirement message specified"}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                        <span>{enq.fullName}</span>
                        <span>•</span>
                        <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Link
                      href="/admin/enquiries"
                      className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                      title="Inspect enquiry"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 text-right">
            <Link
              href="/admin/enquiries"
              className="text-xs text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Manage all incoming requests</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Recent Blogs & News Panel */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white">Recent Articles & News</h2>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/blogs"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Blogs
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/admin/news"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  News
                </Link>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {loading ? (
                <div className="space-y-3 py-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-slate-800/40 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : recentBlogs.length === 0 && recentNews.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs">
                  No articles published yet.
                </div>
              ) : (
                [...recentBlogs.map((b) => ({ ...b, itemType: "blog" })), ...recentNews.map((n) => ({ ...n, itemType: "news" }))]
                  .slice(0, 5)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                              item.itemType === "blog"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                                : "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                            }`}
                          >
                            {item.itemType}
                          </span>
                          <span className="font-semibold text-xs text-white truncate">
                            {item.title}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              item.status === "published"
                                ? "text-emerald-400"
                                : "text-slate-500"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {item.excerpt || item.content?.slice(0, 60)}
                        </p>
                      </div>

                      <Link
                        href={item.itemType === "blog" ? `/admin/blogs/${item._id}/edit` : `/admin/news/${item._id}/edit`}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors shrink-0"
                      >
                        Edit
                      </Link>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
            <Link href="/admin/blogs/create" className="text-cyan-400 hover:underline">
              + New Blog Post
            </Link>
            <Link href="/admin/news/create" className="text-indigo-400 hover:underline">
              + New News/Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
