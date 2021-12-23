import React from "react";
import MuiFormControlLabel, {
  FormControlLabelProps as MuiFormControlLabelProps,
} from "@mui/material/FormControlLabel";
import MuiFormGroup from "@mui/material/FormGroup";
import MuiCheckbox from "@mui/material/Checkbox";

export type CheckboxProps = Omit<MuiFormControlLabelProps, "control">;
const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <MuiFormGroup>
      <MuiFormControlLabel {...props} control={<MuiCheckbox />} />
    </MuiFormGroup>
  );
};

export default Checkbox;
