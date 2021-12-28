import { ReactChild, ReactChildren, useEffect, useRef, useState } from "react";
import createContextHook from "src/modules/shared/infrastructure/hooks/createContext";
import { FirebaseAuthClientFactory } from "src/modules/shared/infrastructure/presistence/firebase/FirebaseAuthClientFactory";
import { FirebaseClientFactory } from "src/modules/shared/infrastructure/presistence/firebase/FirebaseClientFactory";
import { CoreAuthState } from "../../domain/CoreAuthState";
import { FirebaseCoreAuthRepository } from "../persistence/FirebaseCoreAuthRepository";
import { CoreAuthBloc } from "./CoreAuthBloc";
import * as config from "../config/adminsdk.json";
import { LocalStorageFactory } from "src/modules/shared/infrastructure/presistence/local-storage/LocalStorageFactory";
import { User } from "firebase/auth";
import { FirebaseCoreUserRepository } from "../persistence/FirebaseCoreUserRepository";

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
  const bloc = useRef(
    new CoreAuthBloc(
      new FirebaseCoreAuthRepository(
        FirebaseAuthClientFactory.createClient(
          "admin",
          FirebaseClientFactory.createClient("admin", config)
        )
      ),
      new LocalStorageFactory(),
      initialState
    )
  );
  const [state, setState] = useState<CoreAuthState<User>>(bloc.current.state);

  useEffect(() => {
    const stateSubscription = (state: CoreAuthState<User>) => {
      setState(state);
    };

    bloc.current.subscribe(stateSubscription);

    return () => bloc.current.unsubscribe(stateSubscription);
  }, []);

  useEffect(() => bloc.current.onAuthStateChanged(), []);

  useEffect(() => bloc.current.onIdTokenChanged(), []);

  return <Provider value={{ bloc: bloc.current, state }}>{children}</Provider>;
};
