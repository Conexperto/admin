import type {
  User,
  Auth,
  ActionCodeSettings,
  UserCredential,
  AuthProvider,
  PopupRedirectResolver,
  PhoneAuthCredential,
  AuthCredential,
  ConfirmationResult,
  ApplicationVerifier,
} from "firebase/auth";
import {
  updateEmail,
  updatePassword,
  updateProfile,
  updateCurrentUser,
  updatePhoneNumber,
  verifyBeforeUpdateEmail,
  linkWithPopup,
  linkWithRedirect,
  linkWithCredential,
  linkWithPhoneNumber,
  unlink,
} from "@firebase/auth";

export abstract class FirebaseUserRepository {
  constructor(private _user: User) {}

  updateEmail(newEmail: string): Promise<void> {
    return updateEmail(this._user, newEmail);
  }

  updatePassword(newPassword: string): Promise<void> {
    return updatePassword(this._user, newPassword);
  }

  updatePhoneNumber(credential: PhoneAuthCredential): Promise<void> {
    return updatePhoneNumber(this._user, credential);
  }

  updateProfile(displayName: string, photoURL: string): Promise<void> {
    return updateProfile(this._user, { displayName, photoURL });
  }

  updateCurrentUser(auth: Auth): Promise<void> {
    return updateCurrentUser(auth, this._user);
  }

  verifyBeforeUpdateEmail(
    newEmail: string,
    actionCodeSettings: ActionCodeSettings
  ): Promise<void> {
    return verifyBeforeUpdateEmail(this._user, newEmail, actionCodeSettings);
  }

  linkWithPopup(
    provider: AuthProvider,
    resolver: PopupRedirectResolver
  ): Promise<UserCredential> {
    return linkWithPopup(this._user, provider, resolver);
  }

  linkWithRedirect(
    provider: AuthProvider,
    resolver: PopupRedirectResolver
  ): Promise<never> {
    return linkWithRedirect(this._user, provider, resolver);
  }

  linkWithCredential(credential: AuthCredential): Promise<UserCredential> {
    return linkWithCredential(this._user, credential);
  }

  linkWithPhoneNumber(
    phoneNumber: string,
    appVerifier: ApplicationVerifier
  ): Promise<ConfirmationResult> {
    return linkWithPhoneNumber(this._user, phoneNumber, appVerifier);
  }

  unlink(providerId: string): Promise<User> {
    return unlink(this._user, providerId);
  }
}
