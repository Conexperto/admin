import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CoreAppStore } from "./modules/core/infrastructure/store/CoreAppStore";

ReactDOM.render(
  <React.StrictMode>
    <CoreAppStore>
      <App />
    </CoreAppStore>
  </React.StrictMode>,
  document.getElementById("root")
);
