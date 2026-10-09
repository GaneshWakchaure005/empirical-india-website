"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { UploadCloud, X, ImageIcon, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  currentUrl?: string;
  altText?: string;
  onImageSelect: (file: File | null) => void;
  onAltTextChange?: (alt: string) => void;
  onRemoveCurrentImage?: () => void;
  label?: string;
  helperText?: string;
}

export default function ImageUploader({
  currentUrl,
  altText = "",
  onImageSelect,
  onAltTextChange,
  onRemoveCurrentImage,
  label = "Featured Image",
  helperText = "PNG, JPG, or WebP up to 5MB. 16:9 ratio recommended.",
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndHandleFile = (file: File) => {
    setError(null);
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("Image file exceeds the 5MB size limit.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    onImageSelect(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndHandleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImageSelect(null);
    if (onRemoveCurrentImage) {
      onRemoveCurrentImage();
    }
  };

  const displayImage = previewUrl || currentUrl;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
        {displayImage && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
          >
            Remove Image
          </button>
        )}
      </div>

      {displayImage ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 aspect-video max-h-64 flex items-center justify-center group">
          <Image
            src={displayImage}
            alt={altText || "Preview image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
            dragActive
              ? "border-cyan-400 bg-cyan-950/30"
              : "border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-950/80"
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-3">
            <UploadCloud className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-sm font-semibold text-slate-200">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-slate-400 mt-1">{helperText}</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <div className="flex items-center gap-2 text-rose-400 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {onAltTextChange && (
        <div>
          <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
            Image Alt Text (SEO & Accessibility)
          </label>
          <input
            type="text"
            value={altText}
            onChange={(e) => onAltTextChange(e.target.value)}
            placeholder="Descriptive label for this image..."
            className="w-full px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      )}
    </div>
  );
}
