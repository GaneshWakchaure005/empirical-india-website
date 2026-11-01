"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

export default function EnquiryEmailStatus({ id, initialStatus }: { id: string; initialStatus?: "pending" | "sending" | "sent" | "failed" }) {
  const [status, setStatus] = useState(initialStatus);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function retry() {
    setBusy(true); setError("");
    try {
      const response = await fetch(`/api/admin/enquiries/${id}/notify`, { method: "POST" });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Could not send the email.");
      setStatus("sent");
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Could not send the email."); }
    finally { setBusy(false); }
  }
  return <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950 p-4">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h4 className="flex items-center gap-2 text-xs font-semibold text-slate-300"><Mail className="h-4 w-4" />Mailbox notification</h4><p role="status" className={`mt-2 text-xs ${status === "sent" ? "text-emerald-300" : "text-amber-300"}`}>{status === "sent" ? "Accepted by the mail server" : status === "sending" ? "Delivery in progress. If interrupted, retry after five minutes." : status === "failed" ? "Email failed. The enquiry is safely saved here." : "Email notification not yet sent."}</p></div>
      {status !== "sent" && <button type="button" disabled={busy} onClick={() => void retry()} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 disabled:opacity-50">{busy && <Loader2 className="h-3 w-3 animate-spin" />}{busy ? "Sending…" : "Send notification"}</button>}
    </div>{error && <p role="alert" className="text-xs text-rose-300">{error}</p>}
  </section>;
}
