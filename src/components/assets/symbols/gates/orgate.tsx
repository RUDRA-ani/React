import type { SymbolProps } from "../types";

export function OrGate({
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
      {/* Inputs */}
      <line x1="0" y1="20" x2="15" y2="20" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="0" y1="50" x2="15" y2="50" stroke={stroke} strokeWidth={strokeWidth} />

      <path
        d="
          M14 10
          Q28 35 14 60
          Q48 60 68 35
          Q48 10 14 10
        "
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      <line x1="68" y1="35" x2="90" y2="35" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}