import React, { FormEvent, useEffect, useState } from "react";
import MuiBox from "@mui/material/Box";
import MuiLoadingButton from "@mui/lab/LoadingButton";
import MuiTypography from "@mui/material/Typography";
import TextFieldEmail from "src/modules/shared/presentation/molecules/TextFieldEmail";
import TextFieldPassword from "src/modules/shared/presentation/molecules/TextFieldPassword";
import useForm from "src/modules/shared/infrastructure/hooks/useForm";
import { useCoreAuth } from "src/modules/core/infrastructure/bloc/CoreAuthBlocProvider";

const FormLogin: React.FC = () => {
  const { bloc } = useCoreAuth();
  const [form, handleChange, clean] = useForm({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const { email, password } = form;
    bloc.signIn(email, password).then(() => setLoading(false));
  };

  useEffect(
    () => () => {
      setLoading(false);
      clean();
    },
    []
  );

  return (
    <MuiBox
      data-testid="form-login"
      component="form"
      py={2}
      px={6}
      sx={{ minWidth: "100%" }}
      onSubmit={handleSubmit}
    >
      <MuiTypography variant="h4" component="h4" align="center" gutterBottom>
        Iniciar sesión
      </MuiTypography>
      <MuiBox mb={2}>
        <TextFieldEmail onChange={handleChange("email")} value={form.email} />
        <TextFieldPassword
          onChange={handleChange("password")}
          value={form.password}
        />
      </MuiBox>
      <MuiLoadingButton
        variant="contained"
        fullWidth
        type="submit"
        loading={loading}
      >
        Entrar
      </MuiLoadingButton>
    </MuiBox>
  );
};

export default FormLogin;
