import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AppProvider } from "providers";
import { Router } from "navigations";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppProvider>
        <div className="App">
          <Router />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
