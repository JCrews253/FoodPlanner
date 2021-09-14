import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import AppBar from "./AppBar";

const styles = createStyles({
  appWrapper: { height: "100vh" },
  mainContent: { marginBottom: "75px", height: "-webkit-fill-available" },
});

interface LayoutProps extends WithStyles<typeof styles> {
  children: any;
}

const Layout = ({ classes, children }: LayoutProps) => {
  return (
    <div id="appWrapper" className={classes.appWrapper}>
      <div id="mainContent" className={classes.mainContent}>
        {children}
      </div>
      <AppBar />
    </div>
  );
};

export default withStyles(styles)(Layout);
