import React, { useEffect } from "react";
import { useCoreApp } from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import AppBar from "../../organisms/AppBar";
import Drawer from "../../organisms/Drawer";
import TemplateAuthorized from "../../templates/TemplateAuthorized";

const Home: React.FC = () => {
  const { bloc } = useCoreApp();

  useEffect(() => {
    bloc.updateTitle("Tablero");
  }, []);

  return (
    <TemplateAuthorized appbar={<AppBar />} drawer={<Drawer />}>
      <div data-testid="page-home">Home</div>
    </TemplateAuthorized>
  );
};

export default Home;
