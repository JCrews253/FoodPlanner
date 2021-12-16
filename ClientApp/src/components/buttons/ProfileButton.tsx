import { useAuth0 } from "@auth0/auth0-react";
import { AccountCircle } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";

const ProfileButton = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
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
    </>
  );
};

export default ProfileButton;
