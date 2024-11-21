import { configureStore } from '@reduxjs/toolkit';
import UndoRedoTable from './undoRedoSlice';

const store = configureStore({
  reducer: {
    tableData: UndoRedoTable,
  },
});

export default store;
