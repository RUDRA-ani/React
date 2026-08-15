// components/canvas/SimulationLayer.tsx

import { useEffect } from "react";
import { useCircuitStore } from "@/store";
import { simulateCircuit } from "../../lib/simulation/simulationCircuit";

function SimulationLayer() {
  const components = useCircuitStore((state) => state.components);
  const wires = useCircuitStore((state) => state.wires);

  useEffect(() => {
    simulateCircuit(components, wires);
  }, [components, wires]);

  return null;
}

export default SimulationLayer;