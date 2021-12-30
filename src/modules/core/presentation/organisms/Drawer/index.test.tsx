import React from "react";
import { render, RenderOptions, screen } from "@testing-library/react";
import { ReactElement, useEffect } from "react";
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

describe("Drawer", () => {
  it("renders drawer opened", () => {
    const initialState: CoreAppState = { ...initialAppState };
    initialState.drawer = true;
    wrap(<Drawer />, initialState);
    const drawer = screen.queryByTestId("drawer");
    expect(drawer).toBeInTheDocument();
    expect(drawer).toBeVisible();
  });

  it("renders drawer closed", () => {
    const initialState: CoreAppState = { ...initialAppState };
    initialState.drawer = false;
    wrap(<Drawer />, initialState);
    const drawer = screen.queryByTestId("drawer");
    expect(drawer).not.toBeInTheDocument();
  });

  it("should open the drawer by context", () => {
    const TestComponent: React.FC = () => {
      const { bloc } = useCoreApp();

      useEffect(() => bloc.openDrawer(), []);

      return <Drawer />;
    };
    wrap(<TestComponent />);
    act(() => {
      setTimeout(() => {
        const drawer = screen.queryByTestId("drawer");
        expect(drawer).toBeInTheDocument();
        expect(drawer).toBeVisible();
      });
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
    wrap(<TestComponent />, initialState);
    const drawer = screen.queryByTestId("drawer");
    expect(drawer).not.toBeInTheDocument();
  });
});
