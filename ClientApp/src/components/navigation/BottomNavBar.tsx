import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SavedIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 76,
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
        >
          <AddIcon fontSize="large" />
        </Button>
      </Paper>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
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
            label="Lists"
            icon={<ListAltIcon />}
            component={Link}
            to="/cart"
          />
          {/* <BottomNavigationAction
          label="New"
          icon={<AddIcon />}
          component={Link}
          to="/addRecipe"
        /> */}
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default BottomNavBar;
