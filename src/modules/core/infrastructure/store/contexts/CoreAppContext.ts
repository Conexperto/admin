import { createContext } from "react";
import { ICoreAppContext } from "../interfaces/CoreAppContext";

export const CoreAppContext = createContext<ICoreAppContext>({
  title: "Admin - ConeXperto",
  updateTitle: () => {},

  loader: false,
  openLoader: () => {},
  closeLoader: () => {},

  openSnackbar: () => {},
  closeSnackbar: () => {},

  drawer: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: (state?: boolean) => {},

  overflowMenu: null,
  openOverflowMenu: () => {},
  closeOverflowMenu: () => {},
  toggleOverflowMenu: () => {},
});
