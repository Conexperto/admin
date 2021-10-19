import { useState, useCallback } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";

type HandleChange = (
  field: string
) => (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;

export function useFormData<A extends {} | null>(
  initialState: A
): {
  data: A;
  setData: Dispatch<SetStateAction<A>>;
  handleChange: HandleChange;
} {
  const [data, setData] = useState<A>(initialState);

  const handleChange: HandleChange = useCallback(
    (field: string) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));
      },
    [setData]
  );

  return {
    data,
    setData,
    handleChange,
  };
}
