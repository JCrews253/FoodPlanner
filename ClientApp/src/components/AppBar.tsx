import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import AppBarDrawer from "./AppBarDrawer";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";
import ProfileButton from "./buttons/ProfileButton";

const AppBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { isAuthenticated } = useAuth0();
  const history = useHistory();
  return (
    <>
      <Box sx={{ zIndex: 10 }}>
        <MuiAppBar position="static" color="primary">
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
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => history.push("/")}
            >
              Food Planner
            </Typography>
            <ProfileButton />
          </Toolbar>
        </MuiAppBar>
      </Box>
      <AppBarDrawer
        open={showMenu}
        onOpen={() => setShowMenu(true)}
        onClose={() => setShowMenu(false)}
      />
    </>
  );
};

export default AppBar;
