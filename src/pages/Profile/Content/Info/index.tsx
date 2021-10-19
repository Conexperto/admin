import React from "react";
import type { SxProps } from "@mui/system";
import { Box, Fab, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useAuthContext } from "providers";

const styleForm: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  "& > :not(style)": {
    m: 1,
    width: "calc(50% - 16px)",
  },
};

export default function Info(): JSX.Element {
  const { user } = useAuthContext();

  console.log(user);
  return (
    <Box>
      <Box component="form" sx={styleForm}>
        <TextField
          id="name"
          value={user?.b?.name ?? ""}
          label="Nombre"
          variant="standard"
        />
        <TextField
          id="lastname"
          value={user?.b?.lastname ?? ""}
          label="Apellido"
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
