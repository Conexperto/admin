import React, { ChangeEventHandler, SyntheticEvent, useState } from "react";
import MuiTextField from "@mui/material/TextField";
import MuiInputAdornment from "@mui/material/InputAdornment";
import MuiIconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export type TextFieldPasswordProps = {
  value?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};
const TextFieldPassword: React.FC<TextFieldPasswordProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <MuiTextField
      data-testid="input-password"
      id="input-password"
      type="password"
      label="Contraseña"
      aria-label="Contraseña"
      variant="standard"
      fullWidth
      value={value ?? ""}
      onChange={onChange ?? (() => {})}
      disabled={disabled ?? false}
      InputProps={{
        endAdornment: (
          <MuiInputAdornment position="end">
            <MuiIconButton
              aria-label="toggle password visibility"
              onClick={() => setVisible(!visible)}
              onMouseDown={(event: SyntheticEvent) => event.preventDefault()}
              edge="end"
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </MuiIconButton>
          </MuiInputAdornment>
        ),
      }}
      sx={{ mb: 1 }}
    />
  );
};

export default TextFieldPassword;
