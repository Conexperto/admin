import React from "react";
import { render } from "@testing-library/react";
import Home from ".";

const wrap = () => render(<Home />);

it("renders Home page", () => {
  const wrapper = wrap();

  expect(wrapper.queryByTestId("page-home")).toBeInTheDocument();
});
