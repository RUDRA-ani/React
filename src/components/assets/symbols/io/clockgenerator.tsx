import type { SymbolProps } from "../types";

type ClockProps = SymbolProps & {
  running?: boolean;
};

export function ClockGenerator({
  width = 80,
  height = 50,
  stroke = "#ffffff",
  strokeWidth = 2,
  running = true,
}: ClockProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 50"
      fill="none"
    >
      <rect
        x="10"
        y="10"
        width="40"
        height="30"
        rx="3"
        fill="transparent"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      {/* Square wave */}
      <path
        d="
          M18 30
          L18 18
          L28 18
          L28 30
          L38 30
          L38 18
          L48 18
        "
        fill="none"
        stroke={running ? "#22c55e" : stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />

      <line
        x1="50"
        y1="25"
        x2="80"
        y2="25"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}