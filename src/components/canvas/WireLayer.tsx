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
  const getOutputValue = (componentId: string, pinId: string) =>
  components
    .find((c) => c.id === componentId)
    ?.outputs.find((p) => p.id === pinId)?.value ?? 0;

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
{(() => {
  const d = `M ${start.x} ${start.y} C ${start.x + 60} ${start.y}, ${end.x - 60} ${end.y}, ${end.x} ${end.y}`;
  const on = getOutputValue(wire.from.componentId, wire.from.pinId) === 1;
  return (
    <>
      {/* invisible click area */}
      <path
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        pointerEvents="stroke"
        onClick={(e) => {
          e.stopPropagation();
          selectWire(wire.id);
        }}
      />
      {/* visible wire */}
      <path
        d={d}
        fill="none"
        stroke={selected ? "#3b82f6" : on ? "#22c55e" : "#71717a"}
        strokeWidth={selected ? 4 : 2}
        pointerEvents="none"
      />
    </>
  );
})()}

            {/* Visible wire */}
{(() => {
  const d = `M ${start.x} ${start.y} C ${start.x + 60} ${start.y}, ${end.x - 60} ${end.y}, ${end.x} ${end.y}`;
  const on = getOutputValue(wire.from.componentId, wire.from.pinId) === 1;
  return (
    <>
      {/* invisible click area */}
      <path
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth={12}
        pointerEvents="stroke"
        onClick={(e) => {
          e.stopPropagation();
          selectWire(wire.id);
        }}
      />
      {/* visible wire */}
      <path
        d={d}
        fill="none"
        stroke={selected ? "#3b82f6" : on ? "#22c55e" : "#71717a"}
        strokeWidth={selected ? 4 : 2}
        pointerEvents="none"
      />
    </>
  );
})()}
          </g>
        );
      })}
    </svg>
  );
}

export default WireLayer;