import { User } from "firebase/auth";
import { Bloc } from "src/modules/shared/infrastructure/bloc/Bloc";
import { LocalStorageFactory } from "src/modules/shared/infrastructure/presistence/local-storage/LocalStorageFactory";
import { CoreAuthState, initialAuthState } from "../../domain/CoreAuthState";
import { FirebaseCoreAuthRepository } from "../persistence/FirebaseCoreAuthRepository";

export class CoreAuthBloc extends Bloc<CoreAuthState<User>> {
  constructor(
    private repository: FirebaseCoreAuthRepository,
    private localStore: LocalStorageFactory,
    _initialAuthState: CoreAuthState<User> = initialAuthState
  ) {
    super(_initialAuthState);
  }

  onAuthStateChanged() {
    return this.repository.onAuthStateChanged((user) => {
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
    } catch (e) {
      console.error(e);
    }
  }

  async signOut() {
    try {
      await this.repository.signOut();
    } catch (e) {
      console.error(e);
    }
  }
}
