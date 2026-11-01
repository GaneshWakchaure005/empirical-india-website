"use client";
import { usePathname, useSearchParams } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & { page: number; disabled?: boolean; onClick: () => void };
export default function PaginationLink({ page, disabled, onClick, children, ...props }: Props) {
  const pathname = usePathname();
  const params = new URLSearchParams(useSearchParams().toString());
  if (page > 1) params.set("page", String(page)); else params.delete("page");
  if (disabled) return <span {...props} aria-disabled="true">{children}</span>;
  return <a {...props} href={`${pathname}${params.size ? `?${params}` : ""}`} onClick={(event) => {
    if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onClick(); }
  }}>{children}</a>;
}
