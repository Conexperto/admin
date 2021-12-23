import React, { MouseEventHandler } from "react";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

export type ListItemProps = {
  label: string;
  icon: React.ReactNode;
  link?: string;
  func?: MouseEventHandler;
};
const ListItem: React.FC<ListItemProps> = (props) => {
  let _props: any = {};

  if ("link" in props) {
    _props.component = Link;
    _props.to = props.link ?? "/";
  }

  if ("func" in props) {
    _props.onClick = props.func;
  }

  return (
    <MuiListItem role="listitem" button {..._props}>
      <MuiListItemIcon>{props.icon}</MuiListItemIcon>
      <MuiListItemText
        data-testid="label"
        primary={props.label}
      ></MuiListItemText>
    </MuiListItem>
  );
};

export default ListItem;
