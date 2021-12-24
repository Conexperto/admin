import React, { useCallback, useEffect, useState } from "react";
import Loader from "../../presentation/molecules/Loader";
import Snackbar, { SnackbarState } from "../../presentation/molecules/Snackbar";
import { CoreAppContext } from "./contexts/CoreAppContext";

const initialSnackbarState: SnackbarState = {
  state: false,
  message: "",
  severity: "info",
};

export type CoreAppStoreProps = {
  initialState?: {
    title?: string;
    loader?: boolean;
    snackbar?: Partial<SnackbarState>;
    drawer?: boolean;
    overflowMenu?: Element;
  };
};
export const CoreAppStore: React.FC<CoreAppStoreProps> = ({
  children,
  initialState,
}) => {
  const [_title, _setTitle] = useState<string>(
    initialState?.title ?? "Admin - ConeXperto"
  );
  const [_loader, _setLoader] = useState<boolean>(
    initialState?.loader ?? false
  );
  const [_snackbar, _setSnackbar] = useState<SnackbarState>({
    ...initialSnackbarState,
    ...initialState?.snackbar,
  });
  const [_drawer, _setDrawer] = useState<boolean>(
    initialState?.drawer ?? false
  );

  const [_overflowMenu, _setOverflowMenu] = useState<
    Element | null | undefined
  >();

  useEffect(() => {
    document.title = _title;
  }, [_title]);

  const updateTitle = useCallback(
    (title: string): void => {
      _setTitle(title);
    },
    [_setTitle]
  );

  const openLoader = useCallback((): void => {
    _setLoader(true);
  }, [_setLoader]);

  const closeLoader = useCallback((): void => {
    _setLoader(false);
  }, [_setLoader]);

  const openSnackbar = useCallback(
    (message: string, severity?: SnackbarState["severity"]): void => {
      _setSnackbar((prevState) => ({
        state: true,
        message,
        severity: severity ?? prevState.severity,
      }));
    },
    [_setSnackbar]
  );

  const closeSnackbar = useCallback(() => {
    _setSnackbar(() => ({ ...initialSnackbarState, state: false }));
  }, [_setSnackbar]);

  const openDrawer = useCallback(() => {
    _setDrawer(true);
  }, [_setDrawer]);

  const closeDrawer = useCallback(() => {
    _setDrawer(false);
  }, [_setDrawer]);

  const toggleDrawer = useCallback(
    (state?: boolean) => {
      _setDrawer((prevState) => state ?? !prevState);
    },
    [_setDrawer]
  );

  const openOverflowMenu = useCallback(
    (event: Element) => {
      _setOverflowMenu(event);
    },
    [_setOverflowMenu]
  );

  const closeOverflowMenu = useCallback(() => {
    _setOverflowMenu(null);
  }, []);

  const toggleOverflowMenu = useCallback(
    (event: Element) => {
      _setOverflowMenu((prevState) => (event === prevState ? null : event));
    },
    [_setOverflowMenu]
  );

  const initialValue = {
    title: _title,
    updateTitle,
    loader: _loader,
    openLoader,
    closeLoader,
    openSnackbar,
    closeSnackbar,
    drawer: _drawer,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    overflowMenu: _overflowMenu,
    openOverflowMenu,
    closeOverflowMenu,
    toggleOverflowMenu,
  };
  return (
    <CoreAppContext.Provider value={initialValue}>
      {children}
      <Loader state={_loader} />
      <Snackbar
        state={_snackbar.state}
        message={_snackbar.message}
        severity={_snackbar.severity}
        onClose={() => closeSnackbar()}
      />
    </CoreAppContext.Provider>
  );
};
