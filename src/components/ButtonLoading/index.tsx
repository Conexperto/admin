import React from "react";
import type { RefObject, MouseEvent } from "react";
import { makeStyles } from "@mui/styles";
import { Button, CircularProgress } from "@mui/material";

const useStyles = makeStyles({
  root: {
    position: "relative",
    "& > *": {
      width: "100%",
    },
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
});

type Props = {
  state: boolean;
  submit?: RefObject<HTMLButtonElement>;
};
export default function ButtonLoading({ submit, state }: Props): JSX.Element {
  const classes = useStyles();

  const handleClick = (event: MouseEvent) => {
    if (submit) submit.current?.click();
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" disabled={state} onClick={handleClick}>
        Entrar
      </Button>
      {state && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
}
