import { fireEvent, render, screen } from "@testing-library/react";
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
const openDrawer = jest.fn();
const overflowMenu = null;
const openOverflowMenu = jest.fn();
const closeOverflowMenu = jest.fn();

describe("Toolbar", () => {
  it("renders toolbar by default", () => {
    wrap({
      title,
      profile,
      items,
      openDrawer,
      overflowMenu,
      closeOverflowMenu,
      openOverflowMenu,
    });

    const toolbar = screen.queryByRole("presentation");
    expect(toolbar).toBeInTheDocument();
    expect(screen.queryByTestId("title")).toBeInTheDocument();
    expect(screen.queryByTestId("title")).toHaveTextContent(title);
    expect(screen.queryByTestId("more-actions")).toBeInTheDocument();
    expect(screen.queryByTestId("btn-menu")).toBeInTheDocument();
  });

  it("should called toggleDrawer when on click in menu button", () => {
    wrap({
      title,
      profile,
      items,
      openDrawer,
      overflowMenu,
      closeOverflowMenu,
      openOverflowMenu,
    });

    expect(screen.queryByTestId("btn-menu")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("btn-menu"));
    expect(openDrawer).toBeCalled();
  });

  it("should called openOverflowMenu when on click in more-actions", () => {
    wrap({
      title,
      profile,
      items,
      openDrawer,
      overflowMenu,
      closeOverflowMenu,
      openOverflowMenu,
    });

    expect(screen.queryByTestId("more-actions")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("more-actions"));
    expect(openOverflowMenu).toBeCalled();
  });

  it("renders overflowMenu opened", () => {
    wrap({
      title,
      profile,
      items,
      openDrawer,
      overflowMenu: document.body,
      closeOverflowMenu,
      openOverflowMenu,
    });

    const overflowMenu = screen.getByTestId("overflow-menu");
    expect(overflowMenu).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(items.length + 1);
  });
});
