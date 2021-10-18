import React from "react";
import type { MouseEvent, ChangeEvent } from "react";
import { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props = {
  onChange?: (
    field: string
  ) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  fullWidth?: boolean;
  required?: boolean;
};
export default function TextFieldPassword({
  onChange,
  required,
  fullWidth,
}: Props) {
  const [state, setState] = useState(false);

  const handleClickShowPassword = (event: MouseEvent) => {
    setState(!state);
  };

  const handleMouseDownPassword = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth={fullWidth} variant="standard" required={required}>
      <InputLabel htmlFor="form_password">Contraseña</InputLabel>
      <Input
        id="form_password"
        type={state ? "text" : "password"}
        onChange={onChange && onChange("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {state ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
