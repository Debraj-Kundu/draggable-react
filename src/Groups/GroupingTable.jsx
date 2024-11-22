import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const initialData = [
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
    { rowId: "row-2", colId: "col-3", data: "Developer" },
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

const GroupingTable = () => {
  const [data, setData] = useState(initialData);
  const [groupBy, setGroupBy] = useState(null);

  // Extract columns from the first row
  const columns = data[0].map((col) => col.data);

  // Group data by a column
  const groupData = (groupColId) => {
    const columnIndex = data[0].findIndex((col) => col.colId === groupColId);
    if (columnIndex === -1) return;

    const grouped = data.slice(1).reduce((acc, row) => {
      const key = row[columnIndex].data;
      acc[key] = acc[key] || [];
      acc[key].push(row);
      return acc;
    }, {});

    return grouped;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === "group-area") {
      setGroupBy(active.id);
    }
  };

  const groupedData = groupBy ? groupData(groupBy) : null;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <h2>Drag a column header to group data</h2>
        <DroppableArea />
      </div>

      {/* Table */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <DraggableColumn key={index} id={`col-${index + 1}`}>
                <th>{col}</th>
              </DraggableColumn>
            ))}
          </tr>
        </thead>
        <tbody>
          {groupedData
            ? Object.keys(groupedData).map((group) => (
                <>
                  <tr>
                    <td colSpan={columns.length}>
                      <strong>Group: {group}</strong>
                    </td>
                  </tr>
                  {groupedData[group].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell) => (
                        <td key={cell.colId}>{cell.data}</td>
                      ))}
                    </tr>
                  ))}
                </>
              ))
            : data.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell) => (
                    <td key={cell.colId}>{cell.data}</td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </DndContext>
  );
};

// Draggable Column Header
const DraggableColumn = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id });

  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

// Droppable Area
const DroppableArea = () => {
  const { setNodeRef, isOver } = useDroppable({ id: "group-area" });
  const style = {
    height: "50px",
    backgroundColor: isOver ? "lightgreen" : "lightgray",
    border: "1px dashed black",
    marginBottom: "20px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      Drop Column Here to Group
    </div>
  );
};

export default GroupingTable;
