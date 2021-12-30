import { FirebaseCoreAuthRepository } from "../FirebaseCoreAuthRepository";

const FirebaseCoreAuthRepositoryMock = jest.fn(() => {
  const proto = jest.createMockFromModule<FirebaseCoreAuthRepository>(
    "../FirebaseCoreAuthRepository"
  );

  proto.onAuthStateChanged = jest.fn();
  proto.onIdTokenChanged = jest.fn();
  proto.createUserWithEmailAndPassword = jest.fn();
  proto.signInWithEmailAndPassword = jest.fn();
  proto.currentUser = jest.fn();
  proto.signOut = jest.fn();

  return proto;
});

export { FirebaseCoreAuthRepositoryMock as FirebaseCoreAuthRepository };
