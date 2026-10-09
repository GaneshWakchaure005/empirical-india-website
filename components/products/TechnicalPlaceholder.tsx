import Image from "next/image";
import { Layers, Settings, Disc, Wrench, Cpu, Package, Box, Sun, LucideIcon } from "lucide-react";

interface TechnicalPlaceholderProps {
  image?: string | null;
  alt: string;
  category?: string;
  className?: string;
  priority?: boolean;
}

// Icon selection helper based on category/title
function getMachineIcon(alt: string): LucideIcon {
  const lower = alt.toLowerCase();
  if (lower.includes("solar")) return Sun;
  if (lower.includes("pallet")) return Package;
  if (lower.includes("tube")) return Box;
  if (lower.includes("punch") && lower.includes("tool")) return Wrench;
  if (lower.includes("punch") || lower.includes("online")) return Cpu;
  if (lower.includes("decoiler") || lower.includes("coil")) return Disc;
  if (lower.includes("special purpose")) return Settings;
  return Layers;
}

export default function TechnicalPlaceholder({
  image,
  alt,
  category = "Industrial Specification",
  className = "",
  priority = false,
}: TechnicalPlaceholderProps) {
  // Check if image is a valid URL and not the string "null"
  const hasValidImage =
    typeof image === "string" &&
    image.trim() !== "" &&
    image !== "null" &&
    !image.includes("null") &&
    (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/"));

  if (hasValidImage) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <Image
          src={image!}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent"
          aria-hidden="true"
        />
      </div>
    );
  }

  const IconComponent = getMachineIcon(alt);

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-slate-900 via-navy-900 to-slate-950 text-white overflow-hidden select-none ${className}`}
      aria-label={`Technical blueprint preview for ${alt}`}
    >
      {/* Precision CAD grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden="true"
      />

      {/* Decorative radial lighting */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-blue-500/15 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-2xl"
        aria-hidden="true"
      />

      {/* Top technical telemetry */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono tracking-wider text-cyan-300/80 uppercase">
        <span className="flex items-center gap-1.5 font-semibold">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {category}
        </span>
        <span className="text-slate-400/80 text-[10px]">CAD MODEL // READY</span>
      </div>

      {/* Center technical schematic emblem */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4 text-center">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl border border-cyan-400/30 bg-slate-800/60 shadow-[0_0_25px_rgba(34,211,238,0.12)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
          <IconComponent className="w-8 h-8 text-cyan-400" aria-hidden="true" />
          
          {/* Corner crosshairs */}
          <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-400/80" />
          <span className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-400/80" />
          <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-400/80" />
          <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-400/80" />
        </div>

        <p className="mt-3.5 max-w-[220px] text-xs font-semibold tracking-wide text-slate-200">
          {alt}
        </p>
      </div>

      {/* Bottom technical spec footer */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-700/50 text-[10px] font-mono text-slate-400">
        <span>PRECISION FABRICATION</span>
        <span className="text-cyan-300 font-medium">CONFIGURED TO SPEC</span>
      </div>
    </div>
  );
}
