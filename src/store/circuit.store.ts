import { create } from "zustand";
import type {
  CircuitComponent,
  Point,
  Wire,
  LogicValue,
} from "./type";
export type ToolType = "SELECT" | "WIRE" | "LABEL";

interface ActiveWire {
  componentId: string;
  pinId: string;
}

interface CircuitSnapshot {
  components: CircuitComponent[];
  wires: Wire[];
  selectedIds: string[];
}

interface CircuitStore {
  components: CircuitComponent[];
  wires: Wire[];
  selectedIds: string[];
  activeTool: ToolType;
  activeWire: ActiveWire | null;

  history: CircuitSnapshot[];
  future: CircuitSnapshot[];
  selectedWireId: string | null;

selectWire: (id: string | null) => void;

deleteSelected: () => void;

  undo: () => void;
  redo: () => void;

  startWire: (componentId: string, pinId: string) => void;
  cancelWire: () => void;
  addWire: (wire: Wire) => void;

  addComponent: (component: CircuitComponent) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string) => void;
  moveComponent: (id: string, position: Point) => void;
  setActiveTool: (tool: ToolType) => void;
toggleSwitch: (id: string) => void;
evaluateCircuit: () => void;
saveHistory: () => void;
pressButton: (id: string) => void;
releaseButton: (id: string) => void;
startClock: (id: string) => void;
stopClock: (id: string) => void;
isRunning: boolean;

runCircuit: () => void;
stopCircuit: () => void;
resetCircuit: () => void;

}

const clockIntervals = new Map<string, number>();

const createSnapshot = (
  state: CircuitStore
): CircuitSnapshot => ({
  components: structuredClone(state.components),
  wires: structuredClone(state.wires),
  selectedIds: [...state.selectedIds],
});

export const useCircuitStore = create<CircuitStore>((set,get) => ({
  components: [],
  wires: [],
  selectedIds: [],
  activeTool: "SELECT",
  activeWire: null,
  selectedWireId: null,
  isRunning: false,

  history: [],
  future: [],

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state;

      const previous = state.history[state.history.length - 1];

const current = createSnapshot(state);

      return {
        ...state,
        components: previous.components,
        wires: previous.wires,
        selectedIds: previous.selectedIds,
        history: state.history.slice(0, -1),
        future: [current, ...state.future],
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state;

      const next = state.future[0];

const current = createSnapshot(state);

      return {
        ...state,
        components: next.components,
        wires: next.wires,
        selectedIds: next.selectedIds,
        history: [...state.history, current],
        future: state.future.slice(1),
      };
    }),

  addComponent: (component) =>
    set((state) => ({
history: [
  ...state.history,
  createSnapshot(state),
],
      future: [],
      components: [...state.components, component],
    })),

removeComponent: (id) => {
  get().stopClock(id); // Stop clock interval if component is deleted

  set((state) => ({
    history: [...state.history, createSnapshot(state)],
    future: [],
    components: state.components.filter((c) => c.id !== id),
    wires: state.wires.filter(
      (wire) => wire.from.componentId !== id && wire.to.componentId !== id
    ),
  }));
},

  selectComponent: (id) =>
    set({
      selectedIds: [id],
    }),

  moveComponent: (id, position) =>
    set((state) => ({
      // history: [
      //   ...state.history,
      //   {
      //     components: state.components,
      //     wires: state.wires,
      //     selectedIds: state.selectedIds,
      //   },
      // ],
      // future: [],
      components: state.components.map((component) =>
        component.id === id
          ? { ...component, position }
          : component
      ),
    })),

  setActiveTool: (tool) =>
    set({
      activeTool: tool,
    }),

  startWire: (componentId, pinId) =>
    set({
      activeWire: {
        componentId,
        pinId,
      },
    }),

  cancelWire: () =>
    set({
      activeWire: null,
    }),

  addWire: (wire) =>
    set((state) => ({
history: [
  ...state.history,
  createSnapshot(state),
],
      future: [],
      wires: [...state.wires, wire],
      activeWire: null,
    })),

    selectWire: (id) =>
  set({
    selectedWireId: id,
    selectedIds: [],
  }),

  deleteSelected: () =>
  set((state) => {
    let components = state.components;
    let wires = state.wires;

    // Delete selected components
    if (state.selectedIds.length > 0) {
      const ids = new Set(state.selectedIds);

      components = components.filter(
        (c) => !ids.has(c.id)
      );

      wires = wires.filter(
        (w) =>
          !ids.has(w.from.componentId) &&
          !ids.has(w.to.componentId)
      );
    }

    // Delete selected wire
    if (state.selectedWireId) {
      wires = wires.filter(
        (w) => w.id !== state.selectedWireId
      );
    }

    return {
      ...state,

history: [
  ...state.history,
  createSnapshot(state),
],

      future: [],

      components,
      wires,

      selectedIds: [],
      selectedWireId: null,
    };
  }),
evaluateCircuit: () =>
  set((state) => {
    let components: CircuitComponent[] =
      state.components.map((component) => ({
        ...component,
        inputs: component.inputs.map((input) => ({
          ...input,
          value: 0 as LogicValue,
        })),
      }));

    /*
     * Run multiple passes.
     *
     * This allows:
     *
     * SWITCH → AND → OR → NOT → LED
     *
     * to propagate through the entire circuit.
     */
    for (
      let pass = 0;
      pass < components.length + 2;
      pass++
    ) {
      let changed = false;

      // ------------------------------------------
      // 1. Propagate signals through wires
      // ------------------------------------------

      components = components.map((component) => {
        const inputs = component.inputs.map((input) => {
          const wire = state.wires.find(
            (wire) =>
              wire.to.componentId === component.id &&
              wire.to.pinId === input.id
          );

          // No wire connected to this input
          if (!wire) {
            return input;
          }

          const sourceComponent = components.find(
            (source) =>
              source.id === wire.from.componentId
          );

          if (!sourceComponent) {
            return input;
          }

          const sourcePin =
            sourceComponent.outputs.find(
              (output) =>
                output.id === wire.from.pinId
            );

          if (!sourcePin) {
            return input;
          }

          if (input.value !== sourcePin.value) {
            changed = true;
          }

          return {
            ...input,
            value: sourcePin.value,
          };
        });

        return {
          ...component,
          inputs,
        };
      });

      // ------------------------------------------
      // 2. Evaluate gates
      // ------------------------------------------

      components = components.map((component) => {
        const inputs = component.inputs.map(
          (input) => input.value
        );

        let outputValue: LogicValue = 0;

        switch (component.type) {
          // ------------------------------------
          // AND
          // ------------------------------------

          case "AND":
            outputValue = inputs.every(
              (value) => value === 1
            )
              ? 1
              : 0;
            break;

          // ------------------------------------
          // OR
          // ------------------------------------

          case "OR":
            outputValue = inputs.some(
              (value) => value === 1
            )
              ? 1
              : 0;
            break;

          // ------------------------------------
          // NOT
          // ------------------------------------

          case "NOT":
            outputValue =
              inputs[0] === 1 ? 0 : 1;
            break;

          // ------------------------------------
          // NAND
          // ------------------------------------

          case "NAND":
            outputValue = inputs.every(
              (value) => value === 1
            )
              ? 0
              : 1;
            break;

          // ------------------------------------
          // NOR
          // ------------------------------------

          case "NOR":
            outputValue = inputs.some(
              (value) => value === 1
            )
              ? 0
              : 1;
            break;

          // ------------------------------------
          // XOR
          // ------------------------------------

          case "XOR": {
            const ones = inputs.filter(
              (value) => value === 1
            ).length;

            outputValue =
              ones % 2 === 1 ? 1 : 0;

            break;
          }

          // ------------------------------------
          // XNOR
          // ------------------------------------

          case "XNOR": {
            const ones = inputs.filter(
              (value) => value === 1
            ).length;

            outputValue =
              ones % 2 === 0 ? 1 : 0;

            break;
          }

          // ------------------------------------
          // BUFFER
          // ------------------------------------

          case "BUFFER":
            outputValue = inputs[0] ?? 0;
            break;

          // ------------------------------------
          // SWITCH
          // ------------------------------------

          case "SWITCH":
            // Switch output is controlled
            // manually.
            outputValue =
              component.outputs[0]?.value ?? 0;
            break;

          // ------------------------------------
          // BUTTON
          // ------------------------------------

          case "BUTTON":
            outputValue =
              component.outputs[0]?.value ?? 0;
            break;

          // ------------------------------------
          // CLOCK
          // ------------------------------------

          case "CLOCK":
            outputValue =
              component.outputs[0]?.value ?? 0;
            break;

          // ------------------------------------
          // LED / PROBE
          // ------------------------------------

          case "LED":
          case "PROBE":
            return component;

          default:
            outputValue = 0;
        }

        const outputs = component.outputs.map(
          (output) => {
            if (output.value !== outputValue) {
              changed = true;
            }

            return {
              ...output,
              value: outputValue,
            };
          }
        );

        return {
          ...component,
          outputs,
        };
      });

      // Circuit has stabilized
      if (!changed) {
        break;
      }
    }

    return {
      components,
    };
  }),

toggleSwitch: (id) => {
  set((state) => {
    const switchComponent = state.components.find(
      (component) => component.id === id
    );

    if (
      !switchComponent ||
      switchComponent.type !== "SWITCH"
    ) {
      return {};
    }

    const newValue: LogicValue =
      switchComponent.outputs[0]?.value === 1
        ? 0
        : 1;

    const components: CircuitComponent[] =
      state.components.map((component) => {
        if (component.id !== id) {
          return component;
        }

        return {
          ...component,

          outputs: component.outputs.map(
            (output) => ({
              ...output,
              value: newValue,
            })
          ),
        };
      });

    return {
      components,

history: [
  ...state.history,
  createSnapshot(state),
],

      future: [],
    };
  });

if (get().isRunning) {
  get().evaluateCircuit();
}},
saveHistory: () =>
  set((state) => ({
history: [
  ...state.history,
  createSnapshot(state),
],
    future: [],
  })),

  pressButton: (id) => {
  set((state) => ({
    components: state.components.map((component) =>
      component.id === id
        ? {
            ...component,
            outputs: component.outputs.map((o) => ({
              ...o,
              value: 1 as LogicValue ,
            })),
          }
        : component
    ),
  }));

if (get().isRunning) {
  get().evaluateCircuit();
}},

releaseButton: (id) => {
  set((state) => ({
    components: state.components.map((component) =>
      component.id === id
        ? {
            ...component,
            outputs: component.outputs.map((o) => ({
              ...o,
              value: 0 as LogicValue,
            })),
          }
        : component 
    ),
  }));

if (get().isRunning) {
  get().evaluateCircuit();
}},

// --- Refactored Clock & Execution Handlers ---

startClock: (id) => {
  // Prevent duplicate intervals for the same component
  if (clockIntervals.has(id)) return;

  const interval = window.setInterval(() => {
    // Only continue running if simulation is active
    if (!get().isRunning) {
      get().stopClock(id);
      return;
    }

    set((state) => {
      const components = state.components.map((component) => {
        if (component.id !== id) return component;

        return {
          ...component,
          outputs: component.outputs.map((output) => ({
            ...output,
            value: (output.value === 1 ? 0 : 1) as LogicValue,
          })),
        };
      });

      return { components };
    });

    get().evaluateCircuit();
  }, 500);

  clockIntervals.set(id, interval);
},

stopClock: (id) => {
  const interval = clockIntervals.get(id);
  if (interval !== undefined) {
    clearInterval(interval);
    clockIntervals.delete(id);
  }
},

runCircuit: () => {
  // Prevent multiple concurrent execution loops
  if (get().isRunning) return;

  set({ isRunning: true });

  get().evaluateCircuit();

  get().components.forEach((component) => {
    if (component.type === "CLOCK") {
      get().startClock(component.id);
    }
  });
},

stopCircuit: () => {
  // 1. Clear ALL active intervals globally to stop lingering clocks
  clockIntervals.forEach((interval) => clearInterval(interval));
  clockIntervals.clear();

  // 2. Update running state
  set({ isRunning: false });
},

resetCircuit: () => {
  get().stopCircuit();

  set((state) => ({
    components: state.components.map((component) => ({
      ...component,
      inputs: component.inputs.map((pin) => ({
        ...pin,
        value: 0 as LogicValue,
      })),
      outputs: component.outputs.map((pin) => ({
        ...pin,
        value: 0 as LogicValue,
      })),
    })),
  }));
},

}));