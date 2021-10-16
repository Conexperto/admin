import React from "react";
import { makeStyles } from "@mui/styles";
import { spacing } from "@mui/system";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useAppContext } from "providers";

const useStyles = makeStyles({
  menuButton: {
    ...spacing({ mr: 2 }),
  },
  toolbar: {
    alignItems: "flex-start",
    ...spacing({
      pt: 1,
      pb: 2,
    }),
    minHeight: 48,
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
});

export default function _AppBar(): JSX.Element {
  const classes = useStyles();
  const { title, toggleDrawer } = useAppContext();

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
            onClick={() => {}}
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
