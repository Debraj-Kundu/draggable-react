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
const columnIds = ["col-1", "col-2", "col-3"];
const rowIds = ["row-1", "row-2", "row-3", "row-4"];

const Test = () => {
  const [containers, setContainers] = useState(data);
  const [activeId, setActiveId] = useState(null);
  const [columnHover, setColumnHover] = useState(false);

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

  const handleDragMove = (event) => {};

  const handleDragEnd = (event) => {
    const { active, over } = event;
    // row swap
    if (
      activeId.toString().includes("row") &&
      activeId.toString().includes("row") &&
      active &&
      over &&
      activeId !== over.id
    ) {
      const activeRowIndex = containers.findIndex((row) => {
        if (activeId === row[0].rowId) return true;
      });
      const overRowIndex = containers.findIndex((row) => {
        if (over.id === row[0].rowId) return true;
      });
      console.log(activeRowIndex, overRowIndex);
      let newCont = [...containers];
      newCont = arrayMove(newCont, activeRowIndex, overRowIndex);

      setContainers(newCont);
    }

    // col swap
    else if (
      activeId.toString().includes("col") &&
      activeId.toString().includes("col") &&
      active &&
      over &&
      activeId !== over.id
    ) {
      console.log(activeId, over.id);
      let activeColIndex = -1;
      containers.forEach((row) => {
        for (let i in row) {
          if (activeId === row[i].colId) {
            activeColIndex = i;
            break;
          }
        }
      });
      let overColIndex = -1;
      containers.forEach((row) => {
        for (let i in row) {
          if (over.id === row[i].colId) {
            overColIndex = i;
            break;
          }
        }
      });
      console.log(activeColIndex, overColIndex);
      const newItems = [...containers];
      newItems.forEach((row, i) => {
        newItems[i] = arrayMove(row, activeColIndex, overColIndex);
      });
      setContainers(newItems);
    }
    setActiveId(null);
  };

  const handleHover = (isHovering) => {
    setColumnHover(isHovering);
  };

  return (
    <>
      {/* <button onClick={() => setColumnHover(!columnHover)}>Toggle</button> */}
      <div className="mx-auto max-w-7xl py-10">
        <div className="mt-10">
          <div className="">
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
                        <Items id={item.colId} val={item.data} type={"col"} />
                      ) : (
                        <Items id={item.rowId} val={item.data} type={"row"} />
                      )
                    )}
                  </div>
                ))}
              </SortableContext>
              <DragOverlay>
                {activeId
                  ? containers.map((row) => (
                      <div className={columnHover ? "" : "flex"}>
                        {row.map((item) => {
                          if (
                            item.rowId === activeId ||
                            item.colId === activeId
                          ) {
                            return (
                              <Items
                                key={item.rowId || item.colId}
                                id={item.rowId || item.colId}
                                val={item.data}
                                type={columnHover ? "col" : "row"}
                              />
                            );
                          }
                          return null;
                        })}
                      </div>
                    ))
                  : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
