"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { ManagedProductCategory } from "@/lib/product-validation";

const CatalogueContext = createContext<ManagedProductCategory[]>([]);
export const useProductCatalogue = () => useContext(CatalogueContext);

export default function ProductCatalogueProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ManagedProductCategory[]>([]);
  const pathname = usePathname();
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/products", { cache: "no-store", signal: controller.signal })
      .then(async (response) => { if (!response.ok) throw new Error("Catalogue unavailable"); return response.json(); })
      .then((result) => { if (result.success) setCategories(result.data); })
      .catch(() => { if (!controller.signal.aborted) setCategories([]); });
    return () => controller.abort();
  }, [pathname]);
  return <CatalogueContext.Provider value={categories}>{children}</CatalogueContext.Provider>;
}
