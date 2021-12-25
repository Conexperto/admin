import React, { ReactElement } from "react";
import { LocationDescriptor } from "history";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  CoreAuthStore,
  CoreAuthStoreProps,
} from "src/modules/core/infrastructure/store/CoreAuthStore";
import FormLogin from ".";

const wrap = (
  ui: ReactElement,
  initialState?: CoreAuthStoreProps["initialState"],
  initialEntries?: LocationDescriptor<unknown>[],
  options?: RenderOptions
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries ?? ["/"]}>
        <CoreAuthStore initialState={initialState}>{children}</CoreAuthStore>
      </MemoryRouter>
    ),
    ...options,
  });

it("renders form login", () => {
  const wrapper = wrap(<FormLogin />, {});
  expect(wrapper.queryByTestId("form-login")).toBeInTheDocument();
});
