import React, { useRef, FormEvent } from "react";
import { makeStyles } from "@mui/styles";
import { Box, TextField } from "@mui/material";
import { useAuthContext } from "providers";
import { useFormData } from "hooks";
import { TextFieldPassword, ButtonLoading } from "components";

const useStyles = makeStyles(() => ({
  title: {},
  form: {
    "& > :not(style)": {
      mt: 1,
      mb: 1,
      width: "100%",
    },
  },
  whiteSpace: {
    height: "15px",
  },
}));

type Credentials = {
  email: string;
  password: string;
};
export function Login(): JSX.Element {
  const classes = useStyles();
  const { login } = useAuthContext();
  const { data, handleChange } = useFormData<Credentials>({
    email: "",
    password: "",
  });
  const submit = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { email, password } = data;

    await login(email, password);
  };

  return (
    <>
      <h1 className={classes.title}>Iniciar Sesion</h1>
      <Box
        component="form"
        sx={{ "& > :not(style)": { mt: 1, mb: 1 } }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Correo Electronico"
          fullWidth
          variant="standard"
          onChange={handleChange("email")}
          required
        />
        <TextFieldPassword handleChange={handleChange} required />
        <div className={classes.whiteSpace}></div>
        <ButtonLoading submit={submit} />
        <button hidden type="submit" ref={submit}></button>
      </Box>
    </>
  );
}
