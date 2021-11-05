import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProvider, theme } from "providers";
import { Router } from "navigations";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppProvider>
          <div className="App">
            <Router />
          </div>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
