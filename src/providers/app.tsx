import React from "react";
import { createContextHooks } from "hooks";
import { ReactNode, useEffect, useState } from "react";
import type { AlertColor } from "@mui/material";
import { AuthProvider } from "./auth";
import { Snackbar } from "components";

export interface AppContextInterface {
  title: string;
  setTitle(title: string): void;
  drawer: boolean;
  toggleDrawer: (state?: boolean) => void;
  toggleSnackbar: (state?: boolean) => void;
  messageSnackbar: (message: string) => void;
  severitySnackbar: (severity: AlertColor) => void;
}
export const [useAppContext, Provider] =
  createContextHooks<AppContextInterface>();

type SnackbarState = {
  state: boolean;
  message: string;
  severity: AlertColor;
};

type Props = {
  children: ReactNode;
};
export const AppProvider = ({ children }: Props) => {
  const [title, _setTitle] = useState<string>("Admin - Conexperto");
  const [drawer, _setDrawer] = useState<boolean>(false);
  const [snackbar, _setSnackbar] = useState<SnackbarState>({
    state: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  function setTitle(title: string): void {
    _setTitle(title);
  }

  function toggleDrawer(state?: boolean) {
    _setDrawer((prevState: boolean) => (state ? state : !prevState));
  }

  function messageSnackbar(message: string) {
    _setSnackbar((prevState: SnackbarState) => ({ ...prevState, message }));
  }

  function severitySnackbar(severity: AlertColor) {
    _setSnackbar((prevState: SnackbarState) => ({ ...prevState, severity }));
  }

  function toggleSnackbar(state?: boolean) {
    _setSnackbar((prevState: SnackbarState) => ({
      ...prevState,
      state: state ? state : !prevState.state,
    }));
  }

  return (
    <Provider
      value={{
        title,
        setTitle,
        drawer,
        toggleDrawer,
        toggleSnackbar,
        messageSnackbar,
        severitySnackbar,
      }}
    >
      <AuthProvider>{children}</AuthProvider>
      <Snackbar
        state={snackbar.state}
        onClose={() => toggleSnackbar(false)}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Provider>
  );
};
