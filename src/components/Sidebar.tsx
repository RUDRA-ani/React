import type { ElementType } from "react";
import {
  Cable,
  Circle,
  Clock3,
  GitBranch,
  Lightbulb,
  NotepadText,
  Radio,
  ToggleLeft,
  Zap,
} from "lucide-react";

import {
  Sidebar as ShellSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import type { GateType } from "@/store/type";
import { useCircuitStore } from "@/store";
import { createComponent } from "@/lib/componentFactory";

type ComponentItem = {
  name: string;
  icon: ElementType;
  type: GateType;
};

type ToolType = "SELECT" | "WIRE" | "LABEL";

type UtilityItem = {
  name: string;
  icon: ElementType;
  tool: ToolType;
};

const inputComponents: ComponentItem[] = [
  { name: "Switch", icon: ToggleLeft, type: "SWITCH" },
  { name: "Button", icon: Circle, type: "BUTTON" },
  { name: "Clock", icon: Clock3, type: "CLOCK" },
];

const gateComponents: ComponentItem[] = [
  { name: "AND", icon: GitBranch, type: "AND" },
  { name: "OR", icon: GitBranch, type: "OR" },
  { name: "NOT", icon: Zap, type: "NOT" },
  { name: "NAND", icon: GitBranch, type: "NAND" },
  { name: "NOR", icon: GitBranch, type: "NOR" },
  { name: "XOR", icon: GitBranch, type: "XOR" },
  { name: "XNOR", icon: GitBranch, type: "XNOR" },
  { name: "Buffer", icon: Zap, type: "BUFFER" },
];

const outputComponents: ComponentItem[] = [
  { name: "LED", icon: Lightbulb, type: "LED" },
  { name: "Logic Probe", icon: Radio, type: "PROBE" },
];

const utilityComponents: UtilityItem[] = [
  { name: "Wire", icon: Cable, tool: "WIRE" },
  { name: "Label", icon: NotepadText, tool: "LABEL" },
];

function ComponentGroup({
  label,
  items,
  onSelect,
}: {
  label: string;
  items: ComponentItem[];
  onSelect?: (type: GateType) => void;
}) {
  const handleDragStart = (e: React.DragEvent, type: GateType) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                tooltip={item.name}
                draggable
                onDragStart={(e) => handleDragStart(e, item.type)}
                onClick={() => onSelect?.(item.type)}
                className="cursor-grab active:cursor-grabbing"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function UtilityGroup({
  label,
  items,
}: {
  label: string;
  items: UtilityItem[];
}) {
  const activeTool = useCircuitStore((state) => state.activeTool);
  const setActiveTool = useCircuitStore((state) => state.setActiveTool);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = activeTool === item.tool;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  tooltip={item.name}
                  isActive={isActive}
                  onClick={() => {
                    // Toggle tool off if clicked again, returning to default SELECT
                    setActiveTool(isActive ? "SELECT" : item.tool);
                  }}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function EditorSidebar() {
  const addComponent = useCircuitStore((state) => state.addComponent);

  return (
    <ShellSidebar collapsible="icon">
      <SidebarContent>
        <ComponentGroup
          label="Inputs"
          items={inputComponents}
          onSelect={(type) => addComponent(createComponent(type, 200, 200))}
        />

        <ComponentGroup
          label="Logic Gates"
          items={gateComponents}
          onSelect={(type) => addComponent(createComponent(type, 200, 200))}
        />

        <ComponentGroup
          label="Outputs"
          items={outputComponents}
          onSelect={(type) => addComponent(createComponent(type, 200, 200))}
        />

        <UtilityGroup label="Utilities" items={utilityComponents} />
      </SidebarContent>
    </ShellSidebar>
  );
}