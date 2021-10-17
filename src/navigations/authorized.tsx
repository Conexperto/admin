import React from "react";
import { Switch, Route } from "react-router-dom";
import { MainLayout } from "layouts";

export const AuthorizedStack = (): JSX.Element => (
  <Switch>
    <MainLayout>
      <Route path="/" render={() => <div>AuthorizedStack</div>} />
    </MainLayout>
  </Switch>
);
