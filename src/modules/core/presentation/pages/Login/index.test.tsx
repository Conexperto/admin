import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CoreAppBlocProvider } from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import { CoreAuthBlocProvider } from "src/modules/core/infrastructure/bloc/CoreAuthBlocProvider";
import { initialAuthState } from "src/modules/core/domain/CoreAuthState";
import { initialAppState } from "src/modules/core/domain/CoreAppState";
import Login from ".";

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
  render(<Login />, {
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

describe("Login", () => {
  it("renders Login page", () => {
    wrap();
    expect(screen.queryByTestId("page-login")).toBeInTheDocument();
  });
});
