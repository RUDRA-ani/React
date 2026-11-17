import { useRef } from "react";
import { useCircuitStore } from "@/store";
import { useShortcuts } from "@/hooks/useShortcuts";

import GridLayer from "./GridLayer";
import WireLayer from "./WireLayer";
import ComponentLayer from "./ComponentLayer";
import LabelLayer from "./LabelLayer";
import SelectionLayer from "./SelectionLayer";
import OverlayLayer from "./OverlayLayer";
import SimulationLayer from "./SimulationLayer";

function CircuitCanvas() {
  useShortcuts();

  const ref = useRef<HTMLDivElement>(null);
  const activeTool = useCircuitStore((s) => s.activeTool);
  const addLabel = useCircuitStore((s) => s.addLabel);
  const setActiveTool = useCircuitStore((s) => s.setActiveTool);

  // onClick (not onPointerDown) so the new label's input keeps focus
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool !== "LABEL") return;

    const target = e.target as HTMLElement;
    if (target.closest("[data-component]") || target.closest("[data-label]")) {
      return;
    }

    const rect = ref.current!.getBoundingClientRect();
    addLabel({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setActiveTool("SELECT");
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`relative h-full w-full overflow-hidden bg-zinc-900 ${
        activeTool === "LABEL" ? "cursor-text" : ""
      }`}
    >
      <GridLayer />
      <WireLayer />
      <ComponentLayer />
      <LabelLayer />
      <SimulationLayer />
      <SelectionLayer />
      <OverlayLayer />
    </div>
  );
}

export default CircuitCanvas;