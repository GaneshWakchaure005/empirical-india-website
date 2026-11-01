import { ImageResponse } from "next/og";
import { siteSEO } from "@/data/seo";

export const alt = "Empirical India — Engineering & Manufacturing in Nashik, India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0b192d", color: "white", borderBottom: "16px solid #22b8a8" }}>
    <div style={{ fontSize: 68, fontWeight: 700 }}>{siteSEO.name}</div>
    <div style={{ fontSize: 38, marginTop: 32, lineHeight: 1.4 }}>{siteSEO.pages.home.h1}</div>
    <div style={{ fontSize: 26, marginTop: 36, color: "#b5ccd9" }}>{siteSEO.location}</div>
  </div>, size);
}
