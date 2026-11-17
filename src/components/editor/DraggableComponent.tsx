import { memo, useRef } from "react";
import { useCircuitStore } from "@/store";
import type { CircuitComponent } from "@/store/type";
import ComponentRenderer from "./ComponentRenderer";

interface Props {
  component: CircuitComponent;
}

function DraggableComponent({ component }: Props) {
  const selected = useCircuitStore((state) =>
    state.selectedIds.includes(component.id)
  );
  const selectComponent = useCircuitStore((state) => state.selectComponent);
  const moveComponent = useCircuitStore((state) => state.moveComponent);
  const pushHistory = useCircuitStore((state) => state.pushHistory);
  const setButton = useCircuitStore((state) => state.setButton);
  const dragging = useRef(false);
  const captured = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const pending = useRef<{ x: number; y: number } | null>(null);
  const rafId = useRef<number | null>(null);

  const flush = () => {
    rafId.current = null;
    if (pending.current) {
      moveComponent(component.id, pending.current);
      pending.current = null;
    }
  };

const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
  if ((e.target as HTMLElement).closest("[data-pin]")) return;

  console.log("down on", component.type); // temporary

  selectComponent(component.id);

  // Momentary button: 1 while held, 0 on release
  if (component.type === "BUTTON" && e.button === 0) {
    setButton(component.id, 1);
    const release = () => {
      setButton(component.id, 0);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
  }

  dragging.current = true;
  captured.current = false;
  startPoint.current = { x: e.clientX, y: e.clientY };
  offset.current = {
    x: e.clientX - component.position.x,
    y: e.clientY - component.position.y,
  };
};

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    if (!captured.current) {
      const moved = Math.hypot(
        e.clientX - startPoint.current.x,
        e.clientY - startPoint.current.y
      );
      if (moved < 4) return; // still a click

      captured.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      pushHistory(); // one undo step per drag
    }

pending.current = {
  x: e.clientX - offset.current.x,
  y: e.clientY - offset.current.y,
};

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(flush);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;

    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      flush();
    }

    const SNAP = 12;
const { components } = useCircuitStore.getState();
const c = components.find((c) => c.id === component.id);
if (c) {
  moveComponent(component.id, {
    x: Math.round(c.position.x / SNAP) * SNAP,
    y: Math.round(c.position.y / SNAP) * SNAP,
  });
}

    if (captured.current && e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    captured.current = false;
  };

  return (
    <div
      data-component="true"
      className={`absolute left-0 top-0 cursor-move rounded select-none touch-none will-change-transform ${
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

export default memo(DraggableComponent);