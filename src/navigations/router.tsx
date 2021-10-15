import React from "react";
import { useAuthContext } from "providers";
import { AuthorizedStack } from "./authorized";
import { UnAuthorizedStack } from "./unauthorized";

export function Router(): JSX.Element {
  const auth = useAuthContext();

  return <>{auth?.user ? <AuthorizedStack /> : <UnAuthorizedStack />}</>;
}
