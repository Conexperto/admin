import { createContextHooks } from "hooks";
import { ReactNode, useEffect, useState } from "react";

export interface AppContextInterface {
  title: string;
  setTitle(title: string): void;
  drawer: boolean;
  toggleDrawer: (state?: boolean) => void;
}
export const [useAppContext, Provider] =
  createContextHooks<AppContextInterface>();

type Props = {
  children: ReactNode;
};
export const AppProvider = ({ children }: Props) => {
  const [title, _setTitle] = useState<string>("Admin - Conexperto");
  const [drawer, _setDrawer] = useState<boolean>(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  function setTitle(title: string): void {
    _setTitle(title);
  }

  function toggleDrawer(state?: boolean) {
    _setDrawer((prevState: boolean) => (state ? state : !prevState));
  }

  return (
    <Provider value={{ title, setTitle, drawer, toggleDrawer }}>
      {children}
    </Provider>
  );
};
