import React from "react";
import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";

const TemplateUnauthorized: React.FC = ({ children }) => {
  return (
    <MuiBox
      data-testid="template-unauthorized"
      sx={{ position: "relative", flexGrow: 1 }}
    >
      <MuiGrid
        container
        spacing={0}
        sx={{ position: "relative", height: "100%" }}
      >
        <MuiGrid
          item
          xs={12}
          sm={6}
          md={8}
          lg={9}
          sx={{ bgcolor: "primary.main" }}
        ></MuiGrid>
        <MuiGrid item xs={10} sm={6} md={4} lg={3} xl={3}>
          <MuiGrid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ bgcolor: "white", minHeight: "100vh" }}
          >
            {children}
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </MuiBox>
  );
};

export default TemplateUnauthorized;
