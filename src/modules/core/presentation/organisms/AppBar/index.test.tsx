import {
  screen,
  act,
  fireEvent,
  render,
  RenderOptions,
  waitForElementToBeRemoved,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { ReactElement, useEffect } from "react";
import { LocationDescriptor } from "history";
import { MemoryRouter } from "react-router-dom";
import AppBar from ".";
import {
  CoreAppBlocProvider,
  CoreAppBlocProviderProps,
  useCoreApp,
} from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import { CoreAuthBlocProvider } from "src/modules/core/infrastructure/bloc/CoreAuthBlocProvider";
import { initialAuthState } from "src/modules/core/domain/CoreAuthState";
import {
  CoreAppState,
  initialAppState,
} from "src/modules/core/domain/CoreAppState";

jest.mock(
  "src/modules/shared/infrastructure/persistence/firebase/FirebaseAuthClientFactory"
);
jest.mock(
  "src/modules/shared/infrastructure/persistence/firebase/FirebaseClientFactory"
);
jest.mock(
  "src/modules/core/infrastructure/persistence/FirebaseCoreAuthRepository"
);
jest.mock(
  "src/modules/shared/infrastructure/persistence/local-storage/LocalStorageFactory"
);

const wrap = (
  ui: ReactElement,
  initialState?: CoreAppBlocProviderProps["initialState"],
  initialEntries?: LocationDescriptor<unknown>[],
  options?: RenderOptions
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries ?? ["/"]}>
        <CoreAppBlocProvider initialState={initialState}>
          <CoreAuthBlocProvider initialState={initialAuthState}>
            {children}
          </CoreAuthBlocProvider>
        </CoreAppBlocProvider>
      </MemoryRouter>
    ),
    ...options,
  });

describe("AppBar", () => {
  afterEach(cleanup);

  it("renders appbar by default", () => {
    wrap(<AppBar />);
    expect(screen.queryByTestId("appbar")).toBeInTheDocument();
    expect(screen.queryByTestId("title")).toHaveTextContent(
      initialAppState.title
    );
  });

  it("renders overflowMenu opened", () => {
    wrap(<AppBar />, { ...initialAppState, overflowMenu: document.body });

    const overflowMenu = screen.queryByTestId("overflow-menu");
    expect(overflowMenu).toBeInTheDocument();
  });

  it("renders overflowMenu opened", () => {
    wrap(<AppBar />, { ...initialAppState, overflowMenu: null });

    const overflowMenu = screen.queryByTestId("overflow-menu");
    expect(overflowMenu).not.toBeInTheDocument();
  });

  it("should open the overflowMenu by context", () => {
    const TestComponent: React.FC = () => {
      const { bloc } = useCoreApp();

      useEffect(() => bloc.openOverflowMenu(document.body), []);

      return <AppBar />;
    };
    wrap(<TestComponent />, {
      ...initialAppState,
      overflowMenu: null,
    });

    const overflowMenu = screen.queryByTestId("overflow-menu");
    expect(overflowMenu).toBeInTheDocument();
    expect(overflowMenu).toBeVisible();
  });

  it("should close the overflowMenu by context", () => {
    const TestComponent: React.FC = () => {
      const { bloc } = useCoreApp();

      useEffect(() => bloc.closeOverflowMenu(), []);

      return <AppBar />;
    };
    wrap(<TestComponent />, {
      ...initialAppState,
      overflowMenu: document.body,
    });

    const overflowMenu = screen.queryByTestId("overflow-menu");
    expect(overflowMenu).not.toBeInTheDocument();
  });

  it("should open the overflowMenu by event", () => {
    wrap(<AppBar />, { ...initialAppState, overflowMenu: null });

    fireEvent.click(screen.getByTestId("more-actions"));

    const overflowMenu = screen.queryByTestId("overflow-menu");
    expect(overflowMenu).toBeInTheDocument();
  });

  it("should close the overflowMenu by event", () => {
    wrap(<AppBar />, { ...initialAppState, overflowMenu: document.body });
    fireEvent.click(screen.getByTestId("more-actions"));

    waitForElementToBeRemoved(() => screen.queryByTestId("overflow-menu"));
  });
});
