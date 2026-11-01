"use client";

import Image from "next/image";
import { validateImageFile } from "@/lib/image-validation";
import { useId, useState } from "react";
import { ImagePlus, Loader2, Trash2, Plus } from "lucide-react";

export const inputClass = "w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50";
export const buttonClass = "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-3.5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-cyan-400 disabled:cursor-not-allowed disabled:opacity-50";

export function TextField({ label, value, onChange, multiline = false, hint, error, required = false, disabled = false }: {
  label: string; value: string; onChange: (value: string) => void; multiline?: boolean; hint?: string; error?: string; required?: boolean; disabled?: boolean;
}) {
  const id = useId();
  const props = { id, value, required, disabled, className: inputClass, "aria-invalid": Boolean(error), "aria-describedby": error || hint ? `${id}-help` : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value) };
  return <div className="space-y-2"><label htmlFor={id} className="block text-sm font-medium text-slate-200">{label}{required && <span className="ml-1 text-cyan-400">*</span>}</label>
    {multiline ? <textarea {...props} rows={4} /> : <input {...props} type="text" />}
    {(error || hint) && <p id={`${id}-help`} className={`text-xs leading-5 ${error ? "text-rose-300" : "text-slate-400"}`}>{error || hint}</p>}
  </div>;
}

export function LinesField({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
  return <TextField label={label} value={value.join("\n")} multiline hint="One item per line. Leave blank if not needed." onChange={(text) => onChange(text === "" ? [] : text.split("\n"))} />;
}

export function ImageField({ label, value, onChange, onBusy }: { label: string; value: string; onChange: (value: string) => void; onBusy: (busy: boolean) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const id = useId();
  const hasImage = value && value !== "null";
  const canPreview = /^https:\/\/(res\.cloudinary\.com|images\.unsplash\.com)(\/|$)/.test(value);
  async function upload(file: File) {
    setError("");
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || "Invalid image file."); return;
    }
    setBusy(true); onBusy(true);
    try {
      const body = new FormData(); body.set("image", file); body.set("folder", "products");
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Upload failed. Please try again.");
      onChange(result.data.secureUrl || result.data.url);
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Upload failed. Please try again."); }
    finally { setBusy(false); onBusy(false); }
  }
  return <div className="space-y-3 rounded-2xl border border-slate-700 p-4">
    <p className="text-sm font-medium text-slate-200">{label}</p>
    <div className="relative flex aspect-video max-h-48 items-center justify-center overflow-hidden rounded-xl bg-slate-950">
      {canPreview ? <Image src={value} alt={label} fill sizes="(max-width: 768px) 90vw, 400px" className="object-contain" /> : <ImagePlus className="h-10 w-10 text-slate-600" />}
    </div>
    <div className="flex flex-wrap items-center gap-2"><label htmlFor={id} className={`${buttonClass} cursor-pointer ${busy ? "pointer-events-none opacity-50" : ""}`}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}{busy ? "Uploading…" : hasImage ? "Replace image" : "Upload image"}<input id={id} type="file" className="sr-only" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file); event.target.value = ""; }} /></label>
      {hasImage && <button type="button" className={buttonClass} disabled={busy} onClick={() => onChange("")}><Trash2 className="h-4 w-4" />Remove</button>}
    </div>
    <p className="text-xs text-slate-400">JPG, PNG or WebP · Up to 2 MB</p>
    <details><summary className="cursor-pointer text-xs text-slate-400">Use an existing image URL</summary><div className="mt-3"><TextField label="Image URL" value={value === "null" ? "" : value} disabled={busy} onChange={onChange} /></div></details>
    {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
  </div>;
}

export function PairFields({ label, items, firstLabel, secondLabel, onChange }: {
  label: string; items: { first: string; second: string }[]; firstLabel: string; secondLabel: string; onChange: (items: { first: string; second: string }[]) => void;
}) {
  return <section className="space-y-4"><h3 className="font-semibold text-white">{label}</h3>{items.map((item, index) => <div key={index} className="space-y-3 rounded-xl border border-slate-700 p-4">
    <div className="flex items-center justify-between"><span className="text-xs text-slate-400">{label} {index + 1}</span><button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-rose-950 hover:text-rose-300" aria-label={`Remove ${label.toLowerCase()} ${index + 1}`} onClick={() => onChange(items.filter((_, position) => position !== index))}><Trash2 className="h-4 w-4" /></button></div>
    <TextField label={firstLabel} value={item.first} onChange={(first) => onChange(items.map((entry, position) => position === index ? { ...entry, first } : entry))} />
    <TextField label={secondLabel} value={item.second} multiline onChange={(second) => onChange(items.map((entry, position) => position === index ? { ...entry, second } : entry))} />
  </div>)}<button type="button" className={buttonClass} onClick={() => onChange([...items, { first: "", second: "" }])}><Plus className="h-4 w-4" />Add {label.toLowerCase()}</button></section>;
}
