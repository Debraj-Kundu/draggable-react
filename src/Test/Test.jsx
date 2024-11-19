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
    { rowId: "row-0", colId: "col-1", data: "Name" },
    { rowId: "row-0", colId: "col-2", data: "Age" },
    { rowId: "row-0", colId: "col-3", data: "Role" },
  ],
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
  [
    { rowId: "row-4", colId: "col-1", data: "Bruno" },
    { rowId: "row-4", colId: "col-2", data: 45 },
    { rowId: "row-4", colId: "col-3", data: "Boss" },
  ],
];

const Test = () => {
  const [containers, setContainers] = useState(data);
  const [activeId, setActiveId] = useState(null);
  const [columnHover, setColumnHover] = useState(false);

  const columnIds = ["col-1", "col-2", "col-3"];
  const rowIds = ["row-1", "row-2", "row-3", "row-4"];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const handleDragMove = (event) => {
    const { active, over } = event;
    // row swap
    // if (
    //   active.id.toString().includes("row") &&
    //   active.id.toString().includes("row") &&
    //   active &&
    //   over &&
    //   active.id !== over.id
    // ) {
    //   const activeRowIndex = containers.findIndex(
    //     (row) => row[0].rowId === active.id
    //   );
    //   const overRowIndex = containers.findIndex(
    //     (row) => row[0].rowId === over.id
    //   );
    //   console.log(activeRowIndex, overRowIndex);
    //   let newItems = arrayMove(containers, activeRowIndex, overRowIndex);
    //   console.log(newItems);
    //   setContainers(newItems);
    // }

    //col swap
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // row swap
    if (
      active.id.toString().includes("row") &&
      active.id.toString().includes("row") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeRowIndex = containers.findIndex(
        (row) => row[0].rowId === active.id
      );
      const overRowIndex = containers.findIndex(
        (row) => row[0].rowId === over.id
      );
      console.log(activeRowIndex, overRowIndex);
      let newItems = arrayMove(containers, activeRowIndex, overRowIndex);
      console.log(newItems);
      setContainers(newItems);
    }
    setActiveId(null);
  };

  const handleHover = (isHovering) => {
    setColumnHover(isHovering);
  };

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
            <div
              key={i}
              className="flex"
              onMouseEnter={() => i === 0 && handleHover(true)}
              onMouseLeave={() => i === 0 && handleHover(false)}
            >
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
