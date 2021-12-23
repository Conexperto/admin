import React from "react";
import MuiCircularProgress from "@mui/material/CircularProgress";
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

export type LoaderProps = {
  state: boolean;
};
const Loader: React.FC<LoaderProps> = ({ state }) => {
  const classes = useStyles();

  return (
    <div
      data-testid="loading"
      className={classes.root}
      style={state ? {} : { display: "none" }}
    >
      <div className={classes.container}>
        <MuiCircularProgress size={65} />
      </div>
    </div>
  );
};

export default Loader;
