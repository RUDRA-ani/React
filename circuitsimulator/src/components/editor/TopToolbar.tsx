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
  Undo2,
  ZoomIn,
  ZoomOut,
  Delete
} from "lucide-react";

import { useCircuitStore } from "@/store";

import { SidebarTrigger } from "@/components/ui/sidebar";

function TopToolbar() {

  const undo = useCircuitStore((state) => state.undo);
  const redo = useCircuitStore((state) => state.redo);
  const deleteSelected = useCircuitStore(
  (state) => state.deleteSelected
);
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4">

      {/* Left */}
      <div className="flex items-center gap-2">

        <SidebarTrigger className="text-white hover:bg-zinc-800 rounded-md" />

        <h1 className="mr-6 text-sm font-semibold text-zinc-100">
          Logic Studio
        </h1>

        <ToolbarButton icon={<FolderOpen size={18} />} label="Open" />
        <ToolbarButton icon={<Save size={18} />} label="Save" />
        <ToolbarButton icon={<Download size={18} />} label="Export" />
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

        <ToolbarButton icon={<Play size={18} />} label="Run" />
        <ToolbarButton icon={<Square size={18} />} label="Stop" />
        <ToolbarButton icon={<RotateCcw size={18} />} label="Reset" />
<ToolbarButton
  icon={<Delete size={18} />}
  label="Delete"
  onClick={deleteSelected}
/>
      </div>

      {/* Right */}

      <div className="flex items-center gap-2">

        <ToolbarButton
          icon={<Settings size={18} />}
          label="Settings"
        />

      </div>

    </header>
  );
}

function ToolbarButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      title={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-md text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
    >
      {icon}
    </button>
  );
}

function Divider() {
  return (
    <div className="mx-2 h-6 w-px bg-zinc-700" />
  );
}

export default TopToolbar;