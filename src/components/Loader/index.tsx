import React from "react";
import { CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 99999,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});

type Props = {
  state: boolean;
};
export default function Loader({ state }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root} style={state ? {} : { display: "none" }}>
      <div className={classes.container}>
        <CircularProgress size={65}></CircularProgress>
      </div>
    </div>
  );
}
