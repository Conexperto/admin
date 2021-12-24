import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenuItemAvatar, { MenuItemAvatarProps } from ".";

const wrap = (props: MenuItemAvatarProps) =>
  render(
    <MemoryRouter>
      <MenuItemAvatar {...props} />
    </MemoryRouter>
  );

const displayName = "John Doe";
const member = "Admin";
const link = "/profile";

it("renders props when passed in", () => {
  const wrapper = wrap({ displayName, member, link });
  const listitem = wrapper.getByRole("listitem");
  expect(listitem).toBeInTheDocument();
  expect(listitem).toHaveTextContent(displayName);
  expect(listitem).toHaveTextContent(member);
  expect(listitem).toHaveAttribute("href", link);
});

it("renders without props with skeleton as content", () => {
  const wrapper = wrap({});
  const listitem = wrapper.getByRole("listitem");
  expect(listitem).toBeInTheDocument();
  expect(listitem).toHaveAttribute("href", "/");
  const skeleton = wrapper.getByTestId("skeleton");
  expect(skeleton).toBeInTheDocument();
});
