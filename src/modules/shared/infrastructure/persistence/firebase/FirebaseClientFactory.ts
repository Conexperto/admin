import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import { initializeApp } from "firebase/app";
import { Nullable } from "src/modules/shared/domain/Nullable";

export class FirebaseClientFactory {
  private static clients: { [key: string]: FirebaseApp } = {};

  static createClient(
    contextName: string,
    config: FirebaseOptions
  ): FirebaseApp {
    let client = FirebaseClientFactory.getClient(contextName);

    if (!client) {
      client = initializeApp(config, contextName);

      FirebaseClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  static getClient(contextName: string): Nullable<FirebaseApp> {
    return FirebaseClientFactory.clients[contextName];
  }

  private static registerClient(client: FirebaseApp, contextName: string) {
    FirebaseClientFactory.clients[contextName] = client;
  }
}
