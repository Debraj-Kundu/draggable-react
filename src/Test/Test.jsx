import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { v4 as uuid4 } from "uuid";
import {
  restrictToHorizontalAxis,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import Items from "./Item";

const data = [
  [
    { rowId: "row-1", colId: "col-1", data: "Alice" },
    { rowId: "row-1", colId: "col-2", data: 25 },
    { rowId: "row-1", colId: "col-3", data: "Developer" },
  ],
  [
    { rowId: "row-2", colId: "col-1", data: "Bob" },
    { rowId: "row-2", colId: "col-2", data: 30 },
    { rowId: "row-2", colId: "col-3", data: "Designer" },
  ],
  [
    { rowId: "row-3", colId: "col-1", data: "Charlie" },
    { rowId: "row-3", colId: "col-2", data: 35 },
    { rowId: "row-3", colId: "col-3", data: "Manager" },
  ],
];

const Test = () => {
  const [containers, setContainers] = useState(data);
  const [activeId, setActiveId] = useState(null);
  const [columnHover, setColumnHover] = useState(false);

  const columnIds = ["col-1", "col-2", "col-3"];
  const rowIds = ["row-1", "row-2", "row-3"];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (e) => {};

  const handleDragMove = (e) => {};

  const handleDragEnd = (e) => {};

  return (
    <>
      <button onClick={() => setColumnHover(!columnHover)}>Toggle</button>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        modifiers={[
          columnHover ? restrictToHorizontalAxis : restrictToVerticalAxis,
        ]}
      >
        <SortableContext
          items={columnHover ? columnIds : rowIds}
          strategy={
            columnHover
              ? horizontalListSortingStrategy
              : verticalListSortingStrategy
          }
        >
          {containers.map((row, i) => (
            <div key={i} className="flex">
              {row.map((item) =>
                columnHover ? (
                  <Items id={item.colId} val={item.data} />
                ) : (
                  <Items id={item.rowId} val={item.data} />
                )
              )}
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default Test;
