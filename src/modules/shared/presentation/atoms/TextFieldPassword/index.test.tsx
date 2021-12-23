import React from "react";
import { render } from "@testing-library/react";
import TextFieldPassword, { TextFieldPasswordProps } from ".";

const wrap = (props: TextFieldPasswordProps) =>
  render(<TextFieldPassword {...props} />);

it("renders input by default", () => {
  const wrapper = wrap({});
  expect(wrapper.queryByTestId("input-password")).toBeInTheDocument();
});
