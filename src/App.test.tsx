import React, { ReactElement, useEffect } from "react";
import {
  render,
  RenderOptions,
  screen,
  act,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LocationDescriptor } from "history";
import App from "src/App";
import {
  CoreAppBlocProvider,
  CoreAppBlocProviderProps,
  useCoreApp,
} from "./modules/core/infrastructure/bloc/CoreAppBlocProvider";
import {
  CoreAppState,
  initialAppState,
} from "./modules/core/domain/CoreAppState";

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

  it("should be changed title by default", () => {
    wrap(<App />);
    act(() => {
      expect(document.title).toBe("Admin - ConeXperto");
    });
  });

  it("should open the loading", () => {
    wrap(<App />);
    act(() => {
      const loading = screen.getByTestId("loading");
      expect(loading).toBeInTheDocument();
      expect(loading).toBeVisible();
    });
  });

  it("should open the snackbar", async () => {
    const initialState: CoreAppState = { ...initialAppState };
    initialState.snackbar.open = true;
    initialState.snackbar.message = "My snackbar";
    wrap(<App />, initialState);

    const snackbar = await screen.findByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toBeVisible();
    expect(snackbar).toHaveTextContent("My snackbar");
  });
});
