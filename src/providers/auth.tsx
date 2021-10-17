import React, { useCallback } from "react";
import { admin } from "firebase";
import {
  browserSessionPersistence,
  getIdToken,
  onIdTokenChanged,
  setPersistence,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { Auth, IAuth } from "models";
import { createContextHooks } from "hooks";
import { ReactNode, useEffect, useState } from "react";
import { useAppContext } from "./app";

const { auth } = admin;

export interface AuthContextInterface {
  user: IAuth | null | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
export const [useAuthContext, Provider] =
  createContextHooks<AuthContextInterface>();

type Props = {
  children?: ReactNode;
};
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IAuth | null>();
  const { toggleSnackbar, messageSnackbar, toggleLoader } = useAppContext();

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

  useEffect(
    () =>
      onIdTokenChanged(auth, async (user: User | null): Promise<void> => {
        toggleLoader(false);
        if (!user) {
          localStorage.removeItem("token");
          setUser(null);
          return;
        }

        const token = await getIdToken(user);
        setUser(new Auth({ uid: user.uid, a: user }));
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

  return <Provider value={{ login, logout, user }}>{children}</Provider>;
};
