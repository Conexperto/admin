import React, { useContext } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { MenuItemProps } from "../../molecules/MenuItem";
import Toolbar from "../Toolbar";
import { useCoreApp } from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";

const items: Array<MenuItemProps> = [
  {
    label: "Perfil",
    link: "/profile/credentials",
    icon: <Person fontSize="small" />,
  },
  {
    label: "Salir",
    func: () => () => {},
    icon: <Logout fontSize="small" />,
  },
];

const AppBar: React.FC = () => {
  const { bloc, state } = useCoreApp();
  const { title, overflowMenu } = state;
  const { toggleDrawer, closeOverflowMenu, toggleOverflowMenu } = bloc;

  const toolbarProps = {
    title,
    profile: {},
    toggleDrawer: toggleDrawer.bind(bloc),
    items,
    overflowMenu,
    toggleOverflowMenu: toggleOverflowMenu.bind(bloc),
    closeOverflowMenu: closeOverflowMenu.bind(bloc),
  };
  return (
    <MuiAppBar data-testid="appbar" position="fixed">
      <Toolbar {...toolbarProps} />
    </MuiAppBar>
  );
};
export default AppBar;
