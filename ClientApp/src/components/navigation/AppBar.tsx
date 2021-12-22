import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import AppBarDrawer from "../AppBarDrawer";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";
import ProfileButton from "../buttons/ProfileButton";

const AppBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { isAuthenticated } = useAuth0();
  const history = useHistory();
  return (
    <>
      <Box sx={{ zIndex: 10 }}>
        <MuiAppBar position="static" color="primary" enableColorOnDark>
          <Toolbar>
            {isAuthenticated ? (
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                color="secondary"
                sx={{ mr: 2 }}
                onClick={() => setShowMenu(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                color: (theme) => theme.palette.secondary.main,
              }}
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
