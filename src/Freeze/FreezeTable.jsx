import React, { useState } from "react";
import "./Table.css"; // For the sticky styles

const initData = [
  [
    { rowId: "row-0", colId: "col-1", data: "Name" },
    { rowId: "row-0", colId: "col-2", data: "Age" },
    { rowId: "row-0", colId: "col-3", data: "Role" },
    { rowId: "row-0", colId: "col-4", data: "Gender" },
  ],
  [
    { rowId: "row-1", colId: "col-1", data: "Alice" },
    { rowId: "row-1", colId: "col-2", data: 25 },
    { rowId: "row-1", colId: "col-3", data: "Developer" },
    { rowId: "row-1", colId: "col-4", data: "Female" },
  ],
  [
    { rowId: "row-2", colId: "col-1", data: "Bob" },
    { rowId: "row-2", colId: "col-2", data: 30 },
    { rowId: "row-2", colId: "col-3", data: "Developer" },
    { rowId: "row-2", colId: "col-4", data: "Male" },
  ],
  [
    { rowId: "row-3", colId: "col-1", data: "Charlie" },
    { rowId: "row-3", colId: "col-2", data: 35 },
    { rowId: "row-3", colId: "col-3", data: "Manager" },
    { rowId: "row-3", colId: "col-4", data: "Male" },
  ],
  [
    { rowId: "row-4", colId: "col-1", data: "Bruno" },
    { rowId: "row-4", colId: "col-2", data: 45 },
    { rowId: "row-4", colId: "col-3", data: "Boss" },
    { rowId: "row-4", colId: "col-4", data: "Male" },
  ],
  [
    { rowId: "row-5", colId: "col-1", data: "Bruno" },
    { rowId: "row-5", colId: "col-2", data: 45 },
    { rowId: "row-5", colId: "col-3", data: "Boss" },
    { rowId: "row-5", colId: "col-4", data: "Male" },
  ],
  [
    { rowId: "row-6", colId: "col-1", data: "Bruno" },
    { rowId: "row-6", colId: "col-2", data: 45 },
    { rowId: "row-6", colId: "col-3", data: "Boss" },
    { rowId: "row-6", colId: "col-4", data: "Male" },
  ],
  [
    { rowId: "row-7", colId: "col-1", data: "Bruno" },
    { rowId: "row-7", colId: "col-2", data: 45 },
    { rowId: "row-7", colId: "col-3", data: "Boss" },
    { rowId: "row-7", colId: "col-4", data: "Male" },
  ],
];

const FreezeTable = () => {
  const [data, setData] = useState(initData);

  const toggleStickyCol = (colId) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.map((cell) =>
          cell.colId === colId
            ? { ...cell, isSticky: !cell.isSticky }
            : cell
        )
      )
    );
  };

  const toggleStickyRow = (rowId) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.map((cell) =>
          cell.rowId === rowId
            ? { ...cell, isSticky: !cell.isSticky }
            : cell
        )
      )
    );
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {data[0].map((cell) => (
              <th
                key={cell.colId}
                className={cell.isSticky ? "sticky-col sticky-header" : ""}
              >
                {cell.data}
                <button onClick={() => toggleStickyCol(cell.colId)}>
                  {cell.isSticky ? "Unstick" : "Stick"}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row) => (
            <tr
              key={row[0].rowId}
              className={row.some((cell) => cell.isSticky) ? "sticky-row" : ""}
            >
              {row.map((cell, index) => (
                <td
                  key={cell.colId}
                  className={cell.isSticky ? "sticky-col" : ""}
                  style={
                    row[0].isSticky && index === 0
                      ? { position: "sticky", top: "0", zIndex: "2" }
                      : {}
                  }
                >
                  {cell.data}
                  {index === 0 && (
                    <button onClick={() => toggleStickyRow(cell.rowId)}>
                      {row[0].isSticky ? "Unstick" : "Stick"}
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FreezeTable;
