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
  const y = pressed ? 18 : 0;
console.log("Button pressed =", pressed);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 50"
      fill="none"
      style={{ cursor: "pointer" }}
    >
      <line
        x1="10"
        y1="40"
        x2="60"
        y2="40"
        stroke={pressed ? "#22c55e" : stroke}
        strokeWidth={strokeWidth}
      />
      <line
        x1="35"
        y1={y + 10}
        x2="35"
        y2="40"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <rect
        x="25"
        y={y}
        width="20"
        height="10"
        rx="2"
        fill={pressed ? "#22c55e" : "transparent"}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}