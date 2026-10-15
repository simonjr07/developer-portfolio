import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 38,
          background: "#0b1020",
          border: "5px solid #9cc4ff",
          color: "#9cc4ff",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: "-5px",
        }}
      >
        SC
      </div>
    ),
    size,
  );
}
