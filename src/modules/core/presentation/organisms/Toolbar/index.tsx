import React, { SyntheticEvent, useCallback } from "react";
import MuiToolbar from "@mui/material/Toolbar";
import MuiIconButton from "@mui/material/IconButton";
import MuiMenu from "@mui/icons-material/Menu";
import MuiTypography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import OverflowMenu from "../../molecules/OverflowMenu";
import MenuItemAvatar from "../../molecules/MenuItemAvatar";
import MenuItem, { MenuItemProps } from "../../molecules/MenuItem";

export type ToolbarProps = {
  title: string;
  profile: {
    displayName?: string;
    member?: string;
    link?: string;
  };
  items: Array<MenuItemProps>;
  toggleDrawer: (state?: boolean) => void;
  overflowMenu: Element | null | undefined;
  closeOverflowMenu: () => void;
  toggleOverflowMenu: (event: Element & EventTarget) => void;
};
const Toolbar: React.FC<ToolbarProps> = ({
  title,
  profile,
  items,
  toggleDrawer,
  overflowMenu,
  closeOverflowMenu,
  toggleOverflowMenu,
}) => {
  const renderItems = useCallback(
    ({ label, icon, link, func }: MenuItemProps, key: number) => (
      <MenuItem key={key} label={label} icon={icon} link={link} func={func} />
    ),
    []
  );

  return (
    <MuiToolbar role="presentation">
      <MuiIconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        data-testid="btn-menu"
        sx={{ mr: 2 }}
        onClick={() => toggleDrawer()}
      >
        <MuiMenu />
      </MuiIconButton>
      <MuiTypography
        data-testid="title"
        variant="h6"
        component="div"
        sx={{ flexGrow: 1 }}
      >
        {title}
      </MuiTypography>
      <MuiIconButton
        data-testid="more-actions"
        aria-label="display more actions"
        edge="end"
        color="inherit"
        onClick={(event: SyntheticEvent) =>
          toggleOverflowMenu(event.currentTarget)
        }
      >
        <AccountCircle />
      </MuiIconButton>
      <OverflowMenu
        anchorEl={overflowMenu}
        onClose={closeOverflowMenu}
        header={<MenuItemAvatar {...profile} />}
        body={items.map(renderItems)}
      />
    </MuiToolbar>
  );
};

export default Toolbar;
