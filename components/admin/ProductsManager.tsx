"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ArrowRight, FolderOpen, Loader2, Package, Plus, Search, Settings2, Trash2 } from "lucide-react";
import { categorySummary, type CategorySummary, type EditorTarget, type ProductRecord } from "@/types/product-admin";

const ProductEditor = dynamic(() => import("./products/ProductEditor"), {
  loading: () => <div role="status" className="flex items-center gap-2 p-8 text-slate-400"><Loader2 className="h-4 w-4 animate-spin" />Opening editor…</div>,
});
const buttonClass = "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-3.5 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-cyan-400 disabled:opacity-50";

export default function ProductsManager() {
  const [records, setRecords] = useState<CategorySummary[]>([]);
  const [target, setTarget] = useState<EditorTarget | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const query = useDeferredValue(search.trim().toLowerCase());

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/products", { cache: "no-store", signal: controller.signal })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Could not load your products.");
        setRecords(result.data);
      }).catch((failure: Error) => { if (!controller.signal.aborted) setError(failure.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [reload]);

  const visible = useMemo(() => records.filter((record) => filter === "all" || record._id === filter).map((record) => ({ ...record,
    children: record.children.filter((child) => !query || `${child.name} ${record.name}`.toLowerCase().includes(query)),
  })).filter((record) => !query || record.name.toLowerCase().includes(query) || record.children.length), [records, filter, query]);
  const total = records.reduce((count, record) => count + record.children.length, 0);

  function saved(record: ProductRecord) {
    const summary = categorySummary(record);
    setRecords((previous) => [...previous.filter((entry) => entry._id !== record._id), summary].sort((first, second) => first.order - second.order || first.name.localeCompare(second.name)));
    setMessage("Saved successfully. Your website uses the latest published content."); setTarget(null);
  }
  async function removeCategory(record: CategorySummary) {
    if (!window.confirm(`Delete “${record.name}” and its ${record.children.length} products? Their public pages will be removed.`)) return;
    setDeleting(record._id); setError(""); setMessage("");
    try {
      const response = await fetch(`/api/admin/products/${record._id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Could not delete this category.");
      setRecords((previous) => previous.filter((entry) => entry._id !== record._id));
      if (filter === record._id) setFilter("all");
      setMessage("Category deleted.");
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Delete failed. Please try again."); }
    finally { setDeleting(""); }
  }
  if (target) return <ProductEditor target={target} onClose={() => setTarget(null)} onSaved={saved} />;

  return <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 text-slate-100 sm:px-8">
    <header className="flex flex-wrap items-center justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">Catalogue</p><h1 className="text-2xl font-bold sm:text-3xl">Products</h1><p className="mt-2 text-sm text-slate-400">Choose a product to edit its text, photos and specifications.</p></div><button type="button" disabled={loading || Boolean(deleting)} className={buttonClass} onClick={() => { setTarget({ categoryId: null }); setMessage(""); }}><Plus className="h-4 w-4" />New category</button></header>
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4"><div className="relative min-w-48 flex-1"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" /><label htmlFor="product-search" className="sr-only">Search products</label><input id="product-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a product…" className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm focus:border-cyan-500 focus:outline-none" /></div><label htmlFor="product-category-filter" className="sr-only">Filter by category</label><select id="product-category-filter" value={filter} onChange={(event) => setFilter(event.target.value)} className="max-w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm focus:outline-cyan-400"><option value="all">All categories</option>{records.map((record) => <option key={record._id} value={record._id}>{record.name}</option>)}</select><p className="text-xs text-slate-400">{total} products · {records.length} categories</p></div>
    {message && <p role="status" className="rounded-xl border border-emerald-500/20 bg-emerald-950/40 p-4 text-sm text-emerald-200">{message}</p>}
    {error && <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl bg-rose-950/40 p-4 text-sm text-rose-200"><p>{error}</p><button type="button" className={buttonClass} onClick={() => { setError(""); setLoading(true); setReload((value) => value + 1); }}>Try again</button></div>}
    {loading ? <div role="status" className="space-y-4 py-4"><p className="flex items-center gap-2 text-sm text-slate-400"><Loader2 className="h-4 w-4 animate-spin" />Loading catalogue…</p>{[0, 1, 2].map((index) => <div key={index} className="h-32 animate-pulse rounded-2xl bg-slate-800/60" />)}</div> : <div className="space-y-6">{visible.map((record) => <section key={record._id} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/70 px-4 py-4 sm:px-6"><div className="flex items-center gap-3"><FolderOpen className="h-5 w-5 shrink-0 text-cyan-400" /><div><h2 className="font-semibold">{record.name}</h2><p className="mt-1 text-xs text-slate-400"><span className={record.status === "published" ? "text-emerald-300" : "text-amber-300"}>{record.status === "published" ? "Published" : "Draft — hidden from website"}</span></p></div></div><div className="flex flex-wrap gap-2"><button type="button" disabled={Boolean(deleting)} className={buttonClass} onClick={() => { setTarget({ categoryId: record._id }); setMessage(""); }}><Settings2 className="h-4 w-4" />Category settings</button><button type="button" disabled={Boolean(deleting)} className={buttonClass} onClick={() => { setTarget({ categoryId: record._id, addProduct: true }); setMessage(""); }}><Plus className="h-4 w-4" />Add product</button><button type="button" disabled={Boolean(deleting)} className={buttonClass} aria-label={`Delete category ${record.name}`} onClick={() => void removeCategory(record)}>{deleting === record._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-slate-500" />}</button></div></header>
      <ul className="divide-y divide-slate-800">{record.children.map((product) => <li key={product.id}><button type="button" disabled={Boolean(deleting)} className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-slate-800/60 focus-visible:outline-2 focus-visible:outline-cyan-400 disabled:opacity-50 sm:px-6" onClick={() => { setTarget({ categoryId: record._id, productId: product.id }); setMessage(""); }}><div className="relative flex h-14 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950">{product.image && product.image !== "null" ? <Image src={product.image} alt="" fill sizes="64px" className="object-cover" /> : <Package className="h-6 w-6 text-slate-600" />}</div><div className="min-w-0 flex-1"><h3 className="text-sm font-medium text-slate-200 group-hover:text-white">{product.name}</h3><p className="mt-1 text-xs text-slate-500">Edit details, photos and specifications</p></div><span className="flex items-center gap-2 text-sm font-medium text-cyan-400"><span className="hidden sm:inline">Edit product</span><ArrowRight className="h-4 w-4" /></span></button></li>)}</ul>
      {!record.children.length && <p className="px-6 py-6 text-sm text-slate-400">{query ? "No matching products in this category." : "No products yet. Use Add product to create the first one."}</p>}
    </section>)}{!visible.length && !error && <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center"><Package className="mx-auto mb-4 h-8 w-8 text-slate-500" /><h2 className="font-semibold">{query ? "No matching products" : "Your catalogue starts here"}</h2><p className="mt-2 text-sm text-slate-400">{query ? "Try a different name or choose another category." : "Create a category, then add your products."}</p>{query && <button type="button" className={`${buttonClass} mt-4`} onClick={() => { setSearch(""); setFilter("all"); }}>Clear search</button>}</div>}</div>}
  </div>;
}
