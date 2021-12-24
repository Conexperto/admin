import React from "react";
import { render } from "@testing-library/react";
import Login from ".";

const wrap = () => render(<Login />);

it("renders Login page", () => {
  const wrapper = wrap();

  expect(wrapper.queryByTestId("page-login")).toBeInTheDocument();
});
