import React from "react";
import { useEffect, useCallback } from "react";
import { Route, Redirect } from "react-router-dom";
import { Box } from "@mui/material";
import Credentials from "./Credentials";
import Info from "./Info";
import { useAuthContext } from "providers";
import { IAuth, Auth } from "models";
import { HttpAuth } from "../../../http";

export default function Content(): JSX.Element {
  const { user, setUser } = useAuthContext();

  const currentUser = useCallback(
    async function (http: HttpAuth) {
      if (!user) return;
      if (user?.b) return;

      const currentUser = await http.currentUser();
      setUser((prevState: IAuth | null | undefined) => {
        if (!prevState) return null;

        return new Auth({
          uid: prevState.uid,
          a: prevState.a,
          b: currentUser.b,
        });
      });
    },
    [user, setUser]
  );

  useEffect(() => {
    const http = new HttpAuth();
    currentUser(http);
    return () => (http.isCancel() ? http.cancel() : undefined);
  }, [currentUser]);

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
