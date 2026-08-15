import type { LogicValue, GateType } from "@/store/type";

type BinaryFn = (a: LogicValue, b: LogicValue) => LogicValue;
type UnaryFn = (a: LogicValue) => LogicValue;

export const binaryTruthTable: Partial<Record<GateType, BinaryFn>> = {
  AND: (a, b) => (a === 1 && b === 1 ? 1 : 0),

  OR: (a, b) => (a === 1 || b === 1 ? 1 : 0),

  NAND: (a, b) => (a === 1 && b === 1 ? 0 : 1),

  NOR: (a, b) => (a === 0 && b === 0 ? 1 : 0),

  XOR: (a, b) => (a !== b ? 1 : 0),

  XNOR: (a, b) => (a === b ? 1 : 0),
};

export const unaryTruthTable: Partial<Record<GateType, UnaryFn>> = {
  NOT: (a) => (a === 1 ? 0 : 1),

  BUFFER: (a) => a,
};