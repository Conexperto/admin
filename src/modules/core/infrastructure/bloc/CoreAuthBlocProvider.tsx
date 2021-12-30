import { ReactChild, ReactChildren, useEffect, useRef, useState } from "react";
import createContextHook from "src/modules/shared/infrastructure/hooks/createContext";
import { FirebaseAuthClientFactory } from "src/modules/shared/infrastructure/persistence/firebase/FirebaseAuthClientFactory";
import { FirebaseClientFactory } from "src/modules/shared/infrastructure/persistence/firebase/FirebaseClientFactory";
import { CoreAuthState } from "../../domain/CoreAuthState";
import { FirebaseCoreAuthRepository } from "../persistence/FirebaseCoreAuthRepository";
import { CoreAuthBloc } from "./CoreAuthBloc";
import * as config from "src/modules/shared/infrastructure/config/adminsdk.json";
import { LocalStorageFactory } from "src/modules/shared/infrastructure/persistence/local-storage/LocalStorageFactory";
import { User } from "firebase/auth";
import { useCoreApp } from "./CoreAppBlocProvider";

export const [useCoreAuth, CoreAuthProvider] =
  createContextHook<{ bloc: CoreAuthBloc; state: CoreAuthState<User> }>();

export type CoreAuthBlocProviderProps = {
  initialState?: CoreAuthState<User>;
  children: ReactChild | ReactChildren;
};

export const CoreAuthBlocProvider: React.FC<CoreAuthBlocProviderProps> = ({
  initialState,
  children,
}) => {
  const app = useCoreApp();
  const bloc = useRef(
    new CoreAuthBloc(
      new FirebaseCoreAuthRepository(
        FirebaseAuthClientFactory.createClient(
          "admin",
          FirebaseClientFactory.createClient("admin", config)
        )
      ),
      new LocalStorageFactory(),
      app.bloc,
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

  return (
    <CoreAuthProvider value={{ bloc: bloc.current, state }}>
      {children}
    </CoreAuthProvider>
  );
};
