import React from "react";
import type { SyntheticEvent } from "react";
import { Snackbar, Slide, Alert } from "@mui/material";
import type { AlertColor, SnackbarCloseReason } from "@mui/material";

type Props = {
  state: boolean;
  onClose: (event: SyntheticEvent, reason?: SnackbarCloseReason) => void;
  severity: AlertColor;
  message: string;
};
export default function _Snackbar({
  state,
  onClose,
  severity,
  message,
}: Props): JSX.Element {
  return (
    <Snackbar
      open={state}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={2000}
      onClose={onClose}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
    >
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
