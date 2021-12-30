import { FirebaseClientFactory } from "../FirebaseClientFactory";

const FirebaseClientFactoryMock = jest.createMockFromModule<
  FirebaseClientFactory & { createClient: () => void }
>("../FirebaseClientFactory");

FirebaseClientFactoryMock.createClient = jest.fn();

export { FirebaseClientFactoryMock as FirebaseClientFactory };
