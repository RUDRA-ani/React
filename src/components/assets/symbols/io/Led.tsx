import type { SymbolProps } from "../../types";

type LedProps = SymbolProps & {
  on?: boolean;
  color?: string;
};

export function Led({
  width = 70,
  height = 40,
  stroke = "#ffffff",
  strokeWidth = 2,
  on = false,
  color = "#22c55e",
}: LedProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 40"
      fill="none"
    >
      {/* Input */}
      <line
        x1="0"
        y1="20"
        x2="18"
        y2="20"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      {/* LED */}
      <circle
        cx="35"
        cy="20"
        r="10"
        fill={on ? color : "transparent"}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      {/* Glow */}
      {on && (
        <circle
          cx="35"
          cy="20"
          r="15"
          fill={color}
          opacity={0.25}
        />
      )}
    </svg>
  );
}