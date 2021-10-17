import React, { memo } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

type Props = {
  label: string;
  icon: React.ReactElement;
  link?: string;
  func?: () => void;
};
function _ListItem({ label, icon, link, func }: Props): JSX.Element {
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

const deps = (prevProps: Props, nextProps: Props) => {
  if (
    prevProps.label === nextProps.label &&
    prevProps.icon === nextProps.icon &&
    prevProps.link === nextProps.link &&
    prevProps.func === nextProps.func
  )
    return true;
  return false;
};

export default memo(_ListItem, deps);
