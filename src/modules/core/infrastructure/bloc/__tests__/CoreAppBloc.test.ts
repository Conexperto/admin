import { CoreAppBloc } from "src/modules/core/application/bloc/CoreAppBloc";
import { CoreAppState } from "src/modules/core/domain/CoreAppState";

describe("CoreAppBloc", () => {
  let bloc: CoreAppBloc;

  beforeEach(() => {
    bloc = new CoreAppBloc();
  });

  it("should changed the state of title and call subscribe", (done) => {
    const title = "My title";
    const subscriber = (state: CoreAppState) => {
      expect(state.title).toBe(title);
      bloc.unsubscribe(subscriber);
      done();
    };
    bloc.subscribe(subscriber);

    bloc.updateTitle(title);
  });

  it("should changed the state of loader and call subscribe", (done) => {
    const subscriber = (state: CoreAppState) => {
      expect(state.loader).toBeTruthy();
      bloc.unsubscribe(subscriber);
      done();
    };
    bloc.subscribe(subscriber);

    bloc.openLoader();
  });

  it("should changed the state of loader to close and call subscribe", (done) => {
    const subscriber = (state: CoreAppState) => {
      expect(state.loader).not.toBeTruthy();
      bloc.unsubscribe(subscriber);
      done();
    };
    bloc.subscribe(subscriber);

    bloc.closeLoader();
  });

  it("should changed the state of snackbar and call subscribe", (done) => {
    const message = "My snackbar";
    const subscriber = (state: CoreAppState) => {
      expect(state.snackbar.open).toBeTruthy();
      expect(state.snackbar.message).toBe(message);
      bloc.unsubscribe(subscriber);
      done();
    };
    bloc.subscribe(subscriber);

    bloc.openSnackbar(message);
  });

  it("should changed the state of snackbar to close and call subscribe", (done) => {
    bloc.changeState({
      ...bloc.state,
      snackbar: { open: true, message: "My snackbar" },
    });
    const subscriber = (state: CoreAppState) => {
      expect(state.snackbar.open).not.toBeTruthy();
      bloc.unsubscribe(subscriber);
      done();
    };
    bloc.subscribe(subscriber);

    bloc.closeSnackbar();
  });

  it("should changed the state of drawer and call subscribe", (done) => {
    const subscriber = (state: CoreAppState) => {
      expect(state.drawer).toBeTruthy();
      bloc.unsubscribe(subscriber);
      done();
    };
    bloc.subscribe(subscriber);

    bloc.openDrawer();
  });

  it("should changed the state of drawer to close and call subscribe", (done) => {
    const subscriber = (state: CoreAppState) => {
      expect(state.drawer).not.toBeTruthy();
      bloc.unsubscribe(subscriber);
      done();
    };
    bloc.subscribe(subscriber);

    bloc.closeDrawer();
  });

  it("should changed the state of overflowMenu and call subscribe", (done) => {
    const subscriber = (state: CoreAppState) => {
      expect(state.overflowMenu).toBe(document.body);
      bloc.unsubscribe(subscriber);
      done();
    };
    bloc.subscribe(subscriber);

    bloc.openOverflowMenu(document.body);
  });

  it("should changed the state of overflowMenu to close and call subscribe", (done) => {
    const subscriber = (state: CoreAppState) => {
      expect(state.overflowMenu).toBeNull();
      bloc.unsubscribe(subscriber);
      done();
    };
    bloc.subscribe(subscriber);

    bloc.closeOverflowMenu();
  });
});
