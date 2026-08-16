import {
  Download,
  FolderOpen,
  Play,
  Redo2,
  RotateCcw,
  Save,
  Search,
  Settings,
  Square,
  Trash2, // Replaced 'Delete' with standard 'Trash2' icon from Lucide
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { useCircuitStore } from "@/store";
import { SidebarTrigger } from "@/components/ui/sidebar";

function TopToolbar() {
  const undo = useCircuitStore((state) => state.undo);
  const redo = useCircuitStore((state) => state.redo);
  const deleteSelected = useCircuitStore((state) => state.deleteSelected);

  const runCircuit = useCircuitStore((state) => state.runCircuit);
  const stopCircuit = useCircuitStore((state) => state.stopCircuit);
  const resetCircuit = useCircuitStore((state) => state.resetCircuit);

  // Optional: Track running state to conditionally toggle button states
  const isRunning = useCircuitStore((state) => state.isRunning);

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4">
      {/* Left */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="rounded-md text-white hover:bg-zinc-800" />
        <h1 className="mr-6 text-sm font-semibold text-zinc-100">
          Logic Studio
        </h1>
      </div>

      {/* Center */}
      <div className="flex items-center gap-2">
        <ToolbarButton
          icon={<Undo2 size={18} />}
          label="Undo"
          onClick={undo}
        />
        <ToolbarButton
          icon={<Redo2 size={18} />}
          label="Redo"
          onClick={redo}
        />

        <Divider />

        <ToolbarButton icon={<ZoomOut size={18} />} label="Zoom Out" />
        <ToolbarButton icon={<Search size={18} />} label="Fit" />
        <ToolbarButton icon={<ZoomIn size={18} />} label="Zoom In" />

        <Divider />

        <ToolbarButton
          icon={<Play size={18} />}
          label="Run"
          onClick={runCircuit}
          className={isRunning ? "text-green-400" : ""}
        />

        <ToolbarButton
          icon={<Square size={18} className="fill-current" />}
          label="Stop"
          onClick={() => {
            if (typeof stopCircuit === "function") {
              stopCircuit();
            }
          }}
        />

        <ToolbarButton
          icon={<RotateCcw size={18} />}
          label="Reset"
          onClick={resetCircuit}
        />

        <ToolbarButton
          icon={<Trash2 size={18} />}
          label="Delete"
          onClick={deleteSelected}
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <ToolbarButton icon={<Settings size={18} />} label="Settings" />
      </div>
    </header>
  );
}

function ToolbarButton({
  icon,
  label,
  onClick,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-md text-zinc-300 transition hover:bg-zinc-800 hover:text-white ${className}`}
    >
      {icon}
    </button>
  );
}

function Divider() {
  return <div className="mx-2 h-6 w-px bg-zinc-700" />;
}

export default TopToolbar;