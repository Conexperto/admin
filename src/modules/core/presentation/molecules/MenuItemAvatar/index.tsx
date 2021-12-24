import React from "react";
import { Link } from "react-router-dom";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiBox from "@mui/material/Box";
import MuiAvatar from "@mui/material/Avatar";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiListItemText from "@mui/material/ListItemText";

export type MenuItemAvatarProps = {
  displayName?: string;
  link?: string;
  member?: string;
};
const MenuItemAvatar: React.FC<MenuItemAvatarProps> = ({
  displayName,
  member,
  link,
}) => {
  return (
    <MuiMenuItem role="listitem" component={Link} to={link ?? "/"}>
      <MuiAvatar />
      {displayName && member ? (
        <MuiListItemText primary={displayName} secondary={member} />
      ) : (
        <MuiBox data-testid="skeleton" sx={{ display: "block", width: "100%" }}>
          <MuiSkeleton width="65%" height="24" />
          <MuiSkeleton width="80%" height="20" />
        </MuiBox>
      )}
    </MuiMenuItem>
  );
};

export default MenuItemAvatar;
