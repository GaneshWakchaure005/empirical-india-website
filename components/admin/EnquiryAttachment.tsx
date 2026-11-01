"use client";

import { useState } from "react";
import { enquiryAttachmentContent as copy } from "@/data/enquiry-attachments";

type Props = {
  id: string;
  name?: string;
  publicId?: string;
  contentType?: string;
  storedUrl?: string;
};

export default function EnquiryAttachment({ id, name, publicId, contentType, storedUrl }: Props) {
  const [previewFailed, setPreviewFailed] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  if (!name) return null;
  const url = `/api/admin/enquiries/${encodeURIComponent(id)}/attachment`;
  return (
    <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs space-y-3">
      <p className="text-slate-400">{copy.attachment}: <strong className="text-slate-200 break-all">{name}</strong></p>
      {publicId || storedUrl ? (
        <>
          {(contentType?.startsWith("image/") || /\.(png|jpe?g|webp)$/i.test(name)) && !previewFailed && (
            <div>
              {!previewLoaded && <p role="status" className="mb-2 text-slate-400">{copy.loading}</p>}
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.open}: ${name}`}>
                {/* Authenticated same-origin API; avoid Next's unauthenticated image optimizer. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={name} onLoad={() => setPreviewLoaded(true)} onError={() => setPreviewFailed(true)}
                  className="mx-auto max-h-[min(36dvh,24rem)] max-w-full rounded-lg object-contain bg-white" />
              </a>
            </div>
          )}
          {previewFailed && <p role="status" className="text-amber-300">{copy.downloadFailed}</p>}
          <a href={`${url}?download=true`} target="_blank" rel="noopener noreferrer"
            className="inline-block text-cyan-400 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-cyan-400">
            {copy.download}
          </a>
        </>
      ) : <p className="text-slate-400">{copy.legacy}</p>}
    </div>
  );
}
