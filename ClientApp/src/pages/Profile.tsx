import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Paper, Typography } from "@mui/material";

const Profile = () => {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  return (
    <>
      <Paper
        sx={{
          maxWidth: "960px",
          width: "100%",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: (theme) => theme.spacing(4),
          borderRadius: (theme) => theme.spacing(2),
          padding: (theme) => theme.spacing(5),
        }}
      >
        {isAuthenticated ? (
          <>
            <Box
              component="img"
              src={user?.picture}
              sx={{ borderRadius: "100%" }}
            />
            <Typography
              variant="h6"
              sx={{ margin: (theme) => theme.spacing(2) }}
            >
              {user?.name}
            </Typography>
            <Button
              variant="contained"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() =>
                loginWithRedirect({ returnTo: window.location.origin })
              }
            >
              Log In
            </Button>
          </>
        )}
      </Paper>
    </>
  );
};

export default Profile;
