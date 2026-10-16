import { ImageResponse } from "next/og";

// Next 16: the Edge Runtime is deprecated and is incompatible with
// `force-static` (it disables static generation for this route), so the
// social card uses the default Node.js runtime and stays static.
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          backgroundColor: "#0b1020",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, #1e3a5f 0, #0b1020 48%)",
          color: "#f8fafc",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 58,
              height: 58,
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #9cc4ff",
              borderRadius: 14,
              color: "#9cc4ff",
              fontSize: 25,
              fontWeight: 700,
            }}
          >
            SC
          </div>
          <div
            style={{
              color: "#e2e8f0",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "0.12em",
            }}
          >
            SIMON CHIKAOBI
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#9cc4ff",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.18em",
            }}
          >
            FULL-STACK WEB DEVELOPER
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 1000,
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
            }}
          >
            <div>Business websites.</div>
            <div>Useful web applications.</div>
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 25, lineHeight: 1.4 }}>
            Web experiences built around real business workflows.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #334155",
            paddingTop: 20,
            color: "#94a3b8",
            fontSize: 18,
          }}
        >
          <span>Business websites · Booking · Ordering · Custom tools</span>
          <span>Portfolio</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
