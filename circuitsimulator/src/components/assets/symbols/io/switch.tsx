import type { SymbolProps } from "../../types";

type SwitchProps = SymbolProps & {
  state?: boolean;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
};

export function Switch({
  width = 70,
  height = 40,
  stroke = "#ffffff",
  strokeWidth = 2,
  state = false,
  onClick,
}: SwitchProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 40"
      fill="none"
      onClick={onClick}
    >
      <circle cx="15" cy="20" r="4" fill={stroke} />

      {/* Lever line */}
      <line
        x1="15"
        y1="20"
        x2={state ? 30 : 35}
        y2={state ? 20 : 10}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <circle cx="30" cy="20" r="2" fill={stroke} />
      <circle cx="35" cy="10" r="2" fill={stroke} />

      {/* Output line */}
      <line
        x1={state ? 30 : 35}
        y1={state ? 20 : 10}
        x2="70"
        y2={state ? 20 : 10}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}