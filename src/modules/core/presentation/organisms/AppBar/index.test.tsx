import { act, fireEvent, render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { LocationDescriptor } from "history";
import { MemoryRouter } from "react-router-dom";
import AppBar from ".";
import {
  CoreAppBlocProvider,
  CoreAppBlocProviderProps,
} from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import { CoreAppState, initialAppState } from "src/modules/core/domain/CoreAppState";

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

it("renders appbar by default", () => {
  const wrapper = wrap(<AppBar />);
  expect(wrapper.queryByTestId("appbar")).toBeInTheDocument();
  expect(wrapper.queryByTestId("title")).toHaveTextContent(
    initialAppState.title
  );
});

it("should open overflowMenu", () => {
  const wrapper = wrap(<AppBar />);

  fireEvent.click(wrapper.getByTestId("more-actions"));
  act(() => {
    const overflowMenu = wrapper.queryByTestId("overflow-menu");
    expect(overflowMenu).toBeInTheDocument();
  });
});

it("should close overflowMenu", () => {
  const initialState: CoreAppState = { ...initialAppState };
  initialState.overflowMenu = document.body;
  const wrapper = wrap(<AppBar />, initialState);

  fireEvent.click(wrapper.getByTestId("more-actions"));
  act(() => {
    setTimeout(() => {
      const overflowMenu = wrapper.queryByTestId("overflow-menu");
      expect(overflowMenu).not.toBeInTheDocument();
    });
  });
});
