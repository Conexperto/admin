import type { Auth, Persistence, User, UserCredential } from "@firebase/auth";
import type { NextFn, Unsubscribe, ErrorFn, CompleteFn } from "@firebase/util";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  onIdTokenChanged,
  signOut,
} from "@firebase/auth";
import { Nullable } from "src/modules/shared/domain/Nullable";
import { FirebaseError } from "firebase/app";
import { FirebaseHandlerError } from "./FirebaseHandlerError";

export abstract class FirebaseAuthRepository {
  constructor(private _client: Auth) {}

  onAuthStateChanged(
    observer: NextFn<Nullable<User>>,
    error?: ErrorFn,
    completed?: CompleteFn
  ): Unsubscribe {
    return onAuthStateChanged(
      this._client,
      observer,
      this.handeCallbackError(error),
      completed
    );
  }

  onIdTokenChanged(
    observer: NextFn<Nullable<User>>,
    error?: ErrorFn,
    completed?: CompleteFn
  ): Unsubscribe {
    return onIdTokenChanged(
      this._client,
      observer,
      this.handeCallbackError(error),
      completed
    );
  }

  async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(
        this._client,
        email,
        password
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this._client, email, password);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  currentUser(): Nullable<User> {
    return this._client.currentUser;
  }

  async signOut(): Promise<void> {
    try {
      return await signOut(this._client);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): FirebaseHandlerError {
    if (error instanceof FirebaseError) {
      return new FirebaseHandlerError(
        error.code,
        error.message,
        error.customData
      );
    }
    return new FirebaseHandlerError("", "");
  }

  private handeCallbackError(errorFn?: ErrorFn): ErrorFn {
    return (error) => (errorFn ? errorFn(this.handleError(error)) : undefined);
  }
}
