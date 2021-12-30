import React from "react";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormLogin from ".";
import { CoreAuthBlocProvider } from "src/modules/core/infrastructure/bloc/CoreAuthBlocProvider";
import { CoreAppBlocProvider } from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import { initialAppState } from "src/modules/core/domain/CoreAppState";
import { initialAuthState } from "src/modules/core/domain/CoreAuthState";

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

const wrap = () =>
  render(<FormLogin />, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={["/"]}>
        <CoreAppBlocProvider initialState={initialAppState}>
          <CoreAuthBlocProvider initialState={initialAuthState}>
            {children}
          </CoreAuthBlocProvider>
        </CoreAppBlocProvider>
      </MemoryRouter>
    ),
  });

describe("FormLogin", () => {
  it("renders form login", () => {
    wrap();
    expect(screen.queryByTestId("form-login")).toBeInTheDocument();
  });
});
