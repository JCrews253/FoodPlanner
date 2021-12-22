import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SavedIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import ProfileIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { themeAtom } from "../../state/state";
import { useAuth0 } from "@auth0/auth0-react";

const BottomNavBar = () => {
  const [value, setValue] = useState("/home");
  const [theme, setTheme] = useRecoilState(themeAtom);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 86,
          right: 20,
          borderRadius: "100%",
          backgroundColor: "transparent",
        }}
      >
        <Button
          variant="contained"
          sx={{
            borderRadius: "100%",
            height: "64px",
            width: "64px",
          }}
          component={Link}
          to="/addrecipe"
        >
          <AddIcon fontSize="large" />
        </Button>
      </Paper>

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: "10px",
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            value={"/home"}
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            to="/home"
          />{" "}
          <BottomNavigationAction
            label="Search"
            icon={<SearchIcon />}
            component={Link}
            to="/search"
          />
          <BottomNavigationAction
            label="Saved"
            icon={<SavedIcon />}
            component={Link}
            to="/myrecipes"
          />
          <BottomNavigationAction
            label="Calendar"
            icon={<CalendarIcon />}
            component={Link}
            to="/calendar"
          />
          <BottomNavigationAction
            label="Proile"
            icon={<ProfileIcon />}
            onClick={() => {
              if (isAuthenticated) {
                setTheme(theme === "light" ? "dark" : "light");
              } else {
                loginWithRedirect();
              }
            }}
            // component={Link}
            // to="/profile"
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default BottomNavBar;
