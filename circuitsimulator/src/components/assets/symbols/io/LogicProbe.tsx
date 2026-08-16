import type { SymbolProps } from "../types";

type ProbeProps = SymbolProps & {
  value?: 0 | 1;
};

export function LogicProbe({
  width = 70,
  height = 40,
  stroke = "#ffffff",
  strokeWidth = 2,
  value = 0,
}: ProbeProps) {
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

      {/* Probe */}
      <polygon
        points="18,10 48,20 18,30"
        fill="transparent"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      <text
        x="28"
        y="24"
        textAnchor="middle"
        fontSize="12"
        fill={value ? "#22c55e" : "#ef4444"}
      >
        {value}
      </text>
    </svg>
  );
}