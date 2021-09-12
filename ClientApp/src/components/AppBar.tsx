import React from "react";
import {
  AppBar as MuiAppBar,
  createStyles,
  IconButton as MuiIconButton,
  Toolbar,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import AddIcon from "@material-ui/icons/AddCircle";
import ShoppingListIcon from "@material-ui/icons/FormatListBulleted";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "./IconButton";
import { Link } from "react-router-dom";

const styles = createStyles({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white",
  },
  toolBar: {
    padding: "0px",
  },
});

const AppBar = ({ classes }: WithStyles<typeof styles>) => {
  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Link to="/">
          <IconButton icon={<HomeIcon />} label={"Home"} />
        </Link>
        <Link to="/calendar">
          <IconButton icon={<CalendarIcon />} label={"Calendar"} />
        </Link>
        <Link to="/newrecipe">
          <IconButton icon={<AddIcon />} label={"Recipe"} />
        </Link>
        <Link to="/shoppinglist">
          <IconButton icon={<ShoppingListIcon />} label={"Groceries"} />
        </Link>
        <Link to="/search">
          <IconButton icon={<SearchIcon />} label={"Search"} />
        </Link>
      </Toolbar>
    </MuiAppBar>
  );
};

export default withStyles(styles)(AppBar);
