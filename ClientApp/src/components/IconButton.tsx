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
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  iconButtonLabel: {
    display: "flex",
    flexDirection: "column",
    fontSize: "10pt",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  iconSelected: {
    color: "red",
  },
});

interface IconButtonProps extends WithStyles {
  icon: React.ReactNode;
  label?: string;
  selected: boolean;
}

const IconButton = ({ icon, label, selected, classes }: IconButtonProps) => {
  return (
    <MuiIconButton
      disableRipple
      classes={{
        root: classes.iconButton,
        label: classes.iconButtonLabel,
      }}
      className={selected ? classes.iconSelected : ""}
    >
      {icon}
      {label ? <div>{label}</div> : null}
    </MuiIconButton>
  );
};

export default withStyles(styles)(IconButton);
