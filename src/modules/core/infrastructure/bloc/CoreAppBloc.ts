import { Bloc } from "src/modules/shared/domain/Bloc";
import { CoreAppState, initialAppState } from "../../domain/CoreAppState";

export class CoreAppBloc extends Bloc<CoreAppState> {
  constructor(_initialAppState: CoreAppState = initialAppState) {
    super(_initialAppState);
  }

  updateTitle(title: string) {
    this.changeState({ ...this.state, title });
  }

  openLoader() {
    this.changeState({ ...this.state, loader: true });
  }

  closeLoader() {
    this.changeState({ ...this.state, loader: false });
  }

  openSnackbar(message: string, severity: string = "info") {
    this.changeState({
      ...this.state,
      snackbar: {
        open: true,
        message,
        severity,
      },
    });
  }

  closeSnackbar() {
    this.changeState({
      ...this.state,
      snackbar: {
        open: false,
      },
    });
  }

  openDrawer() {
    this.changeState({ ...this.state, drawer: true });
  }

  closeDrawer() {
    this.changeState({ ...this.state, drawer: false });
  }

  toggleDrawer(state?: boolean) {
    this.changeState({
      ...this.state,
      drawer: state ?? !this.state.drawer,
    });
  }

  openOverflowMenu(event: Element) {
    this.changeState({ ...this.state, overflowMenu: event });
  }

  closeOverflowMenu() {
    this.changeState({ ...this.state, overflowMenu: null });
  }

  toggleOverflowMenu(event: Element) {
    this.changeState({
      ...this.state,
      overflowMenu: event === this.state.overflowMenu ? null : event,
    });
  }
}
