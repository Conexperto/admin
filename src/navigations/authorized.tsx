import React from "react";
import { Switch, Route } from "react-router-dom";

export const AuthorizedStack = (): JSX.Element => (
  <Switch>
    <Route path="/" render={() => <div>AuthorizedStack</div>} />
  </Switch>
);
