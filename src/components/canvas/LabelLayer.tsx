import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useCircuitStore } from "@/store";
import type { TextLabel } from "@/store/type";

function LabelItem({ label }: { label: TextLabel }) {
  const updateLabel = useCircuitStore((s) => s.updateLabel);
  const removeLabel = useCircuitStore((s) => s.removeLabel);

  // A brand-new label (empty text) starts in edit mode
  const [editing, setEditing] = useState(label.text === "");
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  return (
    <div
      data-label="true"
      className="group pointer-events-auto absolute left-0 top-0 flex items-center gap-1 rounded px-1 select-none hover:ring-1 hover:ring-zinc-500"
      style={{
        transform: `translate(${label.position.x}px, ${label.position.y}px)`,
        cursor: editing ? "text" : "move",
      }}
      onPointerDown={(e) => {
        if (editing) return;
        drag.current = {
          dx: e.clientX - label.position.x,
          dy: e.clientY - label.position.y,
        };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        updateLabel(label.id, {
          position: {
            x: e.clientX - drag.current.dx,
            y: e.clientY - drag.current.dy,
          },
        });
      }}
      onPointerUp={(e) => {
        drag.current = null;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      }}
      onDoubleClick={() => setEditing(true)}
    >
      {editing ? (
        <input
          autoFocus
          value={label.text}
          placeholder="Label"
          style={{ width: `${Math.max(label.text.length, 5)}ch` }}
          className="bg-transparent text-sm text-zinc-100 outline-none"
          onChange={(e) => updateLabel(label.id, { text: e.target.value })}
          onBlur={() => {
            if (label.text.trim() === "") removeLabel(label.id);
            else setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Escape") e.currentTarget.blur();
          }}
        />
      ) : (
        <span className="text-sm text-zinc-100">{label.text}</span>
      )}

      {!editing && (
        <button
          className="hidden text-zinc-400 hover:text-red-400 group-hover:block"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => removeLabel(label.id)}
          title="Delete label"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}

function LabelLayer() {
  const labels = useCircuitStore((s) => s.labels);

  return (
    <div className="pointer-events-none absolute inset-0">
      {labels.map((l) => (
        <LabelItem key={l.id} label={l} />
      ))}
    </div>
  );
}

export default LabelLayer;