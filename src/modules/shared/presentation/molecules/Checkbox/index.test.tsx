import React from "react";
import { render } from "@testing-library/react";
import Checkbox, { CheckboxProps } from ".";

const wrap = (props: CheckboxProps) => render(<Checkbox {...props} />);

it("renders checkbox by default", () => {
  const wrapper = wrap({ label: "Label" });
  expect(wrapper.queryByRole("checkbox")).toBeInTheDocument();
});

it("renders checkbox disabled", () => {
  const wrapper = wrap({ label: "Label", disabled: true });
  expect(wrapper.queryByRole("checkbox")).toBeDisabled();
});

it("renders checkbox selected", () => {
  const wrapper = wrap({ label: "Label", checked: true });
  expect(wrapper.queryByRole("checkbox")).toBeChecked();
});
