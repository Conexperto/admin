import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { CoreAuthStore } from "./modules/core/infrastructure/store/CoreAuthStore";
import Router from "./modules/core/infrastructure/router";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <CoreAuthStore>
        <Router />
      </CoreAuthStore>
    </BrowserRouter>
  );
}

export default App;
