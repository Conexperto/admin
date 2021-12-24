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
  expect(wrapper.getByTestId("icon")).toBeInTheDocument();
  expect(wrapper.getByRole("listitem")).toHaveTextContent(label);
  expect(wrapper.getByRole("listitem")).toHaveAttribute("href", "/home");
});
