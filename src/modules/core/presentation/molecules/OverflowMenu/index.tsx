import React, { MouseEvent, ReactNode } from "react";
import MuiMenu from "@mui/material/Menu";
import MuiDivider from "@mui/material/Divider";
import { PaperProps } from "./PaperProps";
import { anchorOrigin, transformOrigin } from "./PopoverOrigin";

export type OverflowMenuProps = {
  anchorEl?: Element | null | undefined;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  header: ReactNode;
  body: Array<ReactNode> | ReactNode;
};
const OverflowMenu: React.FC<OverflowMenuProps> = ({
  anchorEl,
  onClick,
  onClose,
  header,
  body,
}) => {
  const state = Boolean(anchorEl);

  return (
    <MuiMenu
      data-testid="overflow-menu"
      anchorEl={anchorEl}
      open={state}
      onClick={onClick}
      onClose={onClose}
      PaperProps={PaperProps}
      transformOrigin={transformOrigin}
      anchorOrigin={anchorOrigin}
    >
      {header}
      <MuiDivider />
      {body}
    </MuiMenu>
  );
};

export default OverflowMenu;
