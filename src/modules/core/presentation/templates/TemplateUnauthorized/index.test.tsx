import { render } from "@testing-library/react";
import React, { ReactNode } from "react";
import TemplateUnauthorized from ".";

const wrap = (children: ReactNode) =>
  render(<TemplateUnauthorized>{children}</TemplateUnauthorized>);

it("renders props when passed in", () => {
  const wrapper = wrap(<>Children</>);

  const templateUnauthorized = wrapper.queryByTestId("template-unauthorized");
  expect(templateUnauthorized).toBeInTheDocument();
  expect(templateUnauthorized).toHaveTextContent("Children");
});
