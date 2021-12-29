import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormLogin from ".";
import { CoreAuthBlocProvider } from "src/modules/core/infrastructure/bloc/CoreAuthBlocProvider";
import { CoreAppBlocProvider } from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import { initialAppState } from "src/modules/core/domain/CoreAppState";
import { initialAuthState } from "src/modules/core/domain/CoreAuthState";

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

it("renders form login", () => {
  const wrapper = wrap();
  expect(wrapper.queryByTestId("form-login")).toBeInTheDocument();
});
