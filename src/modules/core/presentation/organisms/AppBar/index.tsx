import React, { useContext } from "react";
import MuiAppBar from "@mui/material/AppBar";
import { CoreAppContext } from "src/modules/core/infrastructure/store/contexts/CoreAppContext";
import Person from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { MenuItemProps } from "../../molecules/MenuItem";
import Toolbar from "../Toolbar";

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
  const {
    title,
    toggleDrawer,
    overflowMenu,
    closeOverflowMenu,
    toggleOverflowMenu,
  } = useContext(CoreAppContext);

  return (
    <MuiAppBar data-testid="appbar" position="fixed">
      <Toolbar
        {...{
          title,
          profile: {},
          toggleDrawer,
          items,
          overflowMenu,
          toggleOverflowMenu,
          closeOverflowMenu,
        }}
      />
    </MuiAppBar>
  );
};
export default AppBar;
