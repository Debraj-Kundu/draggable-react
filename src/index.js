import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SortableTable from "./Table/SortableTable";
import Test from "./Test/Test";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Test />
    <App/>
  </>
);
