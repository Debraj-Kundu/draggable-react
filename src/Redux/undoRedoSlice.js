import { createSlice } from '@reduxjs/toolkit';

const undoRedoSlice = createSlice({
  name: 'tableData',
  initialState: {
    past: [],
    present: [
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
    ],
    future: [],
  },
  reducers: {
    // Update data for a specific cell
    updateCell: (state, action) => {
      const { rowId, colId, newData } = action.payload;

      const newPresent = state.present.map((row) =>
        row.map((cell) =>
          cell.rowId === rowId && cell.colId === colId
            ? { ...cell, data: newData }
            : cell
        )
      );

      state.past.push(state.present);
      state.present = newPresent;
      state.future = [];
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previousState = state.past.pop();
        state.future.unshift(state.present);
        state.present = previousState;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.shift();
        state.past.push(state.present);
        state.present = nextState;
      }
    },
  },
});

export const { updateCell, undo, redo } = undoRedoSlice.actions;
export default undoRedoSlice.reducer;
