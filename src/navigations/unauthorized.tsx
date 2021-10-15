import React from "react";
import { Switch, Route } from "react-router-dom";
import { MainUnauthorizedLayout } from "layouts";

export const UnAuthorizedStack = (): JSX.Element => (
  <Switch>
    <MainUnauthorizedLayout>
      <Route path="/" render={() => <div>UnAuthorizedStack</div>} />
    </MainUnauthorizedLayout>
  </Switch>
);
