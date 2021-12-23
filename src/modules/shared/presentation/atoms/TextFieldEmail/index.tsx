import React, { ChangeEventHandler } from "react";
import MuiTextField from "@mui/material/TextField";
import MuiInputAdornment from "@mui/material/InputAdornment";
import Email from "@mui/icons-material/Email";

export type TextFieldEmailProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
const TextFieldEmail: React.FC<TextFieldEmailProps> = ({ value, onChange }) => {
  return (
    <MuiTextField
      id="input-email"
      type="email"
      label="Correo Electronico"
      aria-label="Correo Electronico"
      variant="standard"
      fullWidth
      value={value}
      onChange={onChange}
      inputProps={{
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
