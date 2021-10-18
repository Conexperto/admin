import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Content from "./Content";

const styles = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  gap: 1,
  gridTemplateRows: "auto",
  width: "100%",
  minHeight: "100%",
};

export function Profile(): JSX.Element {
  return (
    <Box sx={styles}>
      <Sidebar />
      <Content />
    </Box>
  );
}
