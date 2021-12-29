import { FirebaseClientFactory } from "../FirebaseClientFactory";

const FirebaseClientFactoryMock =
  jest.createMockFromModule<FirebaseClientFactory>("../FirebaseClientFactory");

console.info("FirebaseClientFactoryMock");
export { FirebaseClientFactoryMock as FirebaseClientFactory };
