import React from "react";
import AppBar from "../../organisms/AppBar";
import Drawer from "../../organisms/Drawer";
import TemplateAuthorized from "../../templates/TemplateAuthorized";

const Home: React.FC = () => {
  return (
    <TemplateAuthorized appbar={<AppBar />} drawer={<Drawer />}>
      <div data-testid="page-home">Home</div>
    </TemplateAuthorized>
  );
};

export default Home;
