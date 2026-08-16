import type { CircuitComponent, LogicValue } from "@/store/type";
import {
  binaryTruthTable,
  unaryTruthTable,
} from "./truthTables";

export function evaluateGate(
  component: CircuitComponent
): LogicValue {
  const inputs = component.inputs.map((pin) => pin.value);

  const unary = unaryTruthTable[component.type];

  if (unary) {
    return unary(inputs[0]);
  }

  const binary = binaryTruthTable[component.type];

  if (binary) {
    return binary(inputs[0], inputs[1]);
  }

  return 0;
}