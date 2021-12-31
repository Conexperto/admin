import React from "react";
import { render, RenderOptions, screen, waitFor } from "@testing-library/react";
import { ReactElement, useEffect } from "react";
import { LocationDescriptor } from "history";
import { MemoryRouter } from "react-router-dom";
import Drawer from ".";
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
    wrap(<Drawer />, { ...initialAppState, loader: false, drawer: true });

    const drawer = screen.queryByTestId("drawer");
    expect(drawer).toBeInTheDocument();
    expect(drawer).toBeVisible();
  });

  it("renders drawer closed", () => {
    wrap(<Drawer />, { ...initialAppState, loader: false, drawer: false });

    const drawer = screen.queryByTestId("drawer");
    expect(drawer).not.toBeInTheDocument();
  });

  it("should open the drawer by context", () => {
    const TestComponent: React.FC = () => {
      const { bloc } = useCoreApp();

      useEffect(() => bloc.openDrawer(), []);

      return <Drawer />;
    };
    wrap(<TestComponent />, {
      ...initialAppState,
      loader: false,
      drawer: false,
    });
    const drawer = screen.queryByTestId("drawer");
    expect(drawer).toBeInTheDocument();
    expect(drawer).toBeVisible();
  });

  it("should close the drawer by context", () => {
    const TestComponent: React.FC = () => {
      const { bloc } = useCoreApp();

      useEffect(() => bloc.closeDrawer(), []);

      return <Drawer />;
    };
    wrap(<TestComponent />, {
      ...initialAppState,
      loader: false,
      drawer: true,
    });

    const drawer = screen.queryByTestId("drawer");
    expect(drawer).not.toBeInTheDocument();
  });
});
