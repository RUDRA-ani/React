import GridLayer from "./GridLayer";
import WireLayer from "./WireLayer";
import ComponentLayer from "./ComponentLayer";
import SelectionLayer from "./SelectionLayer";
import OverlayLayer from "./OverlayLayer";
import SimulationLayer from "./SimulationLayer";
function CircuitCanvas() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
<GridLayer />

<WireLayer />

<ComponentLayer />

<SimulationLayer />

<SelectionLayer />

<OverlayLayer />
    </div>
  );
}

export default CircuitCanvas;