import React, { useEffect } from "react";
import { useCoreApp } from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import FormLogin from "../../organisms/FormLogin";
import TemplateUnauthorized from "../../templates/TemplateUnauthorized";

const Login: React.FC = () => {
  const { bloc } = useCoreApp();

  useEffect(() => {
    bloc.updateTitle("Iniciar Sesion");
  }, []);

  return (
    <TemplateUnauthorized>
      <div data-testid="page-login">
        <FormLogin />
      </div>
    </TemplateUnauthorized>
  );
};

export default Login;
