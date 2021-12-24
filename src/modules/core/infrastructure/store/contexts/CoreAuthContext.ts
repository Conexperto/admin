import { createContext } from "react";
import { ICoreAuthContext } from "../interfaces/CoreAuthContext";

export const CoreAuthContext = createContext<ICoreAuthContext>({
  logged: false,
});
