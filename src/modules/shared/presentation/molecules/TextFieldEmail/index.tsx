import React, { ChangeEventHandler } from "react";
import MuiTextField from "@mui/material/TextField";
import MuiInputAdornment from "@mui/material/InputAdornment";
import Email from "@mui/icons-material/Email";

export type TextFieldEmailProps = {
  value?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
const TextFieldEmail: React.FC<TextFieldEmailProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <MuiTextField
      data-testid="input-email"
      id="input-email"
      type="email"
      label="Correo Electronico"
      aria-label="Correo Electronico"
      variant="standard"
      fullWidth
      value={value ?? ""}
      onChange={onChange ?? (() => {})}
      disabled={disabled ?? false}
      InputProps={{
        endAdornment: (
          <MuiInputAdornment position="end">
            <Email />
          </MuiInputAdornment>
        ),
      }}
      sx={{ mb: 1 }}
    />
  );
};

export default TextFieldEmail;
