import React, { ChangeEvent, useState } from "react";

const useForm = <T extends Object>(initialFormValues: T) => {
  const [form, setFormValues] = useState<T>(initialFormValues);

  const handleChange =
    (field: string) =>
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFormValues((prevState) => ({
        ...prevState,
        [field]: event.target.value,
      }));
    };

  return [form, handleChange] as const;
};

export default useForm;
