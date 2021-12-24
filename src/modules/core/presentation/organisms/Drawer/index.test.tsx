import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, useContext, useEffect } from "react";
import { InitialEntry } from "history";
import { MemoryRouter } from "react-router-dom";
import Drawer from ".";
import { act } from "react-dom/test-utils";
import {
  CoreAppStore,
  CoreAppStoreProps,
} from "../../../infrastructure/store/CoreAppStore";
import { CoreAppContext } from "src/modules/core/infrastructure/store/contexts/CoreAppContext";

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

it("renders drawer opened", () => {
  const wrapper = wrap(<Drawer />, { drawer: true });
  act(() => {
    const drawer = wrapper.queryByTestId("drawer");
    expect(drawer).toBeInTheDocument();
    expect(drawer).toBeVisible();
  });
});

it("renders drawer closed", () => {
  const wrapper = wrap(<Drawer />, { drawer: false });
  act(() => {
    const drawer = wrapper.queryByTestId("drawer");
    expect(drawer).not.toBeInTheDocument();
  });
});

it("should open the drawer by context", () => {
  const TestComponent: React.FC = () => {
    const { openDrawer } = useContext(CoreAppContext);

    useEffect(() => openDrawer(), []);

    return <Drawer />;
  };
  const wrapper = wrap(<TestComponent />);

  act(() => {
    const drawer = wrapper.queryByTestId("drawer");
    expect(drawer).toBeInTheDocument();
    expect(drawer).toBeVisible();
  });
});

it("should close the drawer by context", () => {
  const TestComponent: React.FC = () => {
    const { closeDrawer } = useContext(CoreAppContext);

    useEffect(() => closeDrawer(), []);

    return <Drawer />;
  };
  const wrapper = wrap(<TestComponent />, { drawer: true });

  act(() => {
    const drawer = wrapper.queryByTestId("drawer");
    expect(drawer).not.toBeInTheDocument();
  });
});
