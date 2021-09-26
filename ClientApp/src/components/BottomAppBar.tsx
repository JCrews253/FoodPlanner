import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home } from "@mui/icons-material";

const BottomAppBar = () => {
  const link = useLocation();

  const PathNameToTab = () => {
    switch (link.pathname) {
      case "/":
        return 0;
      case "/home":
        return 0;
      case "/calendar":
        return 1;
      case "newrecipe":
        return 2;
      case "/shoppinglist":
        return 3;
      case "/search":
        return 5;
      default:
        return 0;
    }
  };

  const [selectedTab, setSelectedTab] = useState(PathNameToTab());
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={selectedTab}
        onChange={(_, newTab) => setSelectedTab(newTab)}
      >
        <BottomNavigationAction
          disableTouchRipple
          label="Home"
          icon={<Home />}
          component={Link}
          to="/home"
        />
        <BottomNavigationAction
          disableTouchRipple
          label="Calendar"
          icon={<Home />}
          component={Link}
          to="/calendar"
        />
        <BottomNavigationAction
          disableTouchRipple
          label="New"
          icon={<Home />}
          component={Link}
          to="/newrecipe"
        />
        <BottomNavigationAction
          disableTouchRipple
          label="Groceries"
          icon={<Home />}
          component={Link}
          to="/shoppinglist"
        />
        <BottomNavigationAction
          disableTouchRipple
          label="Seach"
          icon={<Home />}
          component={Link}
          to="/search"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomAppBar;
