import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#0b1020",
          border: "2px solid #9cc4ff",
          color: "#9cc4ff",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-2px",
        }}
      >
        SC
      </div>
    ),
    size,
  );
}
