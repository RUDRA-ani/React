import { useEffect } from "react";
import { useCircuitStore } from "@/store";

function SimulationLayer() {
  const status = useCircuitStore((state) => state.simStatus);

  const logicSignature = useCircuitStore((state) => {
    const comps = state.components
      .map(
        (c) =>
          `${c.id}:${c.type}:` +
          `${c.inputs.map((p) => p.value).join(",")}:` +
          `${c.outputs.map((p) => p.value).join(",")}`
      )
      .join("|");

    const wires = state.wires
      .map(
        (w) =>
          `${w.from.componentId}.${w.from.pinId}>${w.to.componentId}.${w.to.pinId}`
      )
      .join("|");

    return comps + "#" + wires;
  });

  // Re-evaluate whenever the circuit changes, but only while running
  useEffect(() => {
    if (status !== "RUNNING") return;
    useCircuitStore.getState().evaluateCircuit();
  }, [logicSignature, status]);

  // Clock generators tick only while running
  useEffect(() => {
    if (status !== "RUNNING") return;
    const id = setInterval(
      () => useCircuitStore.getState().tickClocks(),
      500
    );
    return () => clearInterval(id);
  }, [status]);

  return null;
}

export default SimulationLayer;