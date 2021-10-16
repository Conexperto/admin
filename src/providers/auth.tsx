import React from "react";
import { admin } from "firebase";
import {
  browserSessionPersistence,
  getIdToken,
  onIdTokenChanged,
  setPersistence,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { createContextHooks } from "hooks";
import { ReactNode, useEffect, useState } from "react";
import { useAppContext } from "./app";

const { auth } = admin;

export interface AuthContextInterface {
  user: User | null | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
export const [useAuthContext, Provider] =
  createContextHooks<AuthContextInterface>();

type Props = {
  children?: ReactNode;
};
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>();
  const { toggleSnackbar, messageSnackbar } = useAppContext();

  async function login(email: string, password: string): Promise<void> {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      messageSnackbar("Oops, problemas con la autenticacion.");
      toggleSnackbar(true);
    }
  }

  async function logout(): Promise<void> {
    await auth.signOut();
  }

  useEffect(
    () =>
      onIdTokenChanged(auth, async (user: User | null): Promise<void> => {
        if (!user) {
          localStorage.removeItem("token");
          setUser(null);
          return;
        }
        const token = await getIdToken(user);
        localStorage.setItem("token", token);
      }),
    []
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
