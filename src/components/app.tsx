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
    ...spacing({ pb: 1 }),
    alignSelf: "flex-end",
  },
});

export default function _AppBar(): JSX.Element {
  const classes = useStyles();
  const { title, toggleDrawer } = useAppContext();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
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
