import React, { memo } from "react";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, ListItemIcon, Divider, Avatar } from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import { useAuthContext } from "providers";

const PaperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgColor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

type Props = {
  anchorEl?: Element | null | undefined;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};
function AccountMenu({ anchorEl, onClick, onClose }: Props): JSX.Element {
  const state = Boolean(anchorEl);
  const { user, logout } = useAuthContext();

  return (
    <Menu
      anchorEl={anchorEl}
      open={state}
      onClick={onClick}
      onClose={onClose}
      PaperProps={PaperProps}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        <Avatar /> {user?.a.displayName}
      </MenuItem>
      <Divider />
      <MenuItem component={Link} to="/profile">
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        Perfil
      </MenuItem>
      <MenuItem onClick={() => logout()}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}

const deps = (prevProps: Props, nextProps: Props) => {
  if (
    prevProps.anchorEl === nextProps.anchorEl &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.onClose === nextProps.onClose
  )
    return true;
  return false;
};

export default memo(AccountMenu, deps);
