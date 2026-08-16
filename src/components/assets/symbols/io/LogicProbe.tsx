import type { SymbolProps } from "../../types";

type LogicProbeProps = SymbolProps & {
  value?: 0 | 1 | "X";
};

export function LogicProbe({
  width = 70,
  height = 70,
  stroke = "#ffffff",
  strokeWidth = 2,
  value = "X",
}: LogicProbeProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 70"
      fill="none"
    >
      <circle
        cx="35"
        cy="35"
        r="22"
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="transparent"
      />

      <text
        x="35"
        y="41"
        textAnchor="middle"
        fontSize="18"
        fill={
          value === 1
            ? "#22c55e"
            : value === 0
            ? "#ef4444"
            : "#9ca3af"
        }
      >
        {value}
      </text>

      <line
        x1="35"
        y1="57"
        x2="35"
        y2="70"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}