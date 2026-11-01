"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ExternalLink, Loader2, Save, Trash2, Plus } from "lucide-react";
import { emptyCategory, emptyProduct, productCategorySchema, type ManagedProductCategory } from "@/lib/product-validation";
import type { EditorTarget, ProductRecord } from "@/types/product-admin";
import { TextField, LinesField, ImageField, PairFields, buttonClass, inputClass } from "./EditorFields";

type Tab = "basics" | "images" | "technical" | "seo";
const tabs: { id: Tab; label: string }[] = [{ id: "basics", label: "Essentials" }, { id: "images", label: "Images" }, { id: "technical", label: "Specifications" }, { id: "seo", label: "Search settings" }];
const slugFor = (name: string) => name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120);
const newProduct = () => ({ ...structuredClone(emptyProduct), id: `product-${crypto.randomUUID()}`, name: "" });

export default function ProductEditor({ target, onClose, onSaved }: { target: EditorTarget; onClose: () => void; onSaved: (record: ProductRecord) => void }) {
  const [record, setRecord] = useState<ManagedProductCategory | null>(() => target.categoryId ? null : { ...structuredClone(emptyCategory), id: `category-${crypto.randomUUID()}`, name: "" });
  const [productId, setProductId] = useState(target.productId || "");
  const [originalProducts, setOriginalProducts] = useState<string[]>([]);
  const [tab, setTab] = useState<Tab>("basics");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dirty, setDirty] = useState(Boolean(target.addProduct));
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!target.categoryId) return;
    const controller = new AbortController();
    fetch(`/api/admin/products/${target.categoryId}`, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Could not open this category. Please try again.");
        const data = productCategorySchema.parse(result.data);
        setOriginalProducts(data.children.map((child) => child.id));
        if (target.addProduct) {
          const child = newProduct(); data.children.push(child); setProductId(child.id);
        }
        setRecord(data);
      }).catch((failure: Error) => { if (!controller.signal.aborted) setError(failure.message); });
    return () => controller.abort();
  }, [target]);

  useEffect(() => {
    if (!dirty && !uploading) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, uploading]);

  const child = record?.children.find((product) => product.id === productId);
  const editingProduct = Boolean(productId);
  const current = child || record;
  const locked = editingProduct ? originalProducts.includes(productId) : Boolean(target.categoryId);
  const disabled = saving || uploading;

  function close() {
    if (disabled) return;
    if (!dirty || window.confirm("Discard your unsaved changes?")) onClose();
  }
  function changeCategory(patch: Partial<ManagedProductCategory>) {
    setRecord((previous) => previous ? { ...previous, ...patch } : previous); setDirty(true); setError(""); setErrors({});
  }
  function change(patch: Partial<ManagedProductCategory["children"][number]>) {
    if (!editingProduct) { changeCategory(patch); return; }
    setRecord((previous) => previous ? { ...previous, children: previous.children.map((product) => product.id === productId ? { ...product, ...patch } : product) } : previous);
    setDirty(true); setError(""); setErrors({});
  }
  function changeName(name: string) {
    change({ name, ...(!locked ? { slug: slugFor(name) || (editingProduct ? productId : "new-category") } : {}) });
  }
  function fieldError(field: string) {
    const prefix = editingProduct ? `children.${record?.children.findIndex((product) => product.id === productId)}.` : "";
    return errors[`${prefix}${field}`];
  }
  async function persist(data: ManagedProductCategory) {
    const response = await fetch(target.categoryId ? `/api/admin/products/${target.categoryId}` : "/api/admin/products", {
      method: target.categoryId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      const issues = result.errors ? Object.values(result.errors).flat().join(" ") : "";
      throw new Error(issues || result.message || "Could not save. Your changes are still here; try again.");
    }
    onSaved(result.data);
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (disabled || !record) return;
    const parsed = productCategorySchema.safeParse(record);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [issue.path.join("."), issue.message])));
      const first = parsed.error.issues[0];
      const field = String(first.path[0] === "children" ? first.path[2] : first.path[0]);
      setTab(["image", "imageAlt", "heroImage", "gallery"].includes(field) ? "images" : field === "seo" ? "seo" : ["name", "slug", "shortDescription", "description", "tagline"].includes(field) ? "basics" : "technical");
      setError(first.path[0] === "children" && first.path.length === 1 ? "Each product needs a unique name and URL. Check for a duplicate product URL." : `Please check ${field.replace(/([A-Z])/g, " $1").toLowerCase()}: ${first.message}`);
      return;
    }
    setSaving(true); setError("");
    try { await persist(parsed.data); }
    catch (failure) { setError(failure instanceof Error ? failure.message : "Save failed. Please try again."); }
    finally { setSaving(false); }
  }
  async function removeProduct() {
    if (!record || !child || !window.confirm(`Delete “${child.name || "this product"}”? Its public page will be removed.`)) return;
    setSaving(true); setError("");
    try { await persist({ ...record, children: record.children.filter((product) => product.id !== productId) }); }
    catch (failure) { setError(failure instanceof Error ? failure.message : "Could not delete this product."); }
    finally { setSaving(false); }
  }

  if (!record) return <div className="space-y-5 p-6"><button type="button" className={buttonClass} onClick={onClose}><ArrowLeft className="h-4 w-4" />Back to products</button>{error ? <p role="alert" className="text-rose-300">{error}</p> : <p role="status" className="flex items-center gap-2 text-slate-400"><Loader2 className="h-4 w-4 animate-spin" />Opening editor…</p>}</div>;
  if (!current || (editingProduct && !child)) return <div className="p-6"><p role="alert">Product not found.</p><button type="button" className={buttonClass} onClick={onClose}>Back to products</button></div>;
  return <form onSubmit={save} noValidate className="mx-auto max-w-4xl space-y-6 px-4 py-6 text-slate-100 sm:px-8">
    <header className="space-y-5"><button type="button" className="flex items-center gap-2 rounded-lg text-sm text-slate-400 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400" disabled={disabled} onClick={close}><ArrowLeft className="h-4 w-4" />All products</button>
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="mb-1 text-xs font-medium uppercase tracking-wider text-cyan-400">{editingProduct ? record.name : "Category settings"}</p><h1 className="text-2xl font-bold">{current.name || (editingProduct ? "New product" : "New category")}</h1><p className="mt-2 text-sm text-slate-400">{editingProduct ? "Update this product without changing the rest of your catalogue." : "Set up the category page and how it appears on the website."}</p></div>
      <span className={`rounded-full px-3 py-1 text-xs font-medium ${record.status === "published" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"}`}>{record.status === "published" ? "Published category" : "Draft category"}</span></div>
    </header>
    <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-800 bg-slate-950/50 p-1 sm:grid-cols-4" role="tablist" aria-label="Product editor sections">{tabs.map((item) => <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} aria-controls={`panel-${item.id}`} id={`tab-${item.id}`} tabIndex={tab === item.id ? 0 : -1} disabled={disabled} onClick={() => setTab(item.id)} onKeyDown={(event) => { const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0; if (!direction) return; event.preventDefault(); const next = tabs[(tabs.findIndex((entry) => entry.id === tab) + direction + tabs.length) % tabs.length]; setTab(next.id); document.getElementById(`tab-${next.id}`)?.focus(); }} className={`rounded-lg px-3 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-cyan-400 ${tab === item.id ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}>{item.label}</button>)}</div>
    {error && <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-sm text-rose-200">{error}</p>}
    <fieldset disabled={disabled} id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 sm:p-7">
      {tab === "basics" && <>
        <TextField label={editingProduct ? "Product name" : "Category name"} required value={current.name} onChange={changeName} error={fieldError("name")} />
        {!editingProduct && <TextField label="Headline" value={record.tagline} onChange={(tagline) => changeCategory({ tagline })} hint="A short heading for this business line." />}
        <TextField label="Short introduction" value={current.shortDescription} multiline onChange={(shortDescription) => change({ shortDescription })} hint="Shown on product cards and in previews." error={fieldError("shortDescription")} />
        <TextField label="Full description" value={current.description} multiline onChange={(description) => change({ description })} error={fieldError("description")} />
        {!editingProduct && <div className="grid gap-5 sm:grid-cols-2"><div className="space-y-2"><label htmlFor="category-publication" className="block text-sm font-medium">Visibility</label><select id="category-publication" className={inputClass} value={record.status} onChange={(event) => changeCategory({ status: event.target.value as ManagedProductCategory["status"] })}><option value="draft">Draft — hidden from website</option><option value="published">Published — visible on website</option></select><p className="text-xs text-slate-400">Applies to all products in this category. Publish approved content only.</p></div><div className="space-y-2"><label htmlFor="category-order" className="block text-sm font-medium">Display order</label><input id="category-order" type="number" min="0" max="10000" className={inputClass} value={record.order} onChange={(event) => changeCategory({ order: Number(event.target.value) })} /><p className="text-xs text-slate-400">Lower numbers appear first.</p></div></div>}
        <p className="break-all rounded-xl bg-slate-950 p-3 text-xs text-slate-400">Website URL: /products/{record.slug}{editingProduct ? `/${child?.slug}` : ""}<span className="mt-1 block">{locked ? "The existing URL stays the same when you rename this item." : "The URL is generated from the name when creating this item."}</span></p>
      </>}
      {tab === "images" && <>
        <div className="grid gap-5 sm:grid-cols-2"><ImageField label={editingProduct ? "Product photo" : "Category photo"} value={current.image} onChange={(image) => change({ image })} onBusy={setUploading} />{!editingProduct && <ImageField label="Page banner (optional)" value={record.heroImage} onChange={(heroImage) => changeCategory({ heroImage })} onBusy={setUploading} />}</div>
        <TextField label="Photo description" value={current.imageAlt} onChange={(imageAlt) => change({ imageAlt })} hint="Describe the photo for visitors using screen readers." />
        <section className="space-y-4"><h2 className="font-semibold">Additional photos</h2><div className="grid gap-4 sm:grid-cols-2">{current.gallery.map((image, index) => <div key={index} className="space-y-2"><ImageField label={`Gallery photo ${index + 1}`} value={image} onBusy={setUploading} onChange={(next) => change({ gallery: current.gallery.map((entry, position) => position === index ? next : entry) })} /><button type="button" className="text-xs text-rose-300 hover:underline" onClick={() => change({ gallery: current.gallery.filter((_, position) => position !== index) })}>Remove photo slot</button></div>)}</div><button type="button" className={buttonClass} disabled={current.gallery.length >= 30} onClick={() => change({ gallery: [...current.gallery, ""] })}><Plus className="h-4 w-4" />Add photo</button></section>
      </>}
      {tab === "technical" && <>
        {child ? <>
          <LinesField label="Key highlights" value={child.highlights} onChange={(highlights) => change({ highlights })} />
          <PairFields label="Specifications" firstLabel="Specification" secondLabel="Value or requirement" items={child.specifications.map((item) => ({ first: item.label, second: item.value }))} onChange={(items) => change({ specifications: items.map((item) => ({ label: item.first, value: item.second })) })} />
          <PairFields label="Features" firstLabel="Feature title" secondLabel="Description" items={child.features.map((item) => ({ first: item.title, second: item.description }))} onChange={(items) => change({ features: items.map((item) => ({ title: item.first, description: item.second })) })} />
          <PairFields label="Applications" firstLabel="Application" secondLabel="Description" items={child.applications.map((item) => ({ first: item.title, second: item.description }))} onChange={(items) => change({ applications: items.map((item) => ({ title: item.first, description: item.second })) })} />
          <LinesField label="Customization options" value={child.customizationOptions} onChange={(customizationOptions) => change({ customizationOptions })} />
        </> : <>
          <TextField label="Overview" multiline value={record.overview} onChange={(overview) => changeCategory({ overview })} />
          <LinesField label="Key benefits" value={record.keyBenefits} onChange={(keyBenefits) => changeCategory({ keyBenefits })} />
          <LinesField label="Industries" value={record.industries} onChange={(industries) => changeCategory({ industries })} />
          <LinesField label="Manufacturing capabilities" value={record.manufacturingCapabilities} onChange={(manufacturingCapabilities) => changeCategory({ manufacturingCapabilities })} />
          <PairFields label="FAQs" firstLabel="Question" secondLabel="Answer" items={record.faqs.map((faq) => ({ first: faq.question, second: faq.answer }))} onChange={(items) => changeCategory({ faqs: items.map((item) => ({ question: item.first, answer: item.second })) })} />
        </>}
        <TextField label="Enquiry button text" value={current.enquiryTitle} onChange={(enquiryTitle) => change({ enquiryTitle })} hint="Leave blank to use the website's default enquiry label." />
        {!editingProduct && <TextField label="Enquiry introduction" multiline value={record.enquiryDescription} onChange={(enquiryDescription) => changeCategory({ enquiryDescription })} />}
      </>}
      {tab === "seo" && <>
        <p className="text-sm text-slate-400">Optional. Leave the title and description blank to use the product name and short introduction.</p>
        <TextField label="Search title" value={current.seo.title} onChange={(title) => change({ seo: { ...current.seo, title } })} />
        <TextField label="Search description" multiline value={current.seo.description} onChange={(description) => change({ seo: { ...current.seo, description } })} />
        <LinesField label="Search keywords" value={current.seo.keywords} onChange={(keywords) => change({ seo: { ...current.seo, keywords } })} />
      </>}
    </fieldset>
    <footer className="sticky bottom-24 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-700 bg-slate-900/95 p-4 shadow-xl backdrop-blur lg:bottom-4">
      <span role="status" className="text-xs text-slate-400">{uploading ? "Uploading photo…" : dirty ? "Unsaved changes" : "No unsaved changes"}</span><div className="flex flex-wrap items-center gap-2">
      {locked && record.status === "published" && <a className={buttonClass} target="_blank" rel="noreferrer" href={`/products/${record.slug}${child ? `/${child.slug}` : ""}`}><ExternalLink className="h-4 w-4" /><span className="hidden sm:inline">View page</span></a>}
      {child && originalProducts.includes(child.id) && <button type="button" disabled={disabled} className={buttonClass} onClick={() => void removeProduct()} aria-label="Delete product"><Trash2 className="h-4 w-4 text-rose-300" /></button>}
      <button type="button" disabled={disabled} className={buttonClass} onClick={close}>Cancel</button><button type="submit" disabled={disabled || (!dirty && Boolean(target.categoryId))} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:opacity-50">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saving ? "Saving…" : editingProduct ? "Save product" : "Save category"}</button></div>
    </footer>
  </form>;
}
