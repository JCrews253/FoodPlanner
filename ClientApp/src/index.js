import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot, useRecoilValue } from "recoil";
import { themeAtom } from "./state/state";
import { darkTheme, lightTheme } from "./Theme";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

const queryClient = new QueryClient();

const ThemeProvider = ({ children }) => {
  const theme = useRecoilValue(themeAtom);
  return (
    <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </MuiThemeProvider>
  );
};

ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter basename={baseUrl}>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </RecoilRoot>,
  rootElement
);

registerServiceWorker();
