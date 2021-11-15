import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthStatus, AuthTokens } from "../state/state";
import { Link } from "react-router-dom";
import AppBarDrawer from "./AppBarDrawer";
import { AccountCircle } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

const TopAppBar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const setAccessToken = useSetRecoilState(AuthTokens.access);
  const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dev-r1o3z-ez.us.auth0.com";
      console.log("getting token");
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        setAccessToken(accessToken);
      } catch {
        console.log("failed to get token");
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently]);

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
