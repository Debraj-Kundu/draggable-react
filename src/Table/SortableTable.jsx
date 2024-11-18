import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import SortableItem from "./SortableItem";

const SortableTable = () => {
  const [columns, setColumns] = useState(["Name", "Age", "Role"]);
  const [rows, setRows] = useState([
    { id: 1, Name: "Alice", Age: 25, Role: "Developer" },
    { id: 2, Name: "Bob", Age: 30, Role: "Designer" },
    { id: 3, Name: "Charlie", Age: 35, Role: "Manager" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  // Handle column drag
  const handleColumnDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = columns.indexOf(active.id);
      const newIndex = columns.indexOf(over.id);
      setColumns((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  // Handle row drag
  const handleRowDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = rows.findIndex((row) => row.id === active.id);
      const newIndex = rows.findIndex((row) => row.id === over.id);
      setRows((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <Table>
      {/* Sortable Columns */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleColumnDragEnd}
      >
        <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
          <TableHead>
            <TableRow>
              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                {columns.map((column) => (
                  <SortableItem key={column} id={column}>
                    <TableCell>{column}</TableCell>
                  </SortableItem>
                ))}
              </div>
            </TableRow>
          </TableHead>
        </SortableContext>
      </DndContext>

      {/* Sortable Rows */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleRowDragEnd}
      >
        <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
          <TableBody>
            {rows.map((row) => (
              <SortableItem key={row.id} id={row.id}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column}>{row[column]}</TableCell>
                  ))}
                </TableRow>
              </SortableItem>
            ))}
          </TableBody>
        </SortableContext>
      </DndContext>
    </Table>
  );
};

export default SortableTable;


// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   horizontalListSortingStrategy,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import SortableItem from "./SortableItem"; // A helper component for rows/columns

// const SortableTable = () => {
//   const [columns, setColumns] = useState(["Name", "Age", "Role"]);
//   const [rows, setRows] = useState([
//     { id: 1, Name: "Alice", Age: 25, Role: "Developer" },
//     { id: 2, Name: "Bob", Age: 30, Role: "Designer" },
//     { id: 3, Name: "Charlie", Age: 35, Role: "Manager" },
//   ]);

//   const sensors = useSensors(useSensor(PointerSensor));

//   // Handlers for drag end
//   const handleColumnDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       const oldIndex = columns.indexOf(active.id);
//       const newIndex = columns.indexOf(over.id);
//       setColumns((prev) => arrayMove(prev, oldIndex, newIndex));
//     }
//   };

//   const handleRowDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       const oldIndex = rows.findIndex((row) => row.id === active.id);
//       const newIndex = rows.findIndex((row) => row.id === over.id);
//       setRows((prev) => arrayMove(prev, oldIndex, newIndex));
//     }
//   };

//   return (
//     <Table>
//       {/* Sortable Columns */}
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleColumnDragEnd}
//       >
//         <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
//           <TableHead>
//             <TableRow className="flex flex-row">
//               {columns.map((column) => (
//                 <SortableItem key={column} id={column}>
//                   <TableCell>{column}</TableCell>
//                 </SortableItem>
//               ))}
//             </TableRow>
//           </TableHead>
//         </SortableContext>
//       </DndContext>

//       {/* Sortable Rows */}
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleRowDragEnd}
//       >
//         <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
//           <TableBody>
//             {rows.map((row) => (
//               <SortableItem key={row.id} id={row.id}>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell key={column}>{row[column]}</TableCell>
//                   ))}
//                 </TableRow>
//               </SortableItem>
//             ))}
//           </TableBody>
//         </SortableContext>
//       </DndContext>
//     </Table>
//   );
// };

// export default SortableTable;
