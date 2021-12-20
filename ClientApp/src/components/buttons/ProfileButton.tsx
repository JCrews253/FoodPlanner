import { useAuth0 } from "@auth0/auth0-react";
import { AccountCircle } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useRecoilState } from "recoil";
import { themeAtom } from "../../state/state";

const ProfileButton = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [theme, setTheme] = useRecoilState(themeAtom);

  return (
    <>
      {isAuthenticated ? (
        <IconButton
          size="large"
          color="inherit"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
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
