import type { SymbolProps } from "../types";

export function AndGate({
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
      <line x1="0" y1="20" x2="18" y2="20" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1="0" y1="50" x2="18" y2="50" stroke={stroke} strokeWidth={strokeWidth} />

      {/* Gate */}
      <path
        d="
          M18 10
          H42
          A25 25 0 0 1 42 60
          H18
          Z
        "
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      {/* Output */}
      <line x1="67" y1="35" x2="90" y2="35" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}