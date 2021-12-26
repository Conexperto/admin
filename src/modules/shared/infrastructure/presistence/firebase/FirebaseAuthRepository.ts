import type { Auth, Persistence, User, UserCredential } from "@firebase/auth";
import type { NextFn, Unsubscribe, ErrorFn, CompleteFn } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
  setPersistence,
} from "@firebase/auth";
import { Nullable } from "src/modules/shared/domain/Nullable";

export abstract class FirebaseAuthRepository {
  constructor(private _client: Auth) {}

  onIdTokenChanged(
    observer: NextFn<Nullable<User>>,
    error: ErrorFn,
    completed: CompleteFn
  ): Unsubscribe {
    return onIdTokenChanged(this._client, observer, error, completed);
  }

  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this._client, email, password);
  }

  currentUser(): Nullable<User> {
    return this._client.currentUser;
  }

  setPersistence(persistence: Persistence): Promise<void> {
    return setPersistence(this._client, persistence);
  }

  signOut(): Promise<void> {
    return signOut(this._client);
  }
}
