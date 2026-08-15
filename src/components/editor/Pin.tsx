import type { Pin as CircuitPin } from "@/store/type";
import { useCircuitStore } from "@/store";

interface PinProps {
  pin: CircuitPin;
  componentId: string;
}

export default function Pin({ pin, componentId }: PinProps) {
const startWire = useCircuitStore((state) => state.startWire);
const addWire = useCircuitStore((state) => state.addWire);
const activeWire = useCircuitStore((state) => state.activeWire);

  return (
    <div
      className="absolute w-3 h-3 rounded-full bg-blue-500 border border-white cursor-pointer z-50"
      style={{
        left: pin.position.x - 6,
        top: pin.position.y - 6,
      }}
      onPointerDown={(e) => {
        e.stopPropagation(); // Prevent drag from starting
      }}
onClick={(e) => {
  e.stopPropagation();

  if (pin.type === "output") {
    startWire(componentId, pin.id);
    return;
  }

  if (pin.type === "input" && activeWire) {
    addWire({
      id: crypto.randomUUID(),
      from: activeWire,
      to: {
        componentId,
        pinId: pin.id,
      },
    });
  }
}}
    />
  );
}