import { AlertColor } from "@mui/material";
import React, { ReactChild, ReactChildren, useEffect, useState } from "react";
import createContextHook from "src/modules/shared/infrastructure/hooks/createContext";
import { CoreAppState } from "../../domain/CoreAppState";
import Loader from "../../presentation/molecules/Loader";
import Snackbar from "../../presentation/molecules/Snackbar";
import { CoreAppBloc } from "./CoreAppBloc";

export const [useCoreApp, Provider] =
  createContextHook<{ bloc: CoreAppBloc; state: CoreAppState }>();

export type CoreAppBlocProviderProps = {
  initialState?: CoreAppState;
  children: ReactChild | ReactChildren;
};
export const CoreAppBlocProvider: React.FC<CoreAppBlocProviderProps> = ({
  initialState,
  children,
}) => {
  const bloc = new CoreAppBloc(initialState);
  const [state, setState] = useState<CoreAppState>(bloc.state);

  useEffect(() => {
    const stateSubscription = (state: CoreAppState) => {
      setState(state);
    };

    bloc.subscribe(stateSubscription);

    return () => bloc.unsubscribe(stateSubscription);
  });

  const { loader, snackbar } = state;
  return (
    <Provider value={{ bloc, state }}>
      {children}
      <Loader state={loader} />
      <Snackbar
        state={snackbar.open}
        message={snackbar.message ?? ""}
        severity={snackbar.severity as AlertColor}
        onClose={() => bloc.closeSnackbar()}
      />
    </Provider>
  );
};
