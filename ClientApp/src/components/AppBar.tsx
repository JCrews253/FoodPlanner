import React from "react";
import IconButton from "./IconButton";
import { Link, useLocation } from "react-router-dom";
import { AppBar as MuiAppBar, Icon, Toolbar } from "@mui/material";

const AppBar = () => {
  const link = useLocation();
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        top: "auto",
        bottom: 0,
      }}
    >
      <Toolbar
        sx={{
          p: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton
            icon={<Icon />}
            label={"Home"}
            selected={link.pathname === "/"}
          />
        </Link>
        <Link
          to="/calendar"
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton
            icon={<Icon />}
            label={"Calendar"}
            selected={link.pathname === "/calendar"}
          />
        </Link>
        <Link
          to="/newrecipe"
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton
            icon={<Icon />}
            label={"Recipe"}
            selected={link.pathname === "/newrecipe"}
          />
        </Link>
        <Link
          to="/shoppinglist"
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton
            icon={<Icon />}
            label={"Groceries"}
            selected={link.pathname === "/shoppinglist"}
          />
        </Link>
        <Link
          to="/search"
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton
            icon={<Icon />}
            label={"Search"}
            selected={link.pathname === "/search"}
          />
        </Link>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
