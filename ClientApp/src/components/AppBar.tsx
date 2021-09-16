import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar as MuiAppBar, Icon, Toolbar, IconButton } from "@mui/material";

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
          <IconButton>
            <Icon />
            <h1>Home</h1>
          </IconButton>
        </Link>
        <Link
          to="/calendar"
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton>
            <Icon />
            <h1>Calendar</h1>
          </IconButton>
        </Link>
        <Link
          to="/newrecipe"
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton>
            <Icon />
            <h1>Recipe</h1>
          </IconButton>
        </Link>
        <Link
          to="/shoppinglist"
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton>
            <Icon />
            <h1>Groceries</h1>
          </IconButton>
        </Link>
        <Link
          to="/search"
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton>
            <Icon />
            <h1>Search</h1>
          </IconButton>
        </Link>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
