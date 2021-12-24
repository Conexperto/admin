import { act, fireEvent, render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { InitialEntry } from "history";
import { MemoryRouter } from "react-router-dom";
import AppBar from ".";
import {
  CoreAppStore,
  CoreAppStoreProps,
} from "src/modules/core/infrastructure/store/CoreAppStore";

const wrap = (
  ui: ReactElement,
  initialState?: CoreAppStoreProps["initialState"],
  initialEntries?: InitialEntry[],
  options?: RenderOptions
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries ?? ["/"]}>
        <CoreAppStore initialState={initialState}>{children}</CoreAppStore>
      </MemoryRouter>
    ),
    ...options,
  });

it("renders appbar by default", () => {
  const wrapper = wrap(<AppBar />);
  expect(wrapper.queryByTestId("appbar")).toBeInTheDocument();
});

it("should be render title appbar", () => {
  const title = "My awesome title";
  const wrapper = wrap(<AppBar />, { title });

  expect(wrapper.getByTestId("title")).toHaveTextContent(title);
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
  const wrapper = wrap(<AppBar />, { overflowMenu: document.body });

  fireEvent.click(wrapper.getByTestId("more-actions"));
  act(() => {
    setTimeout(() => {
      const overflowMenu = wrapper.queryByTestId("overflow-menu");
      expect(overflowMenu).not.toBeInTheDocument();
    });
  });
});
