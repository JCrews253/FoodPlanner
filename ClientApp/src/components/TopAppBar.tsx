import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { AuthStatus } from "../state/state";
import { Link } from "react-router-dom";
import AppBarDrawer from "./AppBarDrawer";
import { AccountCircle } from "@mui/icons-material";

const TopAppBar = () => {
  const loggedIn = useRecoilValue(AuthStatus.loggedIn);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
      <Box>
        <AppBar position="static" color="primary">
          <Toolbar>
            {loggedIn ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setShowMenu(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Food Planner
            </Typography>
            {loggedIn ? (
              <IconButton size="large" color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <AppBarDrawer
        open={showMenu}
        onOpen={() => setShowMenu(true)}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
};

export default TopAppBar;
