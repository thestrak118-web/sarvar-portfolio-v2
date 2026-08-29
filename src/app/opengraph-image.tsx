import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.roleLine}`;
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
          justifyContent: "space-between",
          background: "#050505",
          padding: "72px",
          color: "#ecedea",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: 99, background: "#c3ff3e" }} />
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#c3ff3e" }}>
            {profile.availability.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            {profile.headline[0]}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              color: "#8d918d",
            }}
          >
            {profile.headline[1]}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 34, fontWeight: 600 }}>{profile.name}</div>
            <div style={{ fontSize: 24, color: "#8d918d" }}>{profile.roleLine}</div>
          </div>
          <div style={{ display: "flex", gap: 40, fontSize: 22, color: "#8d918d" }}>
            <div style={{ display: "flex" }}>6 MONTHS</div>
            <div style={{ display: "flex" }}>20+ MACHINES</div>
            <div style={{ display: "flex" }}>HTB CJCA</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
