import { FirebaseAuthClientFactory } from "../FirebaseAuthClientFactory";

const FirebaseAuthClientFactoryMock = jest.createMockFromModule<
  FirebaseAuthClientFactory & { createClient: () => void }
>("../FirebaseAuthClientFactory");

FirebaseAuthClientFactoryMock.createClient = jest.fn();

export { FirebaseAuthClientFactoryMock as FirebaseAuthClientFactory };
