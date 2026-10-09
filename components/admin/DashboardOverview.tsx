"use client";

import {
  FileText,
  Calendar,
  Mail,
  TrendingUp,
  Clock,
  ArrowRight,
  PlusCircle,
  Eye,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

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

interface DashboardOverviewProps {
  stats: DashboardStats | null;
  onNavigateTab: (tab: string) => void;
  recentBlogs: any[];
  recentEnquiries: any[];
}

export default function DashboardOverview({
  stats,
  onNavigateTab,
  recentBlogs,
  recentEnquiries,
}: DashboardOverviewProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>B2B Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Operational Management Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              Monitor production posts, upcoming exhibitions & machine dispatches, and review incoming RFQ technical enquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab("blogs")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-950/40 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Blog</span>
            </button>
            <button
              onClick={() => onNavigateTab("enquiries")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>View Enquiries</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total & Published Blogs */}
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
            <span className="text-purple-400 font-semibold">
              {stats?.totalNews ?? 0} news
            </span>
            <span>·</span>
            <span className="text-cyan-400 font-semibold">
              {stats?.totalEvents ?? 0} events ({stats?.upcomingEvents ?? 0} upcoming)
            </span>
          </div>
        </div>

        {/* Customer RFQ Enquiries */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Technical Enquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {stats?.totalEnquiries ?? 0}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              {stats?.newEnquiries ?? 0} new pending
            </span>
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
            Showcased on homepage & priority feeds
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Recent Enquiries & Recent Blogs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries Box */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Latest Technical Enquiries
                  </h3>
                  <p className="text-xs text-slate-400">Recent RFQ submissions</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab("enquiries")}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentEnquiries && recentEnquiries.length > 0 ? (
              <div className="space-y-3">
                {recentEnquiries.slice(0, 4).map((enq) => (
                  <div
                    key={enq._id}
                    onClick={() => onNavigateTab("enquiries")}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-slate-300">
                          {enq.referenceId}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            enq.status === "new"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : enq.status === "in-review"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate">
                        {enq.fullName} · {enq.companyName}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {enq.requirement}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 shrink-0">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-slate-500 text-xs">
                No customer enquiries received yet.
              </div>
            )}
          </div>
        </div>

        {/* Recent Blogs Box */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Recent Blogs</h3>
                  <p className="text-xs text-slate-400">Technical insights & articles</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab("blogs")}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>Manage Blogs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentBlogs && recentBlogs.length > 0 ? (
              <div className="space-y-3">
                {recentBlogs.slice(0, 4).map((blog) => (
                  <div
                    key={blog._id}
                    onClick={() => onNavigateTab("blogs")}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            blog.status === "published"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-slate-700/50 text-slate-400 border border-slate-600"
                          }`}
                        >
                          {blog.status}
                        </span>
                        {blog.category?.name && (
                          <span className="text-[10px] text-cyan-400 font-medium truncate max-w-[150px]">
                            {blog.category.name}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-white truncate">
                        {blog.title}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 shrink-0">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-slate-500 text-xs">
                No blog posts created yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
