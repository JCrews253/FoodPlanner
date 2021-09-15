import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import { useRecoilValue } from "recoil";
import { AuthStatus } from "../state/state";
import AppBar from "./AppBar";

const styles = (theme: Theme) => {
  return createStyles({
    appWrapper: {
      display: "grid",
      height: "100vh",
      width: "100vw",
      gridTemplateRows: "auto 75px",
      justifyContent: "center",
      backgroundColor: theme.palette.background.default,
    },
    loggedInContent: {
      gridRowStart: 1,
      gridRowEnd: 2,
      display: "flex",
      overflow: "scroll",
    },
    loggedOutContent: {
      gridRowStart: 1,
      gridRowEnd: 3,
      display: "flex",
      overflow: "scroll",
    },
  });
};

interface LayoutProps extends WithStyles<typeof styles> {
  children: any;
}

const Layout = ({ classes, children }: LayoutProps) => {
  const loggedIn = useRecoilValue(AuthStatus.loggedIn);

  return (
    <div id="appWrapper" className={classes.appWrapper}>
      <div
        id="mainContent"
        className={
          loggedIn ? classes.loggedInContent : classes.loggedOutContent
        }
      >
        {children}
      </div>
      {loggedIn ? <AppBar /> : null}
    </div>
  );
};

export default withStyles(styles)(Layout);
