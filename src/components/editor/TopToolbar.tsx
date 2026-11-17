import {
  Download,
  FolderOpen,
  Play,
  Pause,
  Redo2,
  RotateCcw,
  Save,
  Search,
  Settings,
  Square,
  Undo2,
  ZoomIn,
  ZoomOut,
  Delete,
  MousePointer2,
  Type
} from "lucide-react";
import { useRef } from "react";

import { useCircuitStore } from "@/store";

import { SidebarTrigger } from "@/components/ui/sidebar";

function TopToolbar() {

  const undo = useCircuitStore((state) => state.undo);
  const redo = useCircuitStore((state) => state.redo);
  const deleteSelected = useCircuitStore(
  (state) => state.deleteSelected
);
const activeTool = useCircuitStore((s) => s.activeTool);
const setActiveTool = useCircuitStore((s) => s.setActiveTool);
const simStatus = useCircuitStore((s) => s.simStatus);
const runSimulation = useCircuitStore((s) => s.runSimulation);
const pauseSimulation = useCircuitStore((s) => s.pauseSimulation);
const stopSimulation = useCircuitStore((s) => s.stopSimulation);
const resetSimulation = useCircuitStore((s) => s.resetSimulation);
const fileRef = useRef<HTMLInputElement>(null);
const loadCircuit = useCircuitStore((s) => s.loadCircuit);

const saveFile = () => {
  const { components, wires,labels } = useCircuitStore.getState();
  const blob = new Blob(
    [JSON.stringify({ version: 1, components, wires,labels}, null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "circuit.json";
  a.click();
  URL.revokeObjectURL(url);
};

const openFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (Array.isArray(data.components) && Array.isArray(data.wires)) {
      loadCircuit(data.components, data.wires, data.labels ?? []);
    }
  } catch {
    alert("Invalid circuit file");
  }
  e.target.value = "";
};

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4">

      {/* Left */}
      <div className="flex items-center gap-2">

        <SidebarTrigger className="text-white hover:bg-zinc-800 rounded-md" />

        <h1 className="mr-6 text-sm font-semibold text-zinc-100">
          Logic Studio
        </h1>
<ToolbarButton icon={<FolderOpen size={18} />} label="Open" onClick={() => fileRef.current?.click()} />
<ToolbarButton icon={<Save size={18} />} label="Save" onClick={saveFile} />
<ToolbarButton icon={<Download size={18} />} label="Export" onClick={saveFile} />
<input ref={fileRef} type="file" accept="application/json" hidden onChange={openFile} />
      </div>

<Divider />
      {/* Center */}

      <div className="flex items-center gap-2">
        <ToolbarButton
  icon={<MousePointer2 size={18} />}
  label="Select"
  active={activeTool === "SELECT"}
  onClick={() => setActiveTool("SELECT")}
/>
<ToolbarButton
  icon={<Type size={18} />}
  label="Add label"
  active={activeTool === "LABEL"}
  onClick={() => setActiveTool("LABEL")}
/>

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
  active={simStatus === "RUNNING"}
  onClick={runSimulation}
/>
<ToolbarButton
  icon={<Pause size={18} />}
  label="Pause"
  active={simStatus === "PAUSED"}
  onClick={pauseSimulation}
/>
<ToolbarButton
  icon={<Square size={18} />}
  label="Stop"
  onClick={stopSimulation}
/>
<ToolbarButton
  icon={<RotateCcw size={18} />}
  label="Reset"
  onClick={resetSimulation}
/>
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
  icon, label, onClick, active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      title={label}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-zinc-800 hover:text-white ${
        active ? "bg-zinc-800 text-green-400" : "text-zinc-300"
      }`}
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