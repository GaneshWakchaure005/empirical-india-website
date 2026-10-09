"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Search,
  Filter,
  Eye,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Archive,
  Phone,
  Building,
  MapPin,
  Calendar,
  X,
  Loader2,
  MessageSquare,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

interface EnquiryItem {
  _id: string;
  referenceId: string;
  businessLine: string;
  fullName: string;
  companyName: string;
  workEmail: string;
  phone: string;
  location: string;
  requirement: string;
  status: "new" | "in-review" | "responded" | "archived";
  notes?: string;
  attachmentName?: string;
  attachmentUrl?: string;
  createdAt: string;
}

export default function EnquiriesInbox() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [businessLineFilter, setBusinessLineFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Detail Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Delete State
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "15");
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (businessLineFilter !== "all")
        params.set("businessLine", businessLineFilter);

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load enquiries");
      }

      setEnquiries(data.data || []);
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages || 1);
      }
    } catch (err: any) {
      setError(err.message || "Could not retrieve enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, statusFilter, businessLineFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchEnquiries();
  };

  const handleOpenDetail = (item: EnquiryItem) => {
    setSelectedEnquiry(item);
    setAdminNotes(item.notes || "");
  };

  const handleUpdateStatus = async (
    newStatus: "new" | "in-review" | "responded" | "archived"
  ) => {
    if (!selectedEnquiry) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update status");
      }

      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      setEnquiries((prev) =>
        prev.map((e) => (e._id === selectedEnquiry._id ? { ...e, status: newStatus } : e))
      );
    } catch (err: any) {
      alert(err.message || "Could not update enquiry status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setIsSavingNotes(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: adminNotes }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to save notes");
      }
      setSelectedEnquiry((prev) => (prev ? { ...prev, notes: adminNotes } : null));
    } catch (err: any) {
      alert(err.message || "Could not save notes");
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to delete enquiry");
      }

      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry(null);
      }
      setDeleteConfirmId(null);
      fetchEnquiries();
    } catch (err: any) {
      alert(err.message || "Could not delete enquiry");
    } finally {
      setIsDeleting(false);
    }
  };

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Customer RFQ & Enquiries Inbox</span>
          </h2>
          <p className="text-xs text-slate-400">
            View, track, and respond to engineering RFQs and contact enquiries submitted on the website
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference ID, company, sender, or email..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New (Unreviewed)</option>
            <option value="in-review">In Review</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>

          {/* Business Line Filter */}
          <select
            value={businessLineFilter}
            onChange={(e) => {
              setBusinessLineFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="all">All Product Lines</option>
            <option value="roll-forming-lines">Roll-Forming Lines</option>
            <option value="modular-metal-pallets">Modular Metal Pallets</option>
            <option value="trolley-bag-tubes">Trolley-Bag Tubes</option>
            <option value="general">General RFQ</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <span className="text-xs">Loading enquiries...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-400 text-xs">{error}</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Mail className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            <p className="text-sm font-medium text-slate-300">
              No technical enquiries found
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Customer enquiries submitted from the contact page will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 uppercase tracking-wider text-[10px] text-slate-400 font-bold">
                <tr>
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Sender & Company</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Business Line</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {enquiries.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-850/50 transition-colors"
                  >
                    {/* Ref ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                      {item.referenceId}
                    </td>

                    {/* Sender & Company */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">
                        {item.fullName}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[150px]">
                          {item.companyName}
                        </span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4 text-slate-300">
                      <div className="truncate max-w-[180px] font-mono text-[11px]">
                        {item.workEmail}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {item.phone} · {item.location}
                      </div>
                    </td>

                    {/* Business Line */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-medium capitalize">
                        {item.businessLine.replace(/-/g, " ")}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "new"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : item.status === "in-review"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                            : item.status === "responded"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-slate-700/30 text-slate-400 border border-slate-600/40"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="px-2.5 py-1 rounded-lg text-cyan-400 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/40 transition-colors flex items-center gap-1 text-[11px] font-semibold"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item._id)}
                          className="p-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-sm w-full rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Delete Enquiry?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to delete this enquiry record?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEnquiry(deleteConfirmId)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="max-w-2xl w-full rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl my-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-amber-400">
                    {selectedEnquiry.referenceId}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium capitalize">
                    {selectedEnquiry.businessLine.replace(/-/g, " ")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Technical Requirement Enquiry
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Sender Name</span>
                <span className="font-semibold text-white">
                  {selectedEnquiry.fullName}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Company / Org</span>
                <span className="font-semibold text-white">
                  {selectedEnquiry.companyName}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Work Email</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-200">
                    {selectedEnquiry.workEmail}
                  </span>
                  <button
                    onClick={() => copyEmail(selectedEnquiry.workEmail)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Phone & Location</span>
                <span className="text-slate-200">
                  {selectedEnquiry.phone} ({selectedEnquiry.location})
                </span>
              </div>
            </div>

            {/* Scope / Requirement */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Detailed Technical Requirement / Scope
              </h4>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedEnquiry.requirement}
              </div>
            </div>

            {/* Attachment note */}
            {selectedEnquiry.attachmentName && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Attached Document:{" "}
                  <strong className="text-slate-200 font-mono">
                    {selectedEnquiry.attachmentName}
                  </strong>
                </span>
              </div>
            )}

            {/* Status Workflow Selector */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Enquiry Status Workflow
                </span>
                {isUpdatingStatus && (
                  <span className="text-[11px] text-amber-400 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Updating...</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["new", "in-review", "responded", "archived"] as const).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(st)}
                      disabled={isUpdatingStatus}
                      className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedEnquiry.status === st
                          ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-950/60"
                          : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-850 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">
                Internal Engineering Team Notes
              </label>
              <textarea
                rows={2}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Nashik plant team reviewed drawing; quotation sent via email on..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  {isSavingNotes && <Loader2 className="w-3 h-3 animate-spin" />}
                  <span>Save Notes</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <a
                href={`mailto:${selectedEnquiry.workEmail}?subject=Regarding Technical Enquiry ${selectedEnquiry.referenceId} - Empirical India`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-950/40 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Reply via Work Email</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
