import type {
  CircuitComponent,
  Wire,
} from "@/store/type";

export function propagateWires(
  components: CircuitComponent[],
  wires: Wire[]
) {
  for (const wire of wires) {
    const fromComponent = components.find(
      (c) => c.id === wire.from.componentId
    );

    const toComponent = components.find(
      (c) => c.id === wire.to.componentId
    );

    if (!fromComponent || !toComponent) continue;

    const outputPin = fromComponent.outputs.find(
      (p) => p.id === wire.from.pinId
    );

    const inputPin = toComponent.inputs.find(
      (p) => p.id === wire.to.pinId
    );

    if (!outputPin || !inputPin) continue;

    inputPin.value = outputPin.value;
  }
}