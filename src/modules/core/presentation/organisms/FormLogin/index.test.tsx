import { ReactElement } from "react";
import { LocationDescriptor } from "history";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormLogin from ".";
import {
  CoreAuthBlocProvider,
  CoreAuthBlocProviderProps,
} from "src/modules/core/infrastructure/bloc/CoreAuthBlocProvider";

const wrap = (
  ui: ReactElement,
  initialState?: CoreAuthBlocProviderProps["initialState"],
  initialEntries?: LocationDescriptor<unknown>[],
  options?: RenderOptions
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries ?? ["/"]}>
        <CoreAuthBlocProvider initialState={initialState}>
          {children}
        </CoreAuthBlocProvider>
      </MemoryRouter>
    ),
    ...options,
  });

it("renders form login", () => {
  const wrapper = wrap(<FormLogin />);
  expect(wrapper.queryByTestId("form-login")).toBeInTheDocument();
});
