import { useState } from "react";
import type { ChangeEvent } from "react";

type HandleChange = (
  field: string
) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;

export function useFormData<A extends {} | null>(
  initialState: A
): { data: A; handleChange: HandleChange } {
  const [data, setData] = useState<A>(initialState);

  const handleChange: HandleChange =
    (field: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return {
    data,
    handleChange,
  };
}
