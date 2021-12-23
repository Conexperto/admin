import React, { ReactNode } from "react";
import MuiBox from "@mui/material/Box";
import MuiList from "@mui/material/List";

export type DrawerListProps = {
	children: ReactNode;
  toggleDrawer: (state: boolean) => (event: any) => void;
};
const DrawerList: React.FC<DrawerListProps> = ({ toggleDrawer, children }) => {
  return (
    <MuiBox
      sx={{ width: 250 }}
      data-testid="drawer-list"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <MuiList role="list">{children}</MuiList>
    </MuiBox>
  );
};

export default DrawerList;
