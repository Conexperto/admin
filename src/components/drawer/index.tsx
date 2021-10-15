import React from "react";
import { Drawer } from "@mui/material";
import { AppContextInterface, useAppContext } from "providers";
import { default as List } from "./list";

export default function _Drawer(): JSX.Element {
  const { drawer, toggleDrawer }: AppContextInterface = useAppContext();

  return (
    <Drawer open={drawer} anchor="left" onClose={() => toggleDrawer(false)}>
      <List />
    </Drawer>
  );
}
