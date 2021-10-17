import React, { useCallback } from "react";
import { createContextHooks } from "hooks";
import { ReactNode, useEffect, useState } from "react";
import type { AlertColor } from "@mui/material";
import { AuthProvider } from "./auth";
import { Snackbar, Loader } from "components";

export interface AppContextInterface {
  title: string;
  setTitle(title: string): void;
  drawer: boolean;
  toggleDrawer: (state?: boolean) => void;
  toggleSnackbar: (state?: boolean) => void;
  messageSnackbar: (message: string) => void;
  severitySnackbar: (severity: AlertColor) => void;
  toggleLoader: (state?: boolean) => void;
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
  const [loader, _setLoader] = useState<boolean>(true);
  const [snackbar, _setSnackbar] = useState<SnackbarState>({
    state: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  const setTitle = useCallback(
    (title: string): void => {
      _setTitle(title);
    },
    [_setTitle]
  );

  const toggleDrawer = useCallback(
    (state?: boolean): void => {
      _setDrawer((prevState: boolean) => state ?? !prevState);
    },
    [_setDrawer]
  );

  const messageSnackbar = useCallback(
    (message: string): void => {
      _setSnackbar((prevState: SnackbarState) => ({ ...prevState, message }));
    },
    [_setSnackbar]
  );

  const severitySnackbar = useCallback(
    (severity: AlertColor): void => {
      _setSnackbar((prevState: SnackbarState) => ({ ...prevState, severity }));
    },
    [_setSnackbar]
  );

  const toggleSnackbar = useCallback(
    (state?: boolean): void => {
      _setSnackbar((prevState: SnackbarState) => ({
        ...prevState,
        state: state ?? !prevState.state,
      }));
    },
    [_setSnackbar]
  );

  const toggleLoader = useCallback(
    (state?: boolean): void => {
      _setLoader((prevState: boolean) => state ?? !prevState);
    },
    [_setLoader]
  );

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
        toggleLoader,
      }}
    >
      <AuthProvider>{children}</AuthProvider>
      <Loader state={loader} />
      <Snackbar
        state={snackbar.state}
        onClose={() => toggleSnackbar(false)}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Provider>
  );
};
