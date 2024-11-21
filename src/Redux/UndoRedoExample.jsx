import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCell, undo, redo } from './undoRedoSlice';

const UndoRedoTable = () => {
  const dispatch = useDispatch();
  const { past, present, future } = useSelector((state) => state.tableData);

  const handleCellEdit = (rowId, colId, newData) => {
    dispatch(updateCell({ rowId, colId, newData }));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault();
        dispatch(undo());
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
        event.preventDefault();
        dispatch(redo());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div>
      <h2>Undo/Redo Table Example</h2>
      <table border="1" cellPadding="5">
        <tbody>
          {present.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell) => (
                <td key={cell.colId}>
                  <input
                    value={cell.data}
                    onChange={(e) =>
                      handleCellEdit(cell.rowId, cell.colId, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => dispatch(undo())} disabled={past.length === 0}>
          Undo
        </button>
        <button onClick={() => dispatch(redo())} disabled={future.length === 0}>
          Redo
        </button>
      </div>
    </div>
  );
};

export default UndoRedoTable;
