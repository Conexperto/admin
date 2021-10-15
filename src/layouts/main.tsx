import React, { ReactNode } from "react";
import { makeStyles } from "@mui/styles";
import { AppProvider } from "providers";
import { AppBar, Drawer } from "components";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    minHeight: "calc(100px - 96px)",
    paddingTop: "calc(72px + 2px)",
  },
});

type Props = {
  children: ReactNode;
};
export function MainLayout({ children }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppProvider>
        <AppBar />
        <Drawer />
        <div className={classes.container}>{children}</div>
      </AppProvider>
    </div>
  );
}
