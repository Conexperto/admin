import React from "react";
import TemplateUnauthorized from "../../templates/TemplateUnauthorized";

const Login: React.FC = () => {
  return (
    <TemplateUnauthorized>
      <div data-testid="page-login"></div>
    </TemplateUnauthorized>
  );
};

export default Login;
