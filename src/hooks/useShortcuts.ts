import { useEffect } from "react";
import { useCircuitStore } from "@/store";

export function useShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const s = useCircuitStore.getState();
      const mod = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (mod && key === "z") {
        e.preventDefault();
        e.shiftKey ? s.redo() : s.undo();
      } else if (mod && key === "y") {
        e.preventDefault();
        s.redo();
      } else if (key === "delete" || key === "backspace") {
        s.deleteSelected();
      } else if (key === "escape") {
        s.cancelWire();
        s.setActiveTool("SELECT");
      } else if (key === " ") {
        e.preventDefault();
        s.simStatus === "RUNNING" ? s.pauseSimulation() : s.runSimulation();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}