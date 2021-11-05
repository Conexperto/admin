import React, { useCallback, useEffect, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import { admin } from "firebase";
import {
  browserSessionPersistence,
  getIdToken,
  getIdTokenResult,
  onIdTokenChanged,
  setPersistence,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import type { Auth } from "models";
import { Privileges } from "models";
import { createContextHooks } from "hooks";
import { useAppContext } from "./app";

const { auth } = admin;

export interface AuthContextInterface {
  user: Auth | null | undefined;
  setUser: Dispatch<SetStateAction<Auth | null | undefined>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  privileges: () => string;
}
export const [useAuthContext, Provider] =
  createContextHooks<AuthContextInterface>();

type Props = {
  children?: ReactNode;
};
export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<Auth | null>();
  const { toggleSnackbar, messageSnackbar, toggleLoader } = useAppContext();

  useEffect(
    () =>
      onIdTokenChanged(auth, async (user: User | null): Promise<void> => {
        toggleLoader(false);
        if (!user) {
          localStorage.removeItem("token");
          setUser(null);
          return;
        }
        const { token, claims } = await getIdTokenResult(user);
        setUser({ uid: user.uid, a: { ...user, claims } });
        // required by HttpClient
        localStorage.setItem("token", token);
      }),
    [toggleLoader]
  );

  useEffect(() => {
    const handler = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await getIdToken(user, true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handler);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error(err);
        messageSnackbar("Oops, problemas con la autenticacion.");
        toggleSnackbar(true);
      }
    },
    [messageSnackbar, toggleSnackbar]
  );

  const logout = useCallback(async (): Promise<void> => {
    await auth.signOut();
  }, []);

  const privileges = (): string => Privileges[user?.a?.claims?.access_level];

  return (
    <Provider value={{ login, logout, user, setUser, privileges }}>
      {children}
    </Provider>
  );
};
