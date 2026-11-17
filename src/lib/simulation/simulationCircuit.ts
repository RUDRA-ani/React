import type { CircuitComponent, Wire } from "@/store/type";

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
): CircuitComponent[] {
  // Work on a copy so the store's objects are never mutated
  const draft = structuredClone(components);

  const MAX_ITERATIONS = 20;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    let changed = false;

    propagateWires(draft, wires);

    for (const component of draft) {
      if (NON_LOGIC_COMPONENTS.has(component.type)) continue;

      const output = evaluateGate(component);

      if (component.outputs.length && component.outputs[0].value !== output) {
        component.outputs[0].value = output;
        changed = true;
      }
    }

    if (!changed) break;
  }

  // One last propagate so LED/PROBE inputs get the settled values
  propagateWires(draft, wires);

  // Did any pin value actually change?
  const same = draft.every((d, i) => {
    const o = components[i];
    return (
      d.inputs.every((p, j) => p.value === o.inputs[j].value) &&
      d.outputs.every((p, j) => p.value === o.outputs[j].value)
    );
  });

  // Return the original array if nothing changed, so the caller can skip the update
  return same ? components : draft;
}