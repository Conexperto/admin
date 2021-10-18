import React from "react";
import type { SxProps } from "@mui/system";
import { Box, Fab, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";

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
      <TextField id="name" label="Nombre" variant="standard" />
      <TextField id="lastname" label="Apellido" variant="standard" />
    </Box>
  );
}

export default function Info(): JSX.Element {
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
