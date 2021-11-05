import React, { useState, useEffect } from "react";
import type { SxProps } from "@mui/system";
import { Box, TextField } from "@mui/material";
import { TextFieldPassword } from "components";
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

export default function Credentials(): JSX.Element {
  const { user } = useAuthContext();
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const { data, setData, handleChange } = useFormData({
    email: "",
    password: "",
    displayName: "",
    phoneNumber: "",
  });
  const { onEdit, onSave, onCancel, dispatch } = useFabActionsContext();

  useEffect(() => {
    if (!user) return;
    if (!user.a) return;

    setData({
      email: user.a.email ?? "",
      password: "",
      displayName: user.a.displayName ?? "",
      phoneNumber: user.a.phoneNumber ?? "",
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
          id="email"
          value={data.email}
          onChange={handleChange("email")}
          InputProps={{
            readOnly,
          }}
          label="Correo Electronico"
          variant="standard"
        />
        <TextFieldPassword readOnly={readOnly} />
        <TextField
          id="displayName"
          value={data.displayName}
          InputProps={{
            readOnly,
          }}
          label="Nombre de Usuario"
          variant="standard"
        />
        <TextField
          id="phoneNumber"
          value={data.phoneNumber}
          InputProps={{
            readOnly,
          }}
          label="Telefono"
          variant="standard"
        />
      </Box>
    </Box>
  );
}
