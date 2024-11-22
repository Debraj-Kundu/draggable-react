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

const GroupTable = () => {
  const [data, setData] = useState(initialData);
  const [groupedColumns, setGroupedColumns] = useState([]);

  // Extract columns from the first row
  const columns = data[0].map((col) => col.data);

  // Group data by multiple columns
  const groupData = () => {
    if (groupedColumns.length === 0) return null;

    const grouped = data.slice(1).reduce((acc, row) => {
      const groupKey = groupedColumns
        .map((colId) => row[data[0].findIndex((col) => col.colId === colId)].data)
        .join(" | ");

      acc[groupKey] = acc[groupKey] || [];
      acc[groupKey].push(row);
      return acc;
    }, {});

    return grouped;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === "group-area") {
      if (!groupedColumns.includes(active.id)) {
        setGroupedColumns((prev) => [...prev, active.id]);
      }
    }
  };

  const removeGrouping = () => {
    setGroupedColumns([]);
  };

  const groupedData = groupData();

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <h2>Drag column headers to group data</h2>
        <DroppableArea groupedColumns={groupedColumns} setGroupedColumns={setGroupedColumns} data={data} />
        {groupedColumns.length > 0 && (
          <button onClick={removeGrouping} style={{ margin: "10px 0" }}>
            Remove Grouping
          </button>
        )}
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
            ? Object.keys(groupedData).map((groupKey) => (
                <React.Fragment key={groupKey}>
                  <tr>
                    <td colSpan={columns.length}>
                      <strong>Group: {groupKey}</strong>
                    </td>
                  </tr>
                  {groupedData[groupKey].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell) => (
                        <td key={cell.colId}>{cell.data}</td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
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
const DroppableArea = ({ groupedColumns, setGroupedColumns, data }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "group-area" });

  const style = {
    minHeight: "50px",
    backgroundColor: isOver ? "lightgreen" : "lightgray",
    border: "1px dashed black",
    marginBottom: "20px",
    padding: "10px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  };

  const handleRemove = (colId) => {
    setGroupedColumns((prev) => prev.filter((id) => id !== colId));
  };

  return (
    <div ref={setNodeRef} style={style}>
      {groupedColumns.length > 0 ? (
        groupedColumns.map((colId) => (
          <div
            key={colId}
            style={{
              padding: "5px 10px",
              background: "white",
              border: "1px solid black",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            {data[0].find((col) => col.colId === colId).data}
            <button onClick={() => handleRemove(colId)}>X</button>
          </div>
        ))
      ) : (
        <span>Drop columns here to group</span>
      )}
    </div>
  );
};

export default GroupTable;
