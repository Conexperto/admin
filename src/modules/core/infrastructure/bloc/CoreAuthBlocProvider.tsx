import { ReactChild, ReactChildren, useEffect, useState } from "react";
import createContextHook from "src/modules/shared/infrastructure/hooks/createContext";
import { FirebaseAuthClientFactory } from "src/modules/shared/infrastructure/presistence/firebase/FirebaseAuthClientFactory";
import { FirebaseClientFactory } from "src/modules/shared/infrastructure/presistence/firebase/FirebaseClientFactory";
import { CoreAuthState } from "../../domain/CoreAuthState";
import { FirebaseCoreAuthRepository } from "../persistence/FirebaseCoreAuthRepository";
import { CoreAuthBloc } from "./CoreAuthBloc";
import * as config from "../config/adminsdk.json";
import { LocalStorageFactory } from "src/modules/shared/infrastructure/presistence/local-storage/LocalStorageFactory";
import { User } from "firebase/auth";

export const [useCoreAuth, Provider] =
  createContextHook<{ bloc: CoreAuthBloc; state: CoreAuthState<User> }>();

export type CoreAuthBlocProviderProps = {
  initialState?: CoreAuthState<User>;
  children: ReactChild | ReactChildren;
};

export const CoreAuthBlocProvider: React.FC<CoreAuthBlocProviderProps> = ({
  initialState,
  children,
}) => {
  const firebaseClient = FirebaseClientFactory.createClient("admin", config);
  const authClient = FirebaseAuthClientFactory.createClient(
    "admin",
    firebaseClient
  );
  const bloc = new CoreAuthBloc(
    new FirebaseCoreAuthRepository(authClient),
    new LocalStorageFactory(),
    initialState
  );
  const [state, setState] = useState<CoreAuthState<User>>(bloc.state);

  useEffect(() => {
    const stateSubscription = (state: CoreAuthState<User>) => {
      setState(state);
    };

    bloc.subscribe(stateSubscription);

    return () => bloc.unsubscribe(stateSubscription);
  });

  useEffect(() => bloc.onAuthStateChanged(), []);

  useEffect(() => bloc.onIdTokenChanged(), []);

  return <Provider value={{ bloc, state }}>{children}</Provider>;
};
