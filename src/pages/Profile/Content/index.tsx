import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Box } from "@mui/material";
import Credentials from "./Credentials";
import Info from "./Info";

export default function Content(): JSX.Element {
  return (
    <Box mx={2} my={2}>
      <Route exact path="/profile">
        <Redirect to="/profile/credentials" />
      </Route>
      <Route path="/profile/credentials" render={() => <Credentials />} />
      <Route path="/profile/info" render={() => <Info />} />
    </Box>
  );
}
