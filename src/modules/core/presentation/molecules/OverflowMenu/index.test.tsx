import React from "react";
import { render } from "@testing-library/react";
import OverflowMenu, { OverflowMenuProps } from ".";

const wrap = (props: OverflowMenuProps) => render(<OverflowMenu {...props} />);

it("renders overflowMenu by default", () => {
  const wrapper = wrap({
    anchorEl: document.body,
    onClick: jest.fn(),
    onClose: jest.fn(),
    header: <div>header</div>,
    body: <div>body</div>,
  });
  const overflowMenu = wrapper.queryByTestId("overflow-menu");
  expect(overflowMenu).toBeInTheDocument();
  expect(overflowMenu).toHaveTextContent("header");
  expect(overflowMenu).toHaveTextContent("body");
});
