import type {
  CircuitComponent,
  Wire,
} from "@/store/type";

import { evaluateGate } from "./evaluateGate";
import { propagateWires } from "./propagateWires";

const NON_LOGIC_COMPONENTS = new Set([
  "SWITCH",
  "BUTTON",
  "CLOCK",
  "LED",
  "PROBE",
]);

export function simulateCircuit(
  components: CircuitComponent[],
  wires: Wire[]
) {

  
  const MAX_ITERATIONS = 20;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    let changed = false;

    // Move values through wires
    propagateWires(components, wires);

    // Evaluate every logic gate
    for (const component of components) {
      if (NON_LOGIC_COMPONENTS.has(component.type))
        continue;

      const output = evaluateGate(component);

      if (
        component.outputs.length &&
        component.outputs[0].value !== output
      ) {
        component.outputs[0].value = output;
        changed = true;
      }
    }

    // Stable circuit
    if (!changed) {
      break;
    }
  }
}