import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2E6256",
    },
    secondary: {
      main: "#F2DAC9",
    },
    background: {
      default: "#F7FAFC",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2E6256",
    },
    secondary: {
      main: "#F2DAC9",
    },
  },
});
