import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

/**
 * A lightweight, code-generated Open Graph image (Phase 9 Step 9) — the site's own
 * visual language (void background, off-white type, one crimson node), not a photo
 * or any third-party artwork. No custom font is fetched: the default sans keeps this
 * cheap to generate and avoids a network/filesystem font-loading dependency for one
 * social-preview image.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#050506",
          color: "#F3F4F6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: "#C42340" }} />
          <span style={{ fontSize: 24, color: "#A9B0BA", letterSpacing: 2, textTransform: "uppercase" }}>
            Data Engineer
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>{site.name.full}</div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#D3D7DD", maxWidth: 920 }}>
          {site.positioning}
        </div>
      </div>
    ),
    { ...size },
  );
}
