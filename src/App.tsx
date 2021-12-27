import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Router from "./modules/core/infrastructure/router";
import { CoreAuthBlocProvider } from "./modules/core/infrastructure/bloc/CoreAuthBlocProvider";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <CoreAuthBlocProvider>
        <Router />
      </CoreAuthBlocProvider>
    </BrowserRouter>
  );
}

export default App;
