import {
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconProps,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface DrawerMenuItemProps {
  title: string;
  Icon: React.ReactElement<SvgIconProps>;
  linkUrl: string;
  onClick(): void;
}
const DrawerMenuItem = ({
  title,
  Icon,
  linkUrl,
  onClick,
}: DrawerMenuItemProps) => {
  return (
    <ListItem
      button
      key={title}
      component={Link}
      to={linkUrl}
      onClick={onClick}
    >
      <ListItemIcon>{Icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
};

export default DrawerMenuItem;
