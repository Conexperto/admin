import { FirebaseApp } from "firebase/app";
import { FirebaseClientFactory } from "../FirebaseClientFactory";
import * as adminConfig from "../../../config/adminsdk.json";
import * as webConfig from "../../../config/websdk.json";
import { Nullable } from "src/modules/shared/domain/Nullable";
import { FirebaseAuthClientFactory } from "../FirebaseAuthClientFactory";
import { Auth } from "firebase/auth";

describe("FirebaseAuthClientFactory", () => {
  describe("#createClient", () => {
    const factory = FirebaseAuthClientFactory;
    const factoryClient = FirebaseClientFactory;
    let client: Nullable<FirebaseApp>;
    let clientAuth: Nullable<Auth>;

    beforeEach(() => {
      client = factoryClient.createClient("admin", adminConfig);
      clientAuth = factory.createClient("admin", client);
    });

    afterEach(() => {
      client = null;
      clientAuth = null;
    });

    it("create a new client with the connection already established", () => {
      expect(clientAuth).not.toBeNull();
    });

    it("creates a new client if it does not exist a client with the given name", () => {
      const client2 = factoryClient.createClient("web", webConfig);
      const newClient = factory.createClient("web", client2);
      expect(newClient).not.toBe(clientAuth);
    });

    it("returns a client if it already exists", () => {
      const client2 = factoryClient.createClient("admin", adminConfig);
      const newClient = factory.createClient("admin", client2);

      expect(newClient).toBe(clientAuth);
    });
  });
});
