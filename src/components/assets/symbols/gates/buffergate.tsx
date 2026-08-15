import type { SymbolProps } from "../types";

export function BufferGate({
  width = 90,
  height = 70,
  stroke = "#ffffff",
  strokeWidth = 2,
  fill = "transparent",
}: SymbolProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 90 70"
      fill="none"
    >
      {/* Input */}
      <line
        x1="0"
        y1="35"
        x2="16"
        y2="35"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      {/* Triangle */}
      <polygon
        points="16,12 16,58 60,35"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      {/* Output */}
      <line
        x1="60"
        y1="35"
        x2="90"
        y2="35"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}