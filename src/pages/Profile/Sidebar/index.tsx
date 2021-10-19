import React, { useState, useEffect, useCallback } from "react";
import type { History, Location } from "history";
import type { SyntheticEvent } from "react";
import { useHistory, Link } from "react-router-dom";
import { Box, Tabs, Tab, Avatar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAuthContext } from "providers";

const styles = {
  width: "100%",
  height: "100%",
  borderRight: 1,
  borderColor: "divider",
};

export default function Sidebar(): JSX.Element {
  const [tab, setTab] = useState<number>(0);
  const { user } = useAuthContext();
  const history: History = useHistory();

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
    <Box pt={4} sx={styles}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar alt="Photo" sx={{ width: 140, height: 140 }}>
          <AccountCircle sx={{ width: "100%", height: "100%" }} />
        </Avatar>
        <Box mt={2} mb={2} textAlign="center">
          <Typography variant="h5">{user?.a.displayName}</Typography>
          <Typography variant="caption">{user?.member}</Typography>
        </Box>
      </Box>
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={(event: SyntheticEvent, value: any) => setTab(value)}
        aria-label="Menu Profile"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab
          value={0}
          label="Credenciales"
          component={Link}
          to="/profile/credentials"
        />
        <Tab
          value={1}
          label="Información"
          component={Link}
          to="/profile/info"
        />
      </Tabs>
    </Box>
  );
}
