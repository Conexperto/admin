import React from "react";
import { Link } from "react-router-dom";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiListItemIcon from "@mui/material/ListItemIcon";

export type MenuItemProps = {
  label: string;
  icon: React.ReactElement;
  link?: string;
  func?: () => void;
};
const MenuItem: React.FC<MenuItemProps> = (props) => {
  let _props: any = {};

  if ("link" in props) {
    _props.component = Link;
    _props.to = props.link ?? "/";
  }

  if ("func" in props) {
    _props.onClick = props.func;
  }

  return (
    <MuiMenuItem role="listitem" {..._props}>
      <MuiListItemIcon>{props.icon}</MuiListItemIcon>
      {props.label}
    </MuiMenuItem>
  );
};

export default MenuItem;
