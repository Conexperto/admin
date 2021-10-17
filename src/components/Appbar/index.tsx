import React, { SyntheticEvent, useState, useCallback } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import AccountMenu from "./AccountMenu";
import { useAppContext } from "providers";

export default function _AppBar(): JSX.Element {
  const { title, toggleDrawer } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<Element | null | undefined>(null);

  const handleAccountMenu = (event: SyntheticEvent): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountMenu = useCallback((): void => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={handleAccountMenu}
          >
            <AccountCircleIcon />
          </IconButton>
          <AccountMenu anchorEl={anchorEl} onClose={handleCloseAccountMenu} />
        </Toolbar>
      </AppBar>
    </>
  );
}
