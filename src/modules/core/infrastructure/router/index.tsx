import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import MuiBox from "@mui/material/Box";
import Home from "../../presentation/pages/Home";
import Login from "../../presentation/pages/Login";
import { CoreAuthContext } from "../store/contexts/CoreAuthContext";

export default function Router() {
  const { logged } = useContext(CoreAuthContext);
  return (
    <MuiBox data-testid="router">
      {logged ? <Authorized /> : <UnAuthorized />}
    </MuiBox>
  );
}

function Authorized() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

function UnAuthorized() {
  return (
    <Switch>
      <Route path="/" component={Login} />
    </Switch>
  );
}
