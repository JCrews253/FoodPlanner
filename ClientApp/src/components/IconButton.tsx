import React from "react";
import {
  createStyles,
  IconButton as MuiIconButton,
  WithStyles,
  withStyles,
} from "@material-ui/core";

const styles = createStyles({
  iconButton: {
    width: "75px",
    height: "75px",
  },
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
    fontSize: "12pt",
  },
});

interface IconButtonProps extends WithStyles {
  icon: React.ReactNode;
  label?: string;
}

const IconButton = ({ icon, label, classes }: IconButtonProps) => {
  return (
    <MuiIconButton
      disableRipple
      classes={{
        root: classes.iconButton,
        label: classes.iconButtonLabel,
      }}
    >
      {icon}
      {label ? <div>{label}</div> : null}
    </MuiIconButton>
  );
};

export default withStyles(styles)(IconButton);
