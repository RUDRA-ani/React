import type { CircuitComponent, GateType } from "@/store/type";

type PinTemplate = {
  inputs: Array<{ id: string; label: string; position: { x: number; y: number } }>;
  outputs: Array<{ id: string; label: string; position: { x: number; y: number } }>;
};

// Configuration map for pins based on component type
const COMPONENT_SCHEMAS: Record<GateType, PinTemplate> = {
  // Standard 2-Input Gates
  AND: {
    inputs: [
      { id: "in1", label: "A", position: { x: 0, y: 20 } },
      { id: "in2", label: "B", position: { x: 0, y: 50 } },
    ],
    outputs: [{ id: "out", label: "Y", position: { x: 90, y: 35 } }],
  },
  OR: {
    inputs: [
      { id: "in1", label: "A", position: { x: 0, y: 20 } },
      { id: "in2", label: "B", position: { x: 0, y: 50 } },
    ],
    outputs: [{ id: "out", label: "Y", position: { x: 90, y: 35 } }],
  },
  NAND: {
    inputs: [
      { id: "in1", label: "A", position: { x: 0, y: 20 } },
      { id: "in2", label: "B", position: { x: 0, y: 50 } },
    ],
    outputs: [{ id: "out", label: "Y", position: { x: 90, y: 35 } }],
  },
  NOR: {
    inputs: [
      { id: "in1", label: "A", position: { x: 0, y: 20 } },
      { id: "in2", label: "B", position: { x: 0, y: 50 } },
    ],
    outputs: [{ id: "out", label: "Y", position: { x: 90, y: 35 } }],
  },
  XOR: {
    inputs: [
      { id: "in1", label: "A", position: { x: 0, y: 20 } },
      { id: "in2", label: "B", position: { x: 0, y: 50 } },
    ],
    outputs: [{ id: "out", label: "Y", position: { x: 90, y: 35 } }],
  },
  XNOR: {
    inputs: [
      { id: "in1", label: "A", position: { x: 0, y: 20 } },
      { id: "in2", label: "B", position: { x: 0, y: 50 } },
    ],
    outputs: [{ id: "out", label: "Y", position: { x: 90, y: 35 } }],
  },

  // Single-Input Gates
  NOT: {
    inputs: [{ id: "in1", label: "A", position: { x: 0, y: 35 } }],
    outputs: [{ id: "out", label: "Y", position: { x: 90, y: 35 } }],
  },
  BUFFER: {
    inputs: [{ id: "in1", label: "A", position: { x: 0, y: 35 } }],
    outputs: [{ id: "out", label: "Y", position: { x: 90, y: 35 } }],
  },

  // Input Signal Sources
  SWITCH: {
    inputs: [],
    outputs: [{ id: "out", label: "OUT", position: { x: 60, y: 25 } }],
  },
  BUTTON: {
    inputs: [],
    outputs: [{ id: "out", label: "OUT", position: { x: 60, y: 25 } }],
  },
  CLOCK: {
    inputs: [],
    outputs: [{ id: "out", label: "OUT", position: { x: 60, y: 25 } }],
  },

  // Output Indicators
  LED: {
    inputs: [{ id: "in1", label: "IN", position: { x: 0, y: 25 } }],
    outputs: [],
  },
  PROBE: {
    inputs: [{ id: "in1", label: "IN", position: { x: 0, y: 25 } }],
    outputs: [],
  },
};

/**
 * Universal component factory function.
 */
export function createComponent(
  type: GateType,
  x: number,
  y: number
): CircuitComponent {
  const schema = COMPONENT_SCHEMAS[type];

  if (!schema) {
    throw new Error(`Unsupported component type: ${type}`);
  }

  return {
    id: crypto.randomUUID(),
    type,
    position: { x, y },
    rotation: 0,
    inputs: schema.inputs.map((pin) => ({
      ...pin,
      type: "input",
      value: 0,
    })),
    outputs: schema.outputs.map((pin) => ({
      ...pin,
      type: "output",
      value: 0,
    })),
  };
}