import React, { ReactElement, useEffect } from "react";
import {
  render,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LocationDescriptor } from "history";
import App from "src/App";
import {
  CoreAppBlocProvider,
  CoreAppBlocProviderProps,
  useCoreApp,
} from "./modules/core/infrastructure/bloc/CoreAppBlocProvider";
import { initialAppState } from "./modules/core/domain/CoreAppState";

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
          {children}
        </CoreAppBlocProvider>
      </MemoryRouter>
    ),
    ...options,
  });

describe("App", () => {
  it("should be render router", () => {
    wrap(<App />);
    expect(screen.getByTestId("router")).toBeInTheDocument();
  });

  it("renders the loading opened", () => {
    wrap(<App />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
    expect(loading).toBeVisible();
  });

  it("renders the loading closed", () => {
    wrap(<App />, { ...initialAppState, loader: false });
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
    expect(loading).not.toBeVisible();
  });

  it("renders the loading opened by context", () => {
    const TestComponent: React.FC = () => {
      const { bloc } = useCoreApp();

      useEffect(() => bloc.openLoader(), []);

      return <App />;
    };
    wrap(<TestComponent />, { ...initialAppState, loader: false });

    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
    expect(loading).toBeVisible();
  });

  it("renders the loading closed by context", () => {
    const TestComponent: React.FC = () => {
      const { bloc } = useCoreApp();

      useEffect(() => bloc.closeLoader(), []);

      return <App />;
    };
    wrap(<TestComponent />, { ...initialAppState, loader: true });

    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
    expect(loading).not.toBeVisible();
  });

  it("renders the snackbar opened", () => {
    wrap(<App />, {
      ...initialAppState,
      snackbar: { open: true, message: "My snackbar" },
    });
    const snackbar = screen.queryByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toBeVisible();
  });

  it("renders the snackbar closed", () => {
    wrap(<App />, {
      ...initialAppState,
      snackbar: { open: false, message: "" },
    });

    const snackbar = screen.queryByTestId("snackbar");
    expect(snackbar).not.toBeInTheDocument();
  });

  it("should open the snackbar by context", () => {
    const TestComponent: React.FC = () => {
      const { bloc } = useCoreApp();

      useEffect(() => bloc.openSnackbar("My snackbar"), []);

      return <App />;
    };
    wrap(<TestComponent />, {
      ...initialAppState,
      snackbar: {
        open: false,
        message: "",
      },
    });

    const snackbar = screen.queryByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toBeVisible();
    expect(snackbar).toHaveTextContent("My snackbar");
  });

  it("should close the snackbar by context", () => {
    const TestComponent: React.FC = () => {
      const { bloc } = useCoreApp();

      useEffect(() => bloc.closeSnackbar(), []);

      return <App />;
    };
    wrap(<TestComponent />, {
      ...initialAppState,
      snackbar: {
        open: true,
        message: "My snackbar",
      },
    });

    waitForElementToBeRemoved(() => screen.queryByTestId("snackbar"), {
      timeout: 2010,
    });
  });
});
