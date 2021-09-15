import { createTheme } from "@material-ui/core/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#ABB3B3",
    },
    background: {
      default: "#868C8C",
    },
    action: {
      active: "#313638",
    },
    secondary: {
      main: "#C5E9EA",
    },
    text: {
      primary: "#313638",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#5D7691",
    },
    secondary: {
      main: "#697EA4",
    },
    background: {
      default: "#1E1E1E",
      paper: "#333333",
    },
    action: {
      active: "#333333",
    },
    error: {
      main: "#C33E2E",
    },
    text: {
      primary: "#C2CCCC",
    },
  },
});
