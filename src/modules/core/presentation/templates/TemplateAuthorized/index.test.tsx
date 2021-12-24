import { render } from "@testing-library/react";
import React from "react";
import TemplateAuthorized, { TemplateAuthorizedProps } from ".";

const wrap = (props: TemplateAuthorizedProps) =>
  render(<TemplateAuthorized {...props} />);

it("renders props when passed in", () => {
  const wrapper = wrap({
    appbar: <>AppBar</>,
    drawer: <>Drawer</>,
    children: <>Children</>,
  });

  const templateAuthorized = wrapper.queryByTestId("template-authorized");
  expect(templateAuthorized).toBeInTheDocument();
  expect(templateAuthorized).toHaveTextContent("AppBar");
  expect(templateAuthorized).toHaveTextContent("Drawer");
  expect(templateAuthorized).toHaveTextContent("Children");
});
