import React from "react";
import { Route } from "react-router-dom";
import { Box } from "@mui/material";

export default function Content(): JSX.Element {
  return (
    <Box mx={2} my={2}>
      <Route
        path="/profile/credentials"
        render={() => <div>Credentials</div>}
      />
      <Route path="/profile/info" render={() => <div>Info</div>} />
    </Box>
  );
}
