export type GateType =
  | "AND"
  | "OR"
  | "NOT"
  | "NAND"
  | "NOR"
  | "XOR"
  | "XNOR"
  | "BUFFER"
  | "LED"
  | "SWITCH"
  | "BUTTON"
  | "CLOCK"
  | "PROBE";

export type LogicValue = 0 | 1 | "X";

export interface Point {
  x: number;
  y: number;
}

export interface Pin {
  id: string;
  label: string;
  type: "input" | "output";
  value: LogicValue;
  position: Point; // Position relative to the component
  connectedWireIds: string[];
}

export interface CircuitComponent {
  id: string;
  type: GateType;

  position: Point;

  rotation: number;

  inputs: Pin[];
  outputs: Pin[];
}

export interface Wire {
  id: string;

  from: {
    componentId: string;
    pinId: string;
  };

  to: {
    componentId: string;
    pinId: string;
  };
}