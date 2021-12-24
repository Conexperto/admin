export interface ICoreAppContext {
  title: string;
  updateTitle: (title: string) => void;

  loader: boolean;
  openLoader: () => void;
  closeLoader: () => void;

  openSnackbar: (message: string, severity?: any) => void;
  closeSnackbar: () => void;

  drawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: (state?: boolean) => void;

  overflowMenu: Element | null | undefined;
  openOverflowMenu: (event: Element) => void;
  closeOverflowMenu: () => void;
  toggleOverflowMenu: (event: Element) => void;
}
