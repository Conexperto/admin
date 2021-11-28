import React from "react";
import { useState, useEffect } from "react";
import type { SxProps } from "@mui/system";
import { Box, TextField } from "@mui/material";
import { useAuthContext, useFabActionsContext } from "providers";
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
  const { onEdit, onSave, onCancel, dispatch } = useFabActionsContext();

  useEffect(() => {
    if (!user) return;
    if (!user.b) return;

    setData({
      name: user.b.name ?? "",
      lastname: user.b.lastname ?? "",
    });
  }, [user, setData]);

  useEffect(() => {
    return () => {
      dispatch("default");
    };
  }, [dispatch]);

  useEffect(
    () =>
      onEdit(() => {
        dispatch("action");
        setReadOnly(false);
      }),
    [onEdit, dispatch]
  );

  useEffect(
    () =>
      onSave(() => {
        dispatch("default");
        setReadOnly(true);
      }),
    [onSave, dispatch]
  );

  useEffect(
    () =>
      onCancel(() => {
        dispatch("default");
        setReadOnly(true);
      }),
    [onCancel, dispatch]
  );

  return (
    <Box>
      <Box component="form" sx={styleForm}>
        <TextField
          id="name"
          value={data.name}
          onChange={handleChange("name")}
          InputProps={{
            readOnly,
          }}
          label="Nombre"
          variant="standard"
        />
        <TextField
          id="lastname"
          value={data.lastname}
          onChange={handleChange("lastname")}
          InputProps={{
            readOnly,
          }}
          label="Apellido"
          variant="standard"
        />
      </Box>
    </Box>
  );
}
