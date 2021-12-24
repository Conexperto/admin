import React, { KeyboardEvent, SyntheticEvent, useContext } from "react";
import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import DrawerList from "../../molecules/DrawerList";
import ListItem, { ListItemProps } from "../../molecules/ListItem";

import Dashboard from "@mui/icons-material/Dashboard";
import Person from "@mui/icons-material/Person";
import School from "@mui/icons-material/School";
import Class from "@mui/icons-material/Class";
import Cast from "@mui/icons-material/Cast";
import ExitToApp from "@mui/icons-material/ExitToApp";
import SupervisorAccount from "@mui/icons-material/SupervisorAccount";
import { CoreAppContext } from "src/modules/core/infrastructure/store/contexts/CoreAppContext";

const items: Array<ListItemProps> = [
  {
    label: "Inicio",
    icon: <Dashboard />,
    link: "/",
  },
  {
    label: "Usuarios Administradores",
    icon: <SupervisorAccount />,
    link: "/admin",
  },
  {
    label: "Usuarios",
    icon: <Person />,
    link: "/user",
  },
  {
    label: "Expertos",
    icon: <School />,
    link: "/expert",
  },
  {
    label: "Especialidades",
    icon: <Class />,
    link: "/speciality",
  },
  {
    label: "Metodos",
    icon: <Cast />,
    link: "/method",
  },
  {
    label: "Salir",
    icon: <ExitToApp />,
    func: () => () => {},
  },
];

const Drawer: React.FC = () => {
  const { drawer, toggleDrawer } = useContext(CoreAppContext);

  const _toggleDrawer =
    (state: boolean) => (event: KeyboardEvent<SyntheticEvent>) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      toggleDrawer(state);
    };

  const renderListItem = (items: Array<ListItemProps>) =>
    items.map((props, key: number) => <ListItem key={key} {...props} />);

  return (
    <MuiSwipeableDrawer
      data-testid="drawer"
      anchor="left"
      open={drawer}
      onOpen={_toggleDrawer(true)}
      onClose={_toggleDrawer(false)}
    >
      <DrawerList toggleDrawer={_toggleDrawer}>
        {renderListItem(items)}
      </DrawerList>
    </MuiSwipeableDrawer>
  );
};

export default Drawer;
