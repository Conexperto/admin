import React from "react";
import { render } from "@testing-library/react";
import DrawerList, { DrawerListProps } from ".";

const wrap = (props: DrawerListProps) => render(<DrawerList {...props} />);

it("renders children when passed in", () => {
  const wrapper = wrap({ children: <div>test</div>, toggleDrawer: jest.fn() });
  expect(wrapper.queryByTestId("drawer-list")).toBeInTheDocument();
  expect(wrapper.queryByTestId("drawer-list")).toHaveTextContent("test");
});
