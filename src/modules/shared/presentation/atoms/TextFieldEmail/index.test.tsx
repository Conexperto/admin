import React from "react";
import { render } from "@testing-library/react";
import TextFieldEmail, { TextFieldEmailProps } from ".";

const wrap = (props: TextFieldEmailProps) =>
  render(<TextFieldEmail {...props} />);

it("renders input by default", () => {
  const wrapper = wrap({});
  expect(wrapper.queryByTestId("input-email")).toBeInTheDocument();
});
