import React from "react";
import type { SxProps } from "@mui/system";
import { Box, Fab, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { TextFieldPassword } from "components";
import { useAuthContext } from "providers";

const styleForm: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  "& > :not(style)": {
    m: 1,
    width: "calc(50% - 16px)",
  },
};

export default function Credentials(): JSX.Element {
  const { user } = useAuthContext();

  return (
    <Box>
      <Box component="form" sx={styleForm}>
        <TextField
          id="email"
          value={user?.a.email ?? ""}
          label="Correo Electronico"
          variant="standard"
        />
        <TextFieldPassword />
        <TextField
          id="displayName"
          value={user?.a.displayName ?? ""}
          label="Nombre de Usuario"
          variant="standard"
        />
        <TextField
          id="phoneNumber"
          value={user?.a.phoneNumber ?? ""}
          label="Telefono"
          variant="standard"
        />
      </Box>
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
