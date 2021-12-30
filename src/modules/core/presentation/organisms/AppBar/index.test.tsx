import {
  screen,
  act,
  fireEvent,
  render,
  RenderOptions,
} from "@testing-library/react";
import { ReactElement } from "react";
import { LocationDescriptor } from "history";
import { MemoryRouter } from "react-router-dom";
import AppBar from ".";
import {
  CoreAppBlocProvider,
  CoreAppBlocProviderProps,
} from "src/modules/core/infrastructure/bloc/CoreAppBlocProvider";
import { CoreAuthBlocProvider } from "src/modules/core/infrastructure/bloc/CoreAuthBlocProvider";
import { initialAuthState } from "src/modules/core/domain/CoreAuthState";
import {
  CoreAppState,
  initialAppState,
} from "src/modules/core/domain/CoreAppState";

jest.mock(
  "src/modules/shared/infrastructure/persistence/firebase/FirebaseAuthClientFactory"
);
jest.mock(
  "src/modules/shared/infrastructure/persistence/firebase/FirebaseClientFactory"
);
jest.mock(
  "src/modules/core/infrastructure/persistence/FirebaseCoreAuthRepository"
);
jest.mock(
  "src/modules/shared/infrastructure/persistence/local-storage/LocalStorageFactory"
);

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
          <CoreAuthBlocProvider initialState={initialAuthState}>
            {children}
          </CoreAuthBlocProvider>
        </CoreAppBlocProvider>
      </MemoryRouter>
    ),
    ...options,
  });

describe("AppBar", () => {
  it("renders appbar by default", async () => {
    wrap(<AppBar />);
    expect(screen.queryByTestId("appbar")).toBeInTheDocument();
    expect(screen.queryByTestId("title")).toHaveTextContent(
      initialAppState.title
    );
  });

  it("should open overflowMenu", () => {
    act(() => {
      wrap(<AppBar />);
    });
    fireEvent.click(screen.getByTestId("more-actions"));
    act(() => {
      const overflowMenu = screen.queryByTestId("overflow-menu");
      expect(overflowMenu).toBeInTheDocument();
    });
  });

  it("should close overflowMenu", () => {
    const initialState: CoreAppState = { ...initialAppState };
    initialState.overflowMenu = document.body;
    wrap(<AppBar />, initialState);

    fireEvent.click(screen.getByTestId("more-actions"));
    act(() => {
      setTimeout(() => {
        const overflowMenu = screen.queryByTestId("overflow-menu");
        expect(overflowMenu).not.toBeInTheDocument();
      });
    });
  });
});
