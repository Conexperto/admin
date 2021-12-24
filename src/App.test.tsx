import React, { ReactElement, useContext, useEffect } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LocationDescriptor } from "history";
import { act } from "react-dom/test-utils";
import {
  CoreAppStore,
  CoreAppStoreProps,
} from "src/modules/core/infrastructure/store/CoreAppStore";
import { CoreAppContext } from "src/modules/core/infrastructure/store/contexts/CoreAppContext";
import App from "src/App";

const wrap = (
  ui: ReactElement,
  initialState?: CoreAppStoreProps["initialState"],
  initialEntries?: LocationDescriptor<unknown>[],
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
    const { updateTitle } = useContext(CoreAppContext);

    useEffect(() => updateTitle("List users"), []);

    return <div>TestComponent</div>;
  };
  wrap(<TestComponent />);

  act(() => {
    expect(document.title).toBe("List users");
  });
});

it("should open the loading", () => {
  const TestComponent: React.FC = () => {
    const { openLoader } = useContext(CoreAppContext);

    useEffect(() => openLoader(), []);

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
    const { closeLoader } = useContext(CoreAppContext);

    useEffect(() => closeLoader(), []);

    return <div>TestComponent</div>;
  };
  const wrapper = wrap(<TestComponent />, { loader: true });

  act(() => {
    const loading = wrapper.getByTestId("loading");
    expect(loading).toBeInTheDocument();
    expect(loading).not.toBeVisible();
  });
});

it("should open the snackbar", () => {
  const TestComponent: React.FC = () => {
    const { openSnackbar } = useContext(CoreAppContext);

    useEffect(() => openSnackbar("My snackbar"), []);

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
    const { closeSnackbar } = useContext(CoreAppContext);

    useEffect(() => closeSnackbar(), []);

    return <div>TestComponent</div>;
  };
  const wrapper = wrap(<TestComponent />, {
    snackbar: { state: true, message: "My snackbar" },
  });

  act(() => {
    const snackbar = wrapper.getByTestId("snackbar");
    setTimeout(() => {
      expect(snackbar).toBeInTheDocument();
      expect(snackbar).not.toBeVisible();
      expect(snackbar).toHaveTextContent("");
    });
  });
});
