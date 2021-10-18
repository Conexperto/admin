import React from "react";
import { Switch, Route } from "react-router-dom";
import { MainLayout } from "layouts";
import { Profile } from "pages";

export const AuthorizedStack = (): JSX.Element => (
  <Switch>
    <MainLayout>
      <Route path="/" exact render={() => <div>AuthorizedStack</div>} />
      <Route path="/profile" render={() => <Profile />}></Route>
    </MainLayout>
  </Switch>
);
