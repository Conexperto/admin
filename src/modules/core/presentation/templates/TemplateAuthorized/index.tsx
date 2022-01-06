import React, { ReactChild, ReactChildren, ReactNode } from "react";
import MuiBox from "@mui/material/Box";

export type TemplateAuthorizedProps = {
  appbar: ReactNode;
  drawer: ReactNode;
  children: ReactChildren | ReactChild;
};
const TemplateAuthorized: React.FC<TemplateAuthorizedProps> = ({
  appbar,
  drawer,
  children,
}) => {
  return (
    <MuiBox
      data-testid="template-authorized"
      sx={{ flexGrow: 1, minHeight: "100vh" }}
    >
      {appbar}
      {drawer}
      <MuiBox sx={{ display: "flex", minHeight: "100vh", pt: 8 }}>
        {children}
      </MuiBox>
    </MuiBox>
  );
};

export default TemplateAuthorized;
