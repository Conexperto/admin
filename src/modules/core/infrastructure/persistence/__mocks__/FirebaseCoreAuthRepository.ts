import { FirebaseCoreAuthRepository } from "../FirebaseCoreAuthRepository";

const FirebaseCoreAuthRepositoryMock = jest.fn(() =>
  jest.createMockFromModule<FirebaseCoreAuthRepository>(
    "../FirebaseCoreAuthRepository"
  )
);

export { FirebaseCoreAuthRepositoryMock as FirebaseCoreAuthRepository };
