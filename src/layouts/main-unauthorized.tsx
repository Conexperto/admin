import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid } from "@mui/material";

const useStyles = makeStyles((theme: any) => ({
  container: {
    position: "relative",
    height: "100%",
  },
  wallpaper: {
    background: "blue",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 35px",
    boxShadow: "-7px 0px 20px 12px #3d3d3e33",
    backgroundColor: "white",
    //[theme.breakpoints.down("xs")]: {
    //  position: "absolute",
    //  top: "50%",
    //  left: "50%",
    //  transform: "translate(-50%, -50%)",
    //  width: "100%",
    //  padding: "25px 35px",
    //  borderRadius: "10px",
    //},
  },
}));

type Props = {
  children: React.ReactNode;
};
export function MainUnauthorizedLayout({ children }: Props) {
  const classes = useStyles();

  return (
    <Box sx={{ position: "relative", flexGrow: 1 }}>
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={9} className={classes.wallpaper}></Grid>
        <Grid item xs={3} className={classes.form}>
          <Box sx={{ position: "relative" }}>{children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
