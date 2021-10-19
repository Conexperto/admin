import React from "react";
import { useState, useEffect } from "react";
import type { SxProps } from "@mui/system";
import { Box, Fab, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useAuthContext } from "providers";
import { useFormData } from "hooks";

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
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const { data, setData, handleChange } = useFormData({
    name: "",
    lastname: "",
  });

  useEffect(() => {
    if (!user) return;
    if (!user.b) return;

    setData({ name: user.b.name, lastname: user.b.lastname });
  }, [user, setData]);

  return (
    <Box>
      <Box component="form" sx={styleForm}>
        <TextField
          id="name"
          value={data.name}
          InputProps={{
            readOnly: readOnly,
          }}
          onChange={handleChange("name")}
          label="Nombre"
          variant="standard"
        />
        <TextField
          id="lastname"
          value={data.lastname}
          InputProps={{
            readOnly,
          }}
          onChange={handleChange("lastname")}
          label="Apellido"
          variant="standard"
        />
      </Box>
      <Fab
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        aria-label="Editar"
        color="primary"
        onClick={() => setReadOnly((prevState: boolean) => !prevState)}
      >
        <Edit />
      </Fab>
    </Box>
  );
}
