import React from "react";
import MuiSnackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiSlide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const anchorOrigin: SnackbarOrigin = {
  horizontal: "left",
  vertical: "bottom",
};

const TransitionComponent = (
  props: TransitionProps & { children: React.ReactElement<any, any> }
) => <MuiSlide {...props} direction="up" />;

export type SnackbarState = Pick<
  SnackbarProps,
  "state" | "message" | "severity"
>;

export type SnackbarProps = Pick<AlertProps, "severity"> & {
  state: boolean;
  message: string;
  onClose: () => void;
};
const Snackbar: React.FC<SnackbarProps> = ({
  state,
  severity,
  message,
  onClose,
}: SnackbarProps) => {
  return (
    <MuiSnackbar
      data-testid="snackbar"
      open={state}
      anchorOrigin={anchorOrigin}
      autoHideDuration={2000}
      onClose={() => onClose()}
      TransitionComponent={TransitionComponent}
    >
      <MuiAlert severity={severity} onClose={() => onClose()}>
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
};

export default Snackbar;
