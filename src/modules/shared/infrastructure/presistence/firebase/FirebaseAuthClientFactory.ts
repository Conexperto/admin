import type { FirebaseApp } from "@firebase/app";
import type { Auth } from "@firebase/auth";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { Nullable } from "src/modules/shared/domain/Nullable";

const env: { [key: string]: any } = {
  admin: import.meta.env.VITE_EMULATOR_ADMIN_HOST,
  web: import.meta.env.VITE_EMULATOR_WEB_HOST,
};

export class FirebaseAuthClientFactory {
  private static clients: { [key: string]: Auth } = {};

  static createClient(contextName: string, app: FirebaseApp) {
    let client = FirebaseAuthClientFactory.getClient(contextName);
    if (!client) {
      client = getAuth(app);

      const emulator_host = env[contextName];
      if (emulator_host) {
        connectAuthEmulator(client, emulator_host);
      }

      FirebaseAuthClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  static getClient(contextName: string): Nullable<Auth> {
    return FirebaseAuthClientFactory.clients[contextName];
  }

  private static registerClient(client: Auth, contextName: string) {
    FirebaseAuthClientFactory.clients[contextName] = client;
  }
}
