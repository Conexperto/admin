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

  async function login(email: string, password: string): Promise<void> {
    await setPersistence(auth, browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
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
