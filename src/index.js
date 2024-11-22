import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SortableTable from "./Table/SortableTable";
import Test from "./Test/Test";
import { Provider } from "react-redux";
import store from "./Redux/store";
import UndoRedoExample from "./Redux/UndoRedoExample";
import GroupingTable from "./Groups/GroupingTable";
import GroupTable from "./Groups/GroupTable";
import FreezeTable from "./Freeze/FreezeTable";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <App/> */}
    {/* <Test /> */}
    <GroupTable />
    {/* <FreezeTable /> */}
    {/* <Provider store={store}>
      <UndoRedoExample />
    </Provider> */}
  </>
);
