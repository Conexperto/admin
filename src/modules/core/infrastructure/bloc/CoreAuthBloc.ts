import { Bloc } from "src/modules/shared/infrastructure/bloc/Bloc";
import { CoreAuthState, initialAuthState } from "../../domain/CoreAuthState";

export class CoreAuthBloc extends Bloc<CoreAuthState> {
  constructor(_initialAuthState: CoreAuthState = initialAuthState) {
    super(_initialAuthState);
  }

  signIn() {
    this.changeState({ ...this.state, logged: true });
  }

  signOut() {
    this.changeState({ ...this.state, logged: false });
  }
}
