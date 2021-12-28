import React, { useContext, useEffect, useMemo } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { MenuItemProps } from "../../molecules/MenuItem";
import Toolbar from "../Toolbar";
import { useCoreApp } from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import { useCoreAuth } from "src/modules/core/infrastructure/bloc/CoreAuthBlocProvider";

const AppBar: React.FC = () => {
  const app = useCoreApp();
  const auth = useCoreAuth();
  const { title, overflowMenu } = app.state;

  const items: Array<MenuItemProps> = useMemo(
    () => [
      {
        label: "Perfil",
        link: "/profile/credentials",
        icon: <Person fontSize="small" />,
      },
      {
        label: "Salir",
        func: () => auth.bloc.signOut(),
        icon: <Logout fontSize="small" />,
      },
    ],
    [auth]
  );

  useEffect(
    () => () => {
      app.bloc.closeDrawer();
      app.bloc.closeOverflowMenu();
    },
    []
  );

  const toolbarProps = {
    title,
    profile: {},
    toggleDrawer: app.bloc.toggleDrawer.bind(app.bloc),
    items,
    overflowMenu,
    toggleOverflowMenu: app.bloc.toggleOverflowMenu.bind(app.bloc),
    closeOverflowMenu: app.bloc.closeOverflowMenu.bind(app.bloc),
  };
  return (
    <MuiAppBar data-testid="appbar" position="fixed">
      <Toolbar {...toolbarProps} />
    </MuiAppBar>
  );
};
export default AppBar;
