import { useCircuitStore } from "@/store";
import DraggableComponent from "../editor/DraggableComponent";

function ComponentLayer() {
  const components = useCircuitStore((state) => state.components);

  return (
    <div className="absolute inset-0">
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          component={component}
        />
      ))}
    </div>
  );
}

export default ComponentLayer;