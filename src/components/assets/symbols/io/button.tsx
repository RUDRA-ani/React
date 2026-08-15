import type { SymbolProps } from "../../types";

type ButtonProps = SymbolProps & {
  pressed?: boolean;
};

export function Button({
  width = 70,
  height = 50,
  stroke = "#ffffff",
  strokeWidth = 2,
  pressed = false,
}: ButtonProps) {
  const y = pressed ? 18 : 10;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 50"
      fill="none"
    >
      <line
        x1="10"
        y1="40"
        x2="60"
        y2="40"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      <line
        x1="35"
        y1={y}
        x2="35"
        y2="40"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      <rect
        x="25"
        y="0"
        width="20"
        height="10"
        rx="2"
        fill="transparent"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}