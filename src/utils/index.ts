import { FirebaseApp } from "firebase/app";

export const readyApp = (name: string, apps: FirebaseApp[]): boolean =>
  apps.some((val) => val?.name === name);
