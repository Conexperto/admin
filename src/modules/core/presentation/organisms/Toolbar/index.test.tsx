import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import Toolbar, { ToolbarProps } from ".";

const wrap = (props: ToolbarProps) =>
  render(
    <MemoryRouter>
      <Toolbar {...props} />
    </MemoryRouter>
  );

const title = "My title";
const profile = {
  displayName: "John Doe",
  member: "Admin",
  link: "/profile",
};
const items = [
  {
    label: "Perfil",
    link: "/profile/credentials",
    icon: <Person fontSize="small" />,
  },
  {
    label: "Salir",
    func: () => () => {},
    icon: <Logout fontSize="small" />,
  },
];
const toggleDrawer = jest.fn();
const overflowMenu = null;
const toggleOverflowMenu = jest.fn();
const closeOverflowMenu = jest.fn();

it("renders toolbar by default", () => {
  const wrapper = wrap({
    title,
    profile,
    items,
    toggleDrawer,
    overflowMenu,
    closeOverflowMenu,
    toggleOverflowMenu,
  });

  const toolbar = wrapper.queryByRole("presentation");
  expect(toolbar).toBeInTheDocument();
  expect(wrapper.queryByTestId("title")).toBeInTheDocument();
  expect(wrapper.queryByTestId("title")).toHaveTextContent(title);
  expect(wrapper.queryByTestId("more-actions")).toBeInTheDocument();
  expect(wrapper.queryByTestId("btn-menu")).toBeInTheDocument();
});

it("should called toggleDrawer when on click in menu button", () => {
  const wrapper = wrap({
    title,
    profile,
    items,
    toggleDrawer,
    overflowMenu,
    closeOverflowMenu,
    toggleOverflowMenu,
  });

  expect(wrapper.queryByTestId("btn-menu")).toBeInTheDocument();
  fireEvent.click(wrapper.getByTestId("btn-menu"));
  expect(toggleDrawer).toBeCalled();
});

it("should called openOverflowMenu when on click in more-actions", () => {
  const wrapper = wrap({
    title,
    profile,
    items,
    toggleDrawer,
    overflowMenu,
    closeOverflowMenu,
    toggleOverflowMenu,
  });

  expect(wrapper.queryByTestId("more-actions")).toBeInTheDocument();
  fireEvent.click(wrapper.getByTestId("more-actions"));
  expect(toggleOverflowMenu).toBeCalled();
});

it("renders overflowMenu opened", () => {
  const wrapper = wrap({
    title,
    profile,
    items,
    toggleDrawer,
    overflowMenu: document.body,
    closeOverflowMenu,
    toggleOverflowMenu,
  });

  const overflowMenu = wrapper.getByTestId("overflow-menu");
  expect(overflowMenu).toBeInTheDocument();
  expect(wrapper.getAllByRole("listitem")).toHaveLength(items.length + 1);
});
