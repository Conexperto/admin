import { FirebaseApp } from "firebase/app";
import { FirebaseClientFactory } from "../FirebaseClientFactory";
import * as adminConfig from "../../../config/adminsdk.json";
import * as webConfig from "../../../config/websdk.json";
import { Nullable } from "src/modules/shared/domain/Nullable";

describe("FirebaseClientFactory", () => {
  describe("#createClient", () => {
    const factory = FirebaseClientFactory;
    let client: Nullable<FirebaseApp>;

    beforeEach(() => {
      client = factory.createClient("admin", adminConfig);
    });

    afterEach(() => {
      client = null;
    });

    it("create a new client with the connection already established", () => {
      expect(client).not.toBeNull();
    });

    it("creates a new client if it does not exist a client with the given name", () => {
      const newClient = factory.createClient("web", webConfig);
      expect(newClient).not.toBe(client);
    });

    it("returns a client if it already exists", () => {
      const newClient = factory.createClient("admin", adminConfig);

      expect(newClient).toBe(client);
    });
  });
});
