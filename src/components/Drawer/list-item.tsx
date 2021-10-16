import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

type Props = {
  label: string;
  icon: React.ReactElement;
  link?: string;
  func?: () => void;
};
export default function _ListItem({
  label,
  icon,
  link,
  func,
}: Props): JSX.Element {
  if (func) {
    return (
      <ListItem button onClick={func}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label}></ListItemText>
      </ListItem>
    );
  }

  return (
    <ListItem button component={Link} to={link ?? "/"}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label}></ListItemText>
    </ListItem>
  );
}
