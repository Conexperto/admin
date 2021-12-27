import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CoreAppBlocProvider } from "./modules/core/infrastructure/bloc/CoreAppBlocProvider";

ReactDOM.render(
  <React.StrictMode>
    <CoreAppBlocProvider>
      <App />
    </CoreAppBlocProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
