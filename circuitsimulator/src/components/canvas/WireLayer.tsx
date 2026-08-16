import { useCircuitStore } from "@/store";

function WireLayer() {
  const wires = useCircuitStore((state) => state.wires);
  const components = useCircuitStore((state) => state.components);
  const selectedWireId = useCircuitStore(
    (state) => state.selectedWireId
  );
  const selectWire = useCircuitStore(
    (state) => state.selectWire
  );

  const getPinPosition = (
    componentId: string,
    pinId: string
  ) => {
    const component = components.find(
      (c) => c.id === componentId
    );

    if (!component) return null;

    const pin =
      component.inputs.find((p) => p.id === pinId) ??
      component.outputs.find((p) => p.id === pinId);

    if (!pin) return null;

    return {
      x: component.position.x + pin.position.x,
      y: component.position.y + pin.position.y,
    };
  };

  return (
    <svg
      className="absolute inset-0 h-full w-full z-10"
      style={{ pointerEvents: "none" }}
    >
      {wires.map((wire) => {
        const start = getPinPosition(
          wire.from.componentId,
          wire.from.pinId
        );

        const end = getPinPosition(
          wire.to.componentId,
          wire.to.pinId
        );

        if (!start || !end) return null;

        const selected = selectedWireId === wire.id;

        return (
          <g key={wire.id}>
            {/* Invisible click area */}
            <line
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="transparent"
              strokeWidth={12}
              pointerEvents="stroke"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Wire clicked", wire.id);
                selectWire(wire.id);
              }}
            />

            {/* Visible wire */}
            <line
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={selected ? "#3b82f6" : "white"}
              strokeWidth={selected ? 4 : 2}
              pointerEvents="none"
            />
          </g>
        );
      })}
    </svg>
  );
}

export default WireLayer;