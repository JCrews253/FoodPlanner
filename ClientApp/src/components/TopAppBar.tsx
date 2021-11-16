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
import AppBarDrawer from "./AppBarDrawer";
import { AccountCircle } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

const TopAppBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      <Box sx={{ zIndex: 10 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            {isAuthenticated ? (
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
            {isAuthenticated ? (
              <IconButton size="large" color="inherit">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={""}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            ) : (
              <Button color="inherit" onClick={() => loginWithRedirect()}>
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
