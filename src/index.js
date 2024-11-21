import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SortableTable from "./Table/SortableTable";
import Test from "./Test/Test";
import { Provider } from "react-redux";
import store from "./Redux/store";
import UndoRedoExample from "./Redux/UndoRedoExample";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Test />
    {/* <App/> */}
    <Provider store={store}>
      <UndoRedoExample />
    </Provider>
  </>
);
