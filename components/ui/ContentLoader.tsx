import { Loader2 } from "lucide-react";
import { loadingUI } from "@/data/loading-ui";

export default function ContentLoader({ kind, fullPage = false, detail = false }: { kind: keyof typeof loadingUI; fullPage?: boolean; detail?: boolean }) {
  const copy = loadingUI[kind];
  return <section role="status" aria-live="polite" aria-busy="true" aria-label={copy.title}
    className={fullPage ? "mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8" : "mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8"}>
    <div className="mb-8 flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-navy-100 bg-navy-50 text-navy-700"><Loader2 aria-hidden="true" className="h-5 w-5 motion-safe:animate-spin" /></span><div><p className="font-semibold text-navy-900">{copy.title}</p><p className="mt-1 text-sm text-steel-500">{copy.description}</p></div></div>
    <div aria-hidden="true" className="space-y-8 motion-safe:animate-pulse">
      {detail ? <><div className="grid gap-8 lg:grid-cols-2"><div className="space-y-4 py-6"><div className="h-4 w-24 rounded bg-steel-100" /><div className="h-10 w-4/5 rounded bg-steel-200" /><div className="h-10 w-3/5 rounded bg-steel-200" />{[0, 1, 2].map((line) => <div key={line} className="h-4 w-full rounded bg-steel-100" />)}<div className="h-12 w-44 rounded-xl bg-steel-200" /></div><div className="aspect-video rounded-2xl bg-steel-100" /></div><div className="h-40 rounded-2xl bg-steel-100" /></>
        : <div className={`grid gap-6 sm:grid-cols-2 ${kind === "products" ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>{Array.from({ length: kind === "products" ? 4 : 6 }, (_, index) => <div key={index} className="overflow-hidden rounded-2xl border border-steel-200 bg-white"><div className="aspect-[16/10] bg-steel-100" /><div className="space-y-4 p-5"><div className="h-5 w-4/5 rounded bg-steel-200" /><div className="h-3 w-full rounded bg-steel-100" /><div className="h-3 w-3/4 rounded bg-steel-100" /><div className="h-9 w-28 rounded-lg bg-steel-100" /></div></div>)}</div>}
    </div>
  </section>;
}
