import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import MenuItem, { MenuItemProps } from ".";

const wrap = (props: MenuItemProps) =>
  render(
    <MemoryRouter>
      <MenuItem {...props} />
    </MemoryRouter>
  );

const label = "My list-items";
const icon = <Dashboard data-testid="icon" />;
const link = "/home";

it("renders props when passed in", () => {
  const wrapper = wrap({ label, icon, link });
  const listitem = wrapper.getByRole("listitem");
  expect(wrapper.getByTestId("icon")).toBeInTheDocument();
  expect(listitem).toHaveTextContent(label);
  expect(listitem).toHaveAttribute("href", "/home");
});
