import React from "react";
import { Switch, Route } from "react-router-dom";
import { MainUnauthorizedLayout } from "layouts";
import { Login } from "pages";

export const UnAuthorizedStack = (): JSX.Element => (
  <Switch>
    <MainUnauthorizedLayout>
      <Route path="/" render={() => <Login />} />
    </MainUnauthorizedLayout>
  </Switch>
);
