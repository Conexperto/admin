import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, useContext, useEffect } from "react";
import { LocationDescriptor } from "history";
import { MemoryRouter } from "react-router-dom";
import Drawer from ".";
import { act } from "react-dom/test-utils";
import {
  CoreAppBlocProvider,
  CoreAppBlocProviderProps,
  useCoreApp,
} from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import {
  CoreAppState,
  initialAppState,
} from "src/modules/core/domain/CoreAppState";

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

it("renders drawer opened", () => {
  const initialState: CoreAppState = { ...initialAppState };
  initialState.drawer = true;
  const wrapper = wrap(<Drawer />, initialState);
  act(() => {
    const drawer = wrapper.queryByTestId("drawer");
    expect(drawer).toBeInTheDocument();
    expect(drawer).toBeVisible();
  });
});

it("renders drawer closed", () => {
  const initialState: CoreAppState = { ...initialAppState };
  initialState.drawer = false;
  const wrapper = wrap(<Drawer />, initialState);
  act(() => {
    const drawer = wrapper.queryByTestId("drawer");
    expect(drawer).not.toBeInTheDocument();
  });
});

it("should open the drawer by context", () => {
  const TestComponent: React.FC = () => {
    const { bloc } = useCoreApp();

    useEffect(() => bloc.openDrawer(), []);

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
    const { bloc } = useCoreApp();

    useEffect(() => bloc.closeDrawer(), []);

    return <Drawer />;
  };
  const initialState: CoreAppState = { ...initialAppState };
  initialState.drawer = false;
  const wrapper = wrap(<TestComponent />, initialState);

  act(() => {
    const drawer = wrapper.queryByTestId("drawer");
    expect(drawer).not.toBeInTheDocument();
  });
});
