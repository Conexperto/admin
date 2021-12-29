import { FirebaseAuthClientFactory } from "../FirebaseAuthClientFactory";

const FirebaseAuthClientFactoryMock =
  jest.createMockFromModule<FirebaseAuthClientFactory>(
    "../FirebaseAuthClientFactory"
  );

console.info("FirebaseAuthClientFactoryMock");
export { FirebaseAuthClientFactoryMock as FirebaseAuthClientFactory };
