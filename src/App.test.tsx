import React, { ReactElement, useContext, useEffect } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LocationDescriptor } from "history";
import { act } from "react-dom/test-utils";
import App from "src/App";
import {
  CoreAppBlocProvider,
  CoreAppBlocProviderProps,
  useCoreApp,
} from "./modules/core/infrastructure/bloc/CoreAppBlocProvider";
import {
  CoreAppState,
  initialAppState,
} from "./modules/core/domain/CoreAppState";

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

it("should be render router", () => {
  const wrapper = wrap(<App />);
  expect(wrapper.getByTestId("router")).toBeInTheDocument();
});

it("should be changed title by default", () => {
  wrap(<App />);
  act(() => {
    expect(document.title).toBe("Admin - ConeXperto");
  });
});

it("should be checked if title changed", () => {
  const TestComponent: React.FC = () => {
    const { bloc } = useCoreApp();

    useEffect(() => bloc.updateTitle("List users"), []);

    return <div>TestComponent</div>;
  };
  wrap(<TestComponent />);

  act(() => {
    expect(document.title).toBe("List users");
  });
});

it("should open the loading", () => {
  const TestComponent: React.FC = () => {
    const { bloc } = useCoreApp();

    useEffect(() => bloc.openLoader(), []);

    return <div>TestComponent</div>;
  };
  const wrapper = wrap(<TestComponent />);
  act(() => {
    const loading = wrapper.getByTestId("loading");
    expect(loading).toBeInTheDocument();
    expect(loading).toBeVisible();
  });
});

it("should close the loading", () => {
  const TestComponent: React.FC = () => {
    const { bloc } = useCoreApp();

    useEffect(() => bloc.closeLoader(), []);

    return <div>TestComponent</div>;
  };
  const initialState: CoreAppState = { ...initialAppState };
  initialState.loader = true;
  const wrapper = wrap(<TestComponent />, initialState);

  act(() => {
    const loading = wrapper.getByTestId("loading");
    expect(loading).toBeInTheDocument();
    expect(loading).not.toBeVisible();
  });
});

it("should open the snackbar", () => {
  const TestComponent: React.FC = () => {
    const { bloc } = useCoreApp();

    useEffect(() => bloc.openSnackbar("My snackbar"), []);

    return <div>TestComponent</div>;
  };
  const wrapper = wrap(<TestComponent />);

  act(() => {
    const snackbar = wrapper.getByTestId("snackbar");
    expect(snackbar).toBeInTheDocument();
    expect(snackbar).toBeVisible();
    expect(snackbar).toHaveTextContent("My snackbar");
  });
});

it("should close the snackbar", () => {
  const TestComponent: React.FC = () => {
    const { bloc } = useCoreApp();

    useEffect(() => bloc.closeSnackbar(), []);

    return <div>TestComponent</div>;
  };
  const initialState: CoreAppState = { ...initialAppState };
  initialState.snackbar.open = true;
  initialState.snackbar.message = "My snackbar";
  const wrapper = wrap(<TestComponent />, initialState);

  act(() => {
    const snackbar = wrapper.getByTestId("snackbar");
    setTimeout(() => {
      expect(snackbar).toBeInTheDocument();
      expect(snackbar).not.toBeVisible();
      expect(snackbar).toHaveTextContent("");
    });
  });
});
