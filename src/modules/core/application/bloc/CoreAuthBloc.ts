import { User } from "firebase/auth";
import { Bloc } from "src/modules/shared/domain/Bloc";
import { FirebaseHandlerError } from "src/modules/shared/infrastructure/persistence/firebase/FirebaseHandlerError";
import { LocalStorageFactory } from "src/modules/shared/infrastructure/persistence/local-storage/LocalStorageFactory";
import { CoreAuthState, initialAuthState } from "../../domain/CoreAuthState";
import { FirebaseCoreAuthRepository } from "../../infrastructure/persistence/FirebaseCoreAuthRepository";
import { CoreAppBloc } from "./CoreAppBloc";

export class CoreAuthBloc extends Bloc<CoreAuthState<User>> {
  constructor(
    private repository: FirebaseCoreAuthRepository,
    private localStore: LocalStorageFactory,
    private blocApp: CoreAppBloc,
    _initialAuthState: CoreAuthState<User> = initialAuthState
  ) {
    super(_initialAuthState);
  }

  onAuthStateChanged() {
    return this.repository.onAuthStateChanged((user) => {
      this.blocApp.closeLoader();
      if (!user) {
        return this.changeState({ ...this.state, user: null });
      }
      this.changeState({ ...this.state, user });
    });
  }

  onIdTokenChanged() {
    return this.repository.onIdTokenChanged(async (user) => {
      if (!user) {
        return this.localStore.remove("token");
      }
      this.localStore.add("token", await user.getIdToken());
    });
  }

  async signIn(email: string, password: string) {
    try {
      await this.repository.signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error instanceof FirebaseHandlerError) {
        return this.blocApp.openSnackbar(error.description);
      }
      this.blocApp.openSnackbar("Oops, error inesperado");
    }
  }

  async signOut() {
    try {
      await this.repository.signOut();
    } catch (error) {
      if (error instanceof FirebaseHandlerError) {
        return this.blocApp.openSnackbar(error.description);
      }
      this.blocApp.openSnackbar("Oops, error inesperado");
    }
  }
}
