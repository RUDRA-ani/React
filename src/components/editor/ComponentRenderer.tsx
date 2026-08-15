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
console.log(component.type);
  return (
<div className="relative">
  {component.type === "SWITCH" ? (
<Switch
  state={component.outputs[0].value === 1}
  onClick={(e) => {
    e.stopPropagation();

    toggleSwitch(component.id);

    setTimeout(() => {
      const component = useCircuitStore
        .getState()
        .components.find((c) => c.id === component.id);

      console.log(
        "After toggle:",
        component?.outputs[0].value
      );
    }, 0);
  }}
/>
 ) : component.type === "LED" ? (
  <>
    {console.log(
      "LED input:",
      component.inputs[0]?.value
    )}

    <Led
      on={component.inputs[0]?.value === 1}
    />
  </>
) : (
    <Gate />
  )}
      {/* <Gate/> */}
      

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