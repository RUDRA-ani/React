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

  const selected = selectedIds.includes(component.id);

  const [dragging, setDragging] = useState(false);

  const offset = useRef({
    x: 0,
    y: 0,
  });

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {

      console.log("pointer down");

  
      if ((e.target as HTMLElement).dataset.pin === "true") {
    return;
  }

    selectComponent(component.id);

    setDragging(true);

    offset.current = {
      x: e.clientX - component.position.x,
      y: e.clientY - component.position.y,
    };

   };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragging) return;

    moveComponent(component.id, {
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    setDragging(false);

    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className={`absolute cursor-move rounded transition-shadow ${
        selected
          ? "ring-2 ring-blue-500 shadow-lg"
          : "hover:ring-1 hover:ring-zinc-500"
      }`}
      style={{
        left: component.position.x,
        top: component.position.y,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <ComponentRenderer component={component} />
    </div>
  );
}

export default DraggableComponent;