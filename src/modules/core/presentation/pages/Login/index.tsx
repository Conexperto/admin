import React from "react";
import FormLogin from "../../organisms/FormLogin";
import TemplateUnauthorized from "../../templates/TemplateUnauthorized";

const Login: React.FC = () => {
  return (
    <TemplateUnauthorized>
      <div data-testid="page-login">
        <FormLogin />
      </div>
    </TemplateUnauthorized>
  );
};

export default Login;
