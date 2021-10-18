import React from "react";
import type { SxProps } from "@mui/system";
import { Box, Fab, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { TextFieldPassword } from "components";

const styleForm: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  "& > :not(style)": {
    m: 1,
    width: "calc(50% - 16px)",
  },
};

function Form(): JSX.Element {
  return (
    <Box component="form" sx={styleForm}>
      <TextField id="email" label="Correo Electronico" variant="standard" />
      <TextFieldPassword />
      <TextField
        id="displayName"
        label="Nombre de Usuario"
        variant="standard"
      />
      <TextField id="phoneNumber" label="Telefono" variant="standard" />
    </Box>
  );
}

export default function Credentials(): JSX.Element {
  return (
    <Box>
      <Form />
      <Fab
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        aria-label="Editar"
        color="primary"
      >
        <Edit />
      </Fab>
    </Box>
  );
}
