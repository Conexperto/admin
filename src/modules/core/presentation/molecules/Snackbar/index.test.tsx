import React from "react";
import { render } from "@testing-library/react";
import Snackbar, { SnackbarProps } from ".";

const wrap = (props: SnackbarProps) => render(<Snackbar {...props} />);

it("renders snackbar by default", () => {
  const wrapper = wrap({
    state: true,
    message: "My Snackbar",
    onClose: jest.fn(),
  });
  const snackbar = wrapper.queryByTestId("snackbar");
  expect(snackbar).toBeInTheDocument();
  expect(snackbar).toHaveTextContent("My Snackbar");
});
