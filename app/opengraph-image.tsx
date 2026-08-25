import { ImageResponse } from "next/og";

export const alt = "COADS - We Read Digital Risks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 76px",
        color: "white",
        background: "linear-gradient(135deg, #020817 0%, #071a2b 58%, #185adb 100%)"
      }}
    >
      <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: 5 }}>COADS</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 900, lineHeight: 1.02 }}>WE READ</div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 900, lineHeight: 1.02, color: "#78a4ff" }}>DIGITAL RISKS.</div>
        <div style={{ display: "flex", marginTop: 30, fontSize: 25, color: "#dce7ff" }}>REPUTATION INTELLIGENCE &amp; RESPONSE</div>
      </div>
    </div>,
    size
  );
}
