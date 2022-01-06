import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useCoreApp } from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import AppBar from "../../organisms/AppBar";
import Drawer from "../../organisms/Drawer";
import TemplateAuthorized from "../../templates/TemplateAuthorized";

import MuiBox from "@mui/material/Box";
import MuiAvatar from "@mui/material/Avatar";
import MuiTypography from "@mui/material/Typography";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useHistory, Route, Redirect } from "react-router-dom";
import { History, Location } from "history";

const Profile: React.FC = () => {
  const { bloc } = useCoreApp();
  const [tab, setTab] = useState<number>(0);
  const history: History = useHistory();

  useEffect(() => {
    bloc.updateTitle("Perfil");
  }, []);

  const ObserverHistory = useCallback(
    (location: Location) => {
      if (location.pathname === "/profile/credentials") {
        setTab(0);
      }
      if (location.pathname === "/profile/info") {
        setTab(1);
      }
    },
    [setTab]
  );

  useEffect(
    () => ObserverHistory(history.location),
    [ObserverHistory, history]
  );

  return (
    <TemplateAuthorized appbar={<AppBar />} drawer={<Drawer />}>
      <MuiBox
        data-testid="page-profile"
        sx={{ width: "100%", minHeight: "100%" }}
      >
        <MuiBox
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 4fr",
            gap: 1,
            gridTemplateRows: "auto",
            width: "100%",
            minHeight: "100%",
          }}
        >
          <MuiBox
            pt={4}
            sx={{
              width: "100%",
              height: "100%",
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            <MuiBox
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
            >
              <MuiAvatar alt="profile" sx={{ width: 140, height: 140 }}>
                <AccountCircle sx={{ width: "100%", height: "100%" }} />
              </MuiAvatar>
              <MuiBox mt={2} mb={2} textAlign="center">
                <MuiTypography variant="h5">FrFernandez</MuiTypography>
                <MuiTypography variant="caption">Administrador</MuiTypography>
              </MuiBox>
            </MuiBox>
            <MuiTabs
              orientation="vertical"
              value={tab}
              onChange={(_, value: any) => setTab(value)}
              aria-label="Menu Profile"
              variant="fullWidth"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <MuiTab
                value={0}
                label="Credenciales"
                component={Link}
                to="/profile/credentials"
              />
              <MuiTab
                value={1}
                label="Información"
                component={Link}
                to="/profile/info"
              />
            </MuiTabs>
          </MuiBox>
          <MuiBox mx={2} my={2}>
            <Route exact path="/profile">
              <Redirect to="/profile/credentials" />
            </Route>
            <Route
              path="/profile/credentials"
              render={() => <div>Credentials</div>}
            />
            <Route path="/profile/info" render={() => <div>Info</div>} />
          </MuiBox>
        </MuiBox>
      </MuiBox>
    </TemplateAuthorized>
  );
};

export default Profile;
