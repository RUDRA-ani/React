import {
  AndGate,
  OrGate,
  NotGate,
  NandGate,
  NorGate,
  XorGate,
  XnorGate,
  BufferGate,
  Led,
  LogicProbe,
  Switch,
  Button,
  ClockGenerator,
} from "../assets";

import { useCircuitStore } from "@/store";

import Pin from "./Pin";
import type { CircuitComponent } from "@/store/type";
interface Props {
  component: CircuitComponent;
}

function ComponentRenderer({ component }: Props) {
  const toggleSwitch = useCircuitStore(
    (state) => state.toggleSwitch
  );
  const pressButton = useCircuitStore(
  (state) => state.pressButton
);

const releaseButton = useCircuitStore(
  (state) => state.releaseButton
);

const startClock = useCircuitStore(
  (state) => state.startClock
);

const stopClock = useCircuitStore(
  (state) => state.stopClock
);

  let Gate: React.ElementType;

  switch (component.type) {
    case "AND":
      Gate = AndGate;
      break;

    case "OR":
      Gate = OrGate;
      break;

    case "NOT":
      Gate = NotGate;
      break;

    case "NAND":
      Gate = NandGate;
      break;

    case "NOR":
      Gate = NorGate;
      break;

    case "XOR":
      Gate = XorGate;
      break;

    case "XNOR":
      Gate = XnorGate;
      break;

    case "BUFFER":
      Gate = BufferGate;
      break;

    case "LED":
      Gate = Led;
      break;

    case "PROBE":
      Gate = LogicProbe;
      break;

    case "SWITCH":
      Gate = Switch;
      break;

    case "BUTTON":
      Gate = Button;
      break;

    case "CLOCK":
      Gate = ClockGenerator;
      break;

    default:
      return null;
  }
 return (
  <div className="relative">
    {component.type === "SWITCH" ? (
      <Switch
        state={component.outputs[0].value === 1}
        onClick={(e) => {
          e.stopPropagation();
          toggleSwitch(component.id);
        }}
      />
    ) : component.type === "BUTTON" ? (
      <Button
        pressed={component.outputs[0].value === 1}
        onPointerDown={(e) => {
          // e.stopPropagation();
          pressButton(component.id);
        }}
        onPointerUp={(e) => {
          // e.stopPropagation();
          releaseButton(component.id);
        }}
      />
    ) : component.type === "CLOCK" ? (
  <ClockGenerator
    running={component.outputs[0].value === 1}
    onClick={(e) => {
      e.stopPropagation();

      if (component.outputs[0].value === 0) {
        startClock(component.id);
      } else {
        stopClock(component.id);
      }
    }}
  />
) : component.type === "LED" ? (
  <Led on={component.inputs[0]?.value === 1} />
) : component.type === "PROBE" ? (
  <LogicProbe
    value={component.inputs[0]?.value ?? "X"}
  />
) : (
  <Gate />
)
    }

    {component.inputs.map((pin) => (
      <Pin
        key={pin.id}
        pin={pin}
        componentId={component.id}
      />
    ))}

    {component.outputs.map((pin) => (
      <Pin
        key={pin.id}
        pin={pin}
        componentId={component.id}
      />
    ))}
  </div>
);
      
}

export default ComponentRenderer;