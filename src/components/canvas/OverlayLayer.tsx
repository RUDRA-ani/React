import { useEffect, useRef, useState } from "react";
import { useCircuitStore } from "@/store";

function OverlayLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const activeWire = useCircuitStore((s) => s.activeWire);
  const components = useCircuitStore((s) => s.components);

  useEffect(() => {
    if (!activeWire) return;
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [activeWire]);

  const comp = activeWire && components.find((c) => c.id === activeWire.componentId);
  const pin = comp?.outputs.find((p) => p.id === activeWire?.pinId);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      {comp && pin && (
        <svg className="h-full w-full">
          <line
            x1={comp.position.x + pin.position.x}
            y1={comp.position.y + pin.position.y}
            x2={mouse.x}
            y2={mouse.y}
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
        </svg>
      )}
    </div>
  );
}

export default OverlayLayer;