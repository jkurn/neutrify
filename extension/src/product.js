import React from "react";
import ReactDOM from "react-dom";
import './global.css';
import Extension from "./containers/Extension";

ReactDOM.render(
  <React.StrictMode>
    <Extension mode="product" />
  </React.StrictMode>,
  document.getElementById("root")
);
