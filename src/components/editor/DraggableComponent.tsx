import { useRef, useState } from "react";
import { useCircuitStore } from "@/store";
import type { CircuitComponent } from "@/store/type";
import ComponentRenderer from "./ComponentRenderer";

interface Props {
  component: CircuitComponent;
}

function DraggableComponent({ component }: Props) {
  const selectedIds = useCircuitStore((state) => state.selectedIds);
  const selectComponent = useCircuitStore((state) => state.selectComponent);
  const moveComponent = useCircuitStore((state) => state.moveComponent);
  const saveHistory = useCircuitStore((state) => state.saveHistory);
  const selected = selectedIds.includes(component.id);

  const [dragging, setDragging] = useState(false);

  // Track if pointer is actively pressed down
  const isPointerDown = useRef(false);

  const offset = useRef({ x: 0, y: 0 });
  const pointerStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.pin === "true") {
      return;
    }

    // Set pointer active state
    isPointerDown.current = true;

    selectComponent(component.id);

    offset.current = {
      x: e.clientX - component.position.x,
      y: e.clientY - component.position.y,
    };

    pointerStart.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Return early if pointer is not pressed down
    if (!isPointerDown.current) return;

    if (!dragging) {
      const dx = e.clientX - pointerStart.current.x;
      const dy = e.clientY - pointerStart.current.y;

      if (Math.hypot(dx, dy) < 4) {
        return;
      }

      e.currentTarget.setPointerCapture(e.pointerId);
      saveHistory();
      setDragging(true);
    }

    moveComponent(component.id, {
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    // Reset active pointer state
    isPointerDown.current = false;
    setDragging(false);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      className={`absolute cursor-move rounded transition-shadow ${
        selected
          ? "ring-2 ring-blue-500 shadow-lg"
          : "hover:ring-1 hover:ring-zinc-500"
      }`}
      style={{
        transform: `translate(${component.position.x}px, ${component.position.y}px)`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <ComponentRenderer component={component} />
    </div>
  );
}

export default DraggableComponent;