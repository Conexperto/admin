import React from "react";
import type { History } from "history";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { List } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Cast as CastIcon,
  ExitToApp as ExitToAppIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from "@mui/icons-material";
import { default as ListItem } from "./list-item";
import {
  AppContextInterface,
  AuthContextInterface,
  useAppContext,
  useAuthContext,
} from "providers";

type MenuList = {
  label: string;
  icon: React.ReactElement;
  link?: string;
  func?: (logout: any, history: any) => () => void;
};
const menuList: MenuList[] = [
  {
    label: "Inicio",
    icon: <DashboardIcon />,
    link: "/",
  },
  {
    label: "Usuarios Administradores",
    icon: <SupervisorAccountIcon />,
    link: "/admin",
  },
  {
    label: "Usuarios",
    icon: <PersonIcon />,
    link: "/user",
  },
  {
    label: "Expertos",
    icon: <SchoolIcon />,
    link: "/expert",
  },
  {
    label: "Especialidades",
    icon: <ClassIcon />,
    link: "/speciality",
  },
  {
    label: "Metodos",
    icon: <CastIcon />,
    link: "/method",
  },
  {
    label: "Salir",
    icon: <ExitToAppIcon />,
    func:
      (logout: AuthContextInterface["logout"], history: History) =>
      async () => {
        await logout();
        history.push("/");
      },
  },
];

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function _List(): JSX.Element {
  const classes = useStyles();
  const history: History = useHistory();
  const { logout }: AuthContextInterface = useAuthContext();
  const { toggleDrawer }: AppContextInterface = useAppContext();

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        {menuList.map(
          ({ label, icon, link, func }: MenuList, index: number) => (
            <ListItem
              key={index}
              label={label}
              icon={icon}
              link={link}
              func={func ? func(logout, history) : undefined}
            />
          )
        )}
      </List>
    </div>
  );
}
