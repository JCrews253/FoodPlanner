import React from "react";
import {
  AppBar as MuiAppBar,
  createStyles,
  Toolbar,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import CalendarIcon from "@material-ui/icons/Event";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import ShoppingListIcon from "@material-ui/icons/FormatListBulleted";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "./IconButton";
import { Link, useLocation } from "react-router-dom";

const styles = createStyles({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white",
  },
  toolBar: {
    padding: "0px",
    display: "flex",
    justifyContent: "center",
  },
  navLink: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },
});

const AppBar = ({ classes }: WithStyles<typeof styles>) => {
  const link = useLocation();
  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Link to="/" className={classes.navLink}>
          <IconButton
            icon={<HomeIcon fontSize={"large"} />}
            label={"Home"}
            selected={link.pathname === "/"}
          />
        </Link>
        <Link to="/calendar" className={classes.navLink}>
          <IconButton
            icon={<CalendarIcon fontSize={"large"} />}
            label={"Calendar"}
            selected={link.pathname === "/calendar"}
          />
        </Link>
        <Link to="/newrecipe" className={classes.navLink}>
          <IconButton
            icon={<AddIcon fontSize={"large"} />}
            label={"Recipe"}
            selected={link.pathname === "/newrecipe"}
          />
        </Link>
        <Link to="/shoppinglist" className={classes.navLink}>
          <IconButton
            icon={<ShoppingListIcon fontSize={"large"} />}
            label={"Groceries"}
            selected={link.pathname === "/shoppinglist"}
          />
        </Link>
        <Link to="/search" className={classes.navLink}>
          <IconButton
            icon={<SearchIcon fontSize={"large"} />}
            label={"Search"}
            selected={link.pathname === "/search"}
          />
        </Link>
      </Toolbar>
    </MuiAppBar>
  );
};

export default withStyles(styles)(AppBar);
