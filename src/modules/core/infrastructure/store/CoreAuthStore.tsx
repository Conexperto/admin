import React, { useState } from "react";
import { CoreAuthContext } from "./contexts/CoreAuthContext";

export type AuthStoreProps = {
  initialState?: { logged: boolean };
};
export const CoreAuthStore: React.FC<AuthStoreProps> = ({
  children,
  initialState,
}) => {
  const [_logged, _setLogged] = useState<boolean>(
    initialState?.logged ?? false
  );

  return (
    <CoreAuthContext.Provider
      value={{
        logged: _logged,
      }}
    >
      {children}
    </CoreAuthContext.Provider>
  );
};
